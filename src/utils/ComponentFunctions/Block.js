// Класс Block нужен для создания полноценных компонентов с жизнеными циклами,
// рендером, отслеживанием изменения параметров
// TODO: переписать в TypeScript

import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import { getTemplate } from '../Templator';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _props;

  _children;

  _id;

  _element;

  _meta;

  _eventBus;

  _setUpdate = false;

  constructor(tagName = 'div', propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);

    this._eventBus = new EventBus();
    this._id = makeUUID();
    this._children = children;
    this._children = this._makePropsProxy({ ...children });

    // Проксируем переданные пропсы для отслеживания их изменения
    this._props = this._makePropsProxy({ ...props, _id: this._id });
    this._meta = { tagName, props };

    // подписываемся на основные события компонента
    // init, componentDidMount, componentDidUpdateб render
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    // console.log('-----init-----');
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    // console.log('-----componentDidMount-----');
    this.componentDidMount();

    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {
    // console.log('-----componentDidMount-----');
    // console.log('oldProps', oldProps);
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    console.log('-----_componentDidUpdate-----');
    const isReander = this.componentDidUpdate(oldProps, newProps);
    if (isReander) {
      console.log('this._eventBus.emit(Block.EVENTS.FLOW_RENDER);');
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    console.log('-----componentDidUpdate-----', oldProps, newProps);
    // по сложный объектам не отработает ,
    // return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    // Object.keys({ ...first, ...second }).every(key => first[key] === second[key]);
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps = { ...this._props };

    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.values(props).length) {
      Object.assign(this._props, nextProps);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log('-----render-----');

    const block = this.render();
    // TODO: Удалить старые события через removeEventListener
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    // TODO: Навесить новые события через addEventListener

    this.addEvents();
    this.addAttribute();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          /* eslint no-param-reassign: "off" */
          target[prop] = value;
          self._setUpdate = true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName) {
    // TODO:  Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const newElement = document.createElement(tagName);

    // TODO: ???
    if (this._props.setting?.withInternalID) {
      newElement.setAttribute('data-id', this._id);
    }

    return newElement;
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  compile(template, props) {
    // console.log('-----compile-----');
    let propsAndStubs = { ...props };

    if (typeof (props) === 'undefined') {
      propsAndStubs = { ...this._props };
    }

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');

    // console.log('getTemplate(template, propsAndStubs)', getTemplate(template, propsAndStubs));
    fragment.innerHTML = '';
    fragment.innerHTML = getTemplate(template, propsAndStubs);
    // console.log('fragment.innerHTM', fragment.innerHTML);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  addEvents() {
    const { events = [] } = this._props;
    let bufElement = null;

    events.forEach((element, index) => {
      bufElement = this._element.querySelector(element.class);
      if (bufElement) {
        bufElement.addEventListener(events[index].event, events[index].handler);
      }
    });
  }

  removeEvents() {
    const { events = [] } = this._props;
    let bufElement = null;

    events.forEach((element, index) => {
      bufElement = this._element.querySelector(element.class);
      if (bufElement) {
        bufElement.removeEventListener(events[index].event, events[index].handler);
      }
    });
  }

  addAttribute() {
    const { attr = {} } = this._props;
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
