import { getTemplate } from '../../utils/Templator';
import classes from './FieldInput.module.scss';

const FieldInput = (props) => {
  const initValue = {
    type: props.type, // обязательное поле
    name: props.name, // обязательное поле
    value: props.value ? props.value : '',
    class: props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'],
    placeholder: props.placeholder ? props.placeholder : '',
    title: props.title
      ? `<p class="{{classes.field-input__title}} ">${props.title}</p>`
      : '',
    disabled: props.disabled ? `disabled= ${props.disabled}` : '',
  };

  const context = {
    ...initValue,
    classes,
  };

  const template = `
   <div class={{classes.field-input}}> 
        <p class="{{classes.field-input__title}} ">{{title}}</p>
        <input class="{{class}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" {{disabled}} value="{{value}}" >
   </div>
  `;

  return getTemplate(template, context);
};

export default FieldInput;
