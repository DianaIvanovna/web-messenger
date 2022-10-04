import classes from './FieldInput.module.scss';
import Block from '../../utils/ComponentFunctions/Block';
import {EventElement} from "../../utils/ComponentFunctions/types";
type FieldRepeatPasswordProps = {
  type?: string,
  disabled?:string,
  text?: string,
  form?: string,
  class?:string,
  events?: EventElement[],
  shift?:number,
  attr?: object,
  classes?: any,
  classRepeat?: string,
  classError?: string,
  classErrorRepeat?: string,
  name:string,
  nameRepeat: string,
  required: boolean|string,
  pattern:string,
  'data-error'?:string,
  'data-error-repeat'?: string,
  title?: string,
  titleRepeat?: string,
}

class FieldRepeatPassword extends Block {
  constructor(tag:string, props:FieldRepeatPasswordProps) {
    const newProps = { ...props };
    newProps.classes = classes;
    newProps.class = props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'];
    newProps.classRepeat = props.class
      ? `field-input__input--repeat ${classes['field-input__input']} ${props.class}`
      : `field-input__input--repeat ${classes['field-input__input']}`;
    newProps.classError = `${classes['field-input__error']} error__${props.name}`;
    newProps.classErrorRepeat = `${classes['field-input__error']} error__${props.nameRepeat}`;
    newProps.name = props.name ? `name= ${props.name}` : 'password';
    newProps.nameRepeat = props.nameRepeat ? `name= ${props.nameRepeat}` : 'repeatPassword';
    newProps.required = props.required ? 'required' : '';
    newProps.pattern = props.pattern ? `pattern= ${props.pattern}` : '';
    newProps['data-error'] = props['data-error'] ? `data-error="${props['data-error']}"` : '';
    newProps['data-error-repeat'] = props['data-error-repeat'] ? `data-error="${props['data-error-repeat']}"` : 'Пароль не совпадает';

    const checkValidPassword = {
      class: '.field-input__input--repeat',
      event: 'input',
      handler: (event:Event) => {
        const password:HTMLInputElement|null = this._element.querySelector(`.${classes['field-input__input']}`);
        const repeatPassword = event.target as HTMLInputElement;

        if (repeatPassword) {
          if (password?.checkValidity()) {
            if (password.value === repeatPassword.value) {
              repeatPassword.setCustomValidity('');
            } else {
              if (props['data-error-repeat']) {
                repeatPassword.setCustomValidity(props['data-error-repeat']);
              }
             
            }
          } else {
            if (props['data-error-repeat']) {
              repeatPassword.setCustomValidity(props['data-error-repeat']);
            }
            
          }
        }
      },
    };

    newProps.events = props.events ? [...props.events, checkValidPassword] : [checkValidPassword];

    super(tag, newProps);
  }

  render() {
    return this.compile(`
    <div class={{classes.field-input}}>
      <p class="{{classes.field-input__title}} ">{{title}}</p>
      <input class="{{class}}" {{type}} {{name}} {{required}} {{pattern}} {{data-error}} type="password" >
      <p class="{{classError}}"></p>
      </input>
    </div>  
    <div class={{classes.field-input}}>
      <p class="{{classes.field-input__title}} ">{{titleRepeat}}</p>
      <input class="{{classRepeat}}" {{type}} {{nameRepeat}} {{required}} {{pattern}} {{data-error-repeat}} type="password" >
      <p class="{{classErrorRepeat}}"></p>
      </input>
    </div> 
    `);
  }
}

export default FieldRepeatPassword;
