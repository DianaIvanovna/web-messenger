/* eslint no-unused-vars: 0 */
export interface EventBusInterface {
  listeners: {
    [key:string]: Function[];
  };
  on(event:string, callback:()=>Function): void;
  off(event:string, callback:()=>Function): void;
  emit(event:string, args:any[]): void;
}

export interface BlockInterface {
  _props: {
    [key: string]:any
  };
  _children:{
      [key: string]:BlockInterface
    };
  _id: string;
  _element: HTMLElement;
  _meta:{
    [key: string]:any
  };
  _eventBus:EventBusInterface;
  _setUpdate: boolean;

  _registerEvents():void;

  _createResources():void;

  init():void;

  _componentDidMount():void;

  componentDidMount():void;

  dispatchComponentDidMount():void;

  _componentDidUpdate():void;

  setProps(nextProps:{
    [key: string]:any
  }):void;

  _render():void;

  render():DocumentFragment|null;

  getContent():HTMLElement;

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
