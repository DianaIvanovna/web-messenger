import './List.scss';
import Block from '../../utils/ComponentFunctions/Block';

type PlainObject = { [key: string]: any }

interface ListProps {
  class?:string,
  classLi:string,
  liTmp?: string,
  arrChildren: any[],
  [key:string]:any,
}

class List extends Block {
  constructor(tag:string, props:ListProps) {
    const newProps = { ...props };

    newProps.class = `list ${props.class||''}`
    newProps.classLi = `list__li ${props.classLi||''}`
    
    newProps.liTmp ="";
    if (newProps.arrChildren) {
        newProps.arrChildren.forEach((item:any, index:number)=>{
            const itemName = `li-${index}`;
            newProps[`li-${index}`] = item;
            newProps.liTmp = `  ${newProps.liTmp} <li class="${newProps.classLi}"> {{${itemName}}}  </li> `;
        }) 
    }

    super(tag, newProps);
  }

  middlewareProps(nextProps:PlainObject):PlainObject {
    if ('arrChildren' in nextProps && nextProps.arrChildren) {
        let liTmp = ''
        nextProps.arrChildren.forEach((item:any, index:number)=>{
          const itemName = `li-${index}`;
          nextProps[`li-${index}`] = item;
          liTmp = `  ${liTmp} <li class="${this._props.classLi}"> {{${itemName}}}  </li> `;
        })
        nextProps.liTmp = liTmp;
    }

    return nextProps;
  }


  render() {
    return this.compile(`
        <ul class=" {{class}} ">
            {{liTmp}}
        </ul>
    `);
  }
}

export default List;
