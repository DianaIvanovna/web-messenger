import { getTemplate } from '../../utils/Templator';
import classes from './FieldInput.module.scss';

const FieldInput = (props) => {
  const context = {
    ...props,
    classes,
  };

  const template = `
   <div class={{classes.field-input}}> 
        <p class="{{classes.field-input__title}} ">{{title}}</p>
        <input class="{{classes.field-input__input}}" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" >
   </div>
  `;

  return getTemplate(template, context);
};

export default FieldInput;
