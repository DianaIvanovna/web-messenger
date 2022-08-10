import classes from './FieldInput.module.scss';
import Block from '../../utils/ComponentFunctions/Block';

class FieldInput extends Block {
  constructor(tag:string, props:Record<string, any>) {
    const newProps = { ...props };
    newProps.classes = classes;
    newProps.class = props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'];
    newProps.classError = `${classes['field-input__error']} error__${props.name}`;
    newProps.name = props.name ? `name= ${props.name}` : '';
    newProps.type = props.type ? `type= ${props.type}` : '';
    newProps.value = props.value ? `value= ${props.value}` : '';
    newProps.placeholder = props.placeholder ? `placeholder= ${props.placeholder}` : '';
    newProps.disabled = props.disabled ? `disabled= ${props.disabled}` : '';
    newProps.required = props.required ? 'required' : '';
    newProps.pattern = props.pattern ? `pattern= ${props.pattern}` : '';
    newProps['data-error'] = props['data-error'] ? `data-error="${props['data-error']}"` : '';

    super(tag, newProps);
  }

  render() {
    return this.compile(`
    <div class={{classes.field-input}}>
      <p class="{{classes.field-input__title}} ">{{title}}</p>
      <input class="{{class}}" {{type}} {{name}} {{placeholder}} {{disabled}} {{value}} {{required}} {{pattern}} {{data-error}} >
      <p class="{{classError}}"></p>
      </input>
    </div>  
    `);
  }
}

export default FieldInput;
