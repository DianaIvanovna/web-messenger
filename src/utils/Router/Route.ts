import renderDOM from "../ComponentFunctions/renderDom";

import Block from '../ComponentFunctions/Block';


export default class Route {
    private _pathname: string;
    private readonly _blockClass: Block ;
    private _block: null|Block;
    _props: {
        rootQuery: string,
        [key: string]: any 
    };
  constructor(pathname: string, view:Block, props:{
    rootQuery: string,
    [key: string]: any 
}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props; 
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname:string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass; 
      
      if (this._block) {
        renderDOM(this._props.rootQuery, this._block);
      }
      return;
    }

    this._block.show();
  }
} 