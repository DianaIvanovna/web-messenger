// Класс Block нужен для создания полноценных компонентов с жизнеными циклами,
// рендером, отслеживанием изменения параметров

import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import { getTemplate } from '../Templator/Templator';

export type PlainObject = { [key: string]: any }

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    END_RENDER: 'end:render',
  };
  
  _props;

  _children;

  _id;

  _element: HTMLElement;

  _meta;

  _eventBus;

  _setUpdate = false;

  constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
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
    this._eventBus.on(Block.EVENTS.END_RENDER, this._afterRendering.bind(this));
  }

  _afterRendering() {
    this.afterRendering()
  }
  afterRendering() {
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach((child: Block) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  middlewareProps(props:PlainObject):PlainObject {
    return props
  }
  setProps(newProps:PlainObject) {
    if (!newProps) {
      return;
    }
    let nextProps = { ...newProps };
    this._setUpdate = false;
    const oldProps = { ...this._props };

    nextProps = this.middlewareProps(nextProps);

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
  }

  _render() {
    const block = this.render();

    if (block) {
    // TODO: Удалить старые события через removeEventListener
      this.removeEvents();
      this._element.innerHTML = '';
      this._element.appendChild(block);
      // TODO: Навесить новые события через addEventListener

      this.addEvents();
      this.addAttribute();
      this._eventBus.emit(Block.EVENTS.END_RENDER);
    }
  }

  render():DocumentFragment|null {
    return null;
  }

  getContent():HTMLElement {
    return this._element;
  }

  _makePropsProxy(props:PlainObject) {
    const self = this;

    return new Proxy(props, {
      get(target, prop:string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop:string, value) {
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

  _createDocumentElement(tagName: string): HTMLElement|HTMLTemplateElement {
    const newElement:HTMLElement = document.createElement(tagName);

    if (this._props.setting?.withInternalID) {
      newElement.setAttribute('data-id', this._id);
    }

    return newElement;
  }

  _createDocumentTemplate(): HTMLTemplateElement {
    const newElement:HTMLTemplateElement = document.createElement('template');

    if (this._props.setting?.withInternalID) {
      newElement.setAttribute('data-id', this._id);
    }

    return newElement;
  }

  _getChildren(propsAndChildren:PlainObject) {
    const children:{
      [key: string]:Block
    } = {};
    const props:PlainObject = {};

    Object.entries(propsAndChildren).forEach(([key, value]:[string, any]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  compile(template:string, props?:PlainObject, sanitize=false ) {
    if (typeof (props) === 'undefined') {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]: [string, Block]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment: HTMLTemplateElement = this._createDocumentTemplate();
    fragment.innerHTML = getTemplate(template, propsAndStubs, sanitize); 

    Object.values(this._children).forEach((child: Block) => {
      const stub :HTMLElement | null = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  addEvents() {
    const { events = [] } = this._props;

    let bufElement: NodeListOf<HTMLElement> | HTMLElement[] | null = null;

    type EventElement = {
      class?:string,
      event:string,
      handler: Function
    }

    events.forEach((element: EventElement, index:number) => {
      bufElement = element.class ? this._element.querySelectorAll(element.class) : [this._element];
      if (bufElement) {
        bufElement.forEach((item:HTMLElement)=>{
          item.addEventListener(events[index].event, events[index].handler);
        })
      }
    });
  }

  removeEvents() {
    const { events = [] } = this._props;
    let bufElement: NodeListOf<HTMLElement> | HTMLElement[]  | null = null;

    type EventElement = {
      class?:string, 
      event:string,
      handler: Function
    }

    events.forEach((element:EventElement, index:number) => {

      bufElement = element.class ? this._element.querySelectorAll(element.class) : [this._element];

      if (bufElement) {
        bufElement.forEach((item:HTMLElement)=>{
          item.addEventListener(events[index].event, events[index].handler);
        })
        //bufElement.removeEventListener(events[index].event, events[index].handler);
      }
    });
  }

  addAttribute() {
    const { attr = {} } = this._props;
    Object.entries(attr).forEach(([key, value]: [string, string]) => {
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
