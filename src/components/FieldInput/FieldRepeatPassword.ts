/* eslint no-param-reassign: "off" */
import classes from './FieldInput.module.scss';
import Block from '../../utils/ComponentFunctions/Block';

class FieldRepeatPassword extends Block {
  constructor(tag, props) {
    props.classes = classes;
    props.class = props.class
      ? `${classes['field-input__input']} ${props.class}`
      : classes['field-input__input'];
    props.classRepeat = props.class
      ? `field-input__input--repeat ${classes['field-input__input']} ${props.class}`
      : `field-input__input--repeat ${classes['field-input__input']}`;
    props.classError = `${classes['field-input__error']} error__${props.name}`;
    props.classErrorRepeat = `${classes['field-input__error']} error__${props.nameRepeat}`;
    props.name = props.name ? `name= ${props.name}` : 'password';
    props.nameRepeat = props.nameRepeat ? `name= ${props.nameRepeat}` : 'repeatPassword';
    props.required = props.required ? 'required' : '';
    props.pattern = props.pattern ? `pattern= ${props.pattern}` : '';
    props['data-error'] = props['data-error'] ? `data-error="${props['data-error']}"` : '';
    props['data-error-repeat'] = props['data-error-repeat'] ? `data-error="${props['data-error-repeat']}"` : 'Пароль не совпадает';

    const checkValidPassword = {
      class: '.field-input__input--repeat',
      event: 'input',
      handler: (event) => {
        const password:HTMLInputElement|null = this._element.querySelector(`.${classes['field-input__input']}`);
        const repeatPassword = event.target;

        if (password?.checkValidity()) {
          if (password.value === repeatPassword.value) {
            repeatPassword.setCustomValidity('');
          } else {
            repeatPassword.setCustomValidity(props['data-error-repeat']);
          }
        } else {
          repeatPassword.setCustomValidity(props['data-error-repeat']);
        }
      },
    };

    props.events = props.events ? [...props.events, checkValidPassword] : [checkValidPassword];

    super(tag, props);
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
