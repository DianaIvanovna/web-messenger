import classes from './FieldInput.module.scss';
import Block from '../../utils/ComponentFunctions/Block';

type PlainObject = { [key: string]: any }
type FieldInputProps = {
  name: string,
  type?: string,
  placeholder?: string,
  title?: string,
  'data-error'?: string,
  required?: string|boolean,
  classes?: any,
  class?: string,
  classError?: string,
  value?:string,
  disabled?:string|boolean,
  pattern?:string,
  attr?: object,
}

class FieldInput extends Block {
  public readonly name: string;

  constructor(tag:string, props:FieldInputProps) {
    const newProps = { ...props };
    newProps.classes = classes;
    newProps.class = props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'];
    newProps.classError = `${classes['field-input__error']} error__${props.name}`;
    newProps.name = props.name ? `name= ${props.name}` : '';
    newProps.type = props.type ? `type= ${props.type}` : '';
    newProps.value = props.value ? `value= ${props.value}` : '';
    newProps.placeholder = props.placeholder ? `placeholder= "${props.placeholder}"` : '';
    newProps.disabled = props.disabled ? `disabled= ${props.disabled}` : '';
    newProps.required = props.required ? 'required' : '';
    newProps.pattern = props.pattern ? `pattern= ${props.pattern}` : '';
    newProps['data-error'] = props['data-error'] ? `data-error="${props['data-error']}"` : '';

    super(tag, newProps);
    this.name = props.name;
  }

  setValue(data: any) {
    const input = this._element.querySelector('.input') as HTMLInputElement;
    input.value = data;
  }

  middlewareProps(nextProps:PlainObject):PlainObject {
    const newProps = { ...nextProps };
    if ('disabled' in newProps) {
      newProps.disabled = newProps.disabled ? `disabled= ${newProps.disabled}` : '';
    }
    if ('value' in newProps) {
      newProps.value = newProps.value ? `value= ${newProps.value}` : '';
    }

    return newProps;
  }

  render() {
    return this.compile(`
    <div class={{classes.field-input}}>
      <p class="{{classes.field-input__title}} ">{{title}}</p>
      <input class="{{class}}  input" {{type}} {{name}} {{placeholder}} {{disabled}} {{value}} {{required}} {{pattern}} {{data-error}} >
      <p class="{{classError}}"></p>
      </input>
    </div>  
    `);
  }
}

export default FieldInput;
