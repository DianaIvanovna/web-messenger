/* eslint no-param-reassign: "off" */
import classes from './FieldInput.module.scss';
import Block from '../../utils/ComponentFunctions/Block';

class FieldInput extends Block {
  constructor(tag, props = {}) {
    props.classes = classes;
    props.class = props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'];
    props.classError = `${classes['field-input__error']} error__${props.name}`;
    props.name = props.name ? `name= ${props.name}` : '';
    props.type = props.type ? `type= ${props.type}` : '';
    props.value = props.value ? `value= ${props.value}` : '';
    props.placeholder = props.placeholder ? `placeholder= ${props.placeholder}` : '';
    props.disabled = props.disabled ? `disabled= ${props.disabled}` : '';
    props.required = props.required ? 'required' : '';
    props.pattern = props.pattern ? `pattern= ${props.pattern}` : '';
    props['data-error'] = props['data-error'] ? `data-error="${props['data-error']}"` : '';

    super(tag, props);
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
