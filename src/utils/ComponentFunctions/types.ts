/* eslint no-unused-vars: 0 */
export interface BlockInterface {
  _props;
  _children:{
      [key: string]:BlockInterface
    };
  _id: string;
  _element: HTMLElement;
  _meta;
  _eventBus;
  _setUpdate: boolean;

  _registerEvents():void;

  _createResources():void;

  init():void;

  _componentDidMount():void;

  componentDidMount():void;

  dispatchComponentDidMount():void;

  _componentDidUpdate():void;

  setProps(nextProps:any):void;

  _render():void;

  render():DocumentFragment|null;

  getContent():HTMLElement;

  // _makePropsProxy(props)

  _createDocumentElement(tagName: string): HTMLElement;
  _createDocumentTemplate(): HTMLTemplateElement;

  _getChildren(propsAndChildren:object):void;

  compile(template:string, props?:object) :DocumentFragment;

  addEvents():void;

  removeEvents():void;

  addAttribute():void;

  show():void;

  hide():void;

}

export interface EventBusInterface {
    listeners: object;
    on(event:string, callback:()=>any): void;
    off(event:string, callback:()=>any): void;
    emit(event:string, any): void;
  }
