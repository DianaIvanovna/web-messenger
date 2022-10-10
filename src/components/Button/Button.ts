import './Button.scss';
import Block from '../../utils/ComponentFunctions/Block';
import { EventElement } from '../../utils/ComponentFunctions/types';

type ButtonProps = {
  type?: string,
  disabled?:string|boolean,
  text?: string,
  form?: string,
  class?:string,
  events?: EventElement[],
  shift?:number,
  attr?: object,
}

class Button extends Block {
  constructor(tag:string, props:ButtonProps) {
    const newProps = { ...props };
    newProps.class = props.class
      ? `button ${props.class}`
      : 'button default-button';
    newProps.type = props.type ? `type= ${props.type}` : '';
    newProps.form = props.form ? `form= ${props.form}` : '';
    newProps.disabled = props.disabled ? `disabled= ${props.disabled}` : '';

    super(tag, newProps);
  }

  render() {
    return this.compile(`
    <button class="{{class}}"   {{type}} {{form}} {{disabled}} >
      {{text}}
    </button> 
    `);
  }
}

export default Button;
