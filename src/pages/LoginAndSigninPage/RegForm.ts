/* eslint no-unused-vars: "off" */
import FormValidation from '../../utils/FormValidation/FormValidation';
import FieldInput from '../../components/FieldInput/FieldInput';
import FieldRepeatPassword from '../../components/FieldInput/FieldRepeatPassword';
import Button from '../../components/Button/Button';
import "./LoginAndSigninPage.scss";
import Router from "../../utils/Router/Router";
import {inputError} from "../../constants/ErrorConst";
import {pattenrInput} from "../../constants/PatternConsts";

import {AuthController} from '../../controllers/AuthController';

const router = new Router(".root");

type InputsType = {
  name: string,
  type: string,
  title: string,
  pattern: string,
  'data-error': string,
  required: boolean,
}
type InputsPropsType = {
  emailInput: InputsType,
  loginInput: InputsType,
  firstNameInput: InputsType,
  secondNameInput: InputsType,
  phoneInput: InputsType,
}

const inputsProps:InputsPropsType = {
  emailInput: {
    name: 'email',
    type: 'text',
    title: 'Почта',
    pattern: pattenrInput.email,
    'data-error': inputError.email,
    required: true,
  },
  loginInput: {
    name: 'login',
    type: 'text',
    title: 'Логин',
    pattern: pattenrInput.login,
    'data-error': inputError.login,
    required: true,
  },
  firstNameInput: {
    name: 'first_name',
    type: 'text',
    title: 'Имя',
    pattern: pattenrInput.first_name,
    'data-error': inputError.first_name,
    required: true,
  },
  secondNameInput: {
    name: 'second_name',
    type: 'text',
    title: 'Фамилия',
    pattern: pattenrInput.second_name,
    'data-error': inputError.second_name,
    required: true,
  },
  phoneInput: {
    name: 'phone',
    type: 'text',
    title: 'Телефон',
    pattern: pattenrInput.phone,
    'data-error': inputError.phone,
    required: true,
  },
};

type InputsItem = {
  [key:string] : FieldInput|null
};


class LoginForm extends FormValidation {
  constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
    const newProps = { ...propsAndChildren };
    super(tagName, newProps);

    const inputs:InputsItem = {
      emailInput: null,
      loginInput: null,
      firstNameInput: null,
      secondNameInput: null,
      phoneInput: null,
    };

    Object.entries(inputsProps).forEach(([key, child]) => {
      inputs[key] = new FieldInput('div', {
        ...child,
        attr: { class: 'login-form__field' },
      });
    });
    const repeatPasswordInput = new FieldRepeatPassword('div', {
      title: 'Пароль',
      titleRepeat: 'Пароль',
      name: 'password',
      nameRepeat: 'repeatPassword',
      required: true,
      pattern: '^(?=.*[A-ZА-Я])(?=.*[0-9]).{10,}$',
      'data-error': 'Пароль должен содержать от 8 до 40 символов. Обязательно хотя бы одна заглавная буква и цифра.',
      'data-error-repeat': 'Пароль не совпадает',
      attr: { class: 'login-form__field' },
    });
    const buttonSubmit = new Button('div', {
      form: 'regForm',
      text: 'Зарегистрироваться',
      class: 'login-form__button login-form__button--submit',
      attr: { class: 'login-form__button-container' },
    });
    const buttonRedirect = new Button('div', {
      text: 'Войти',
      class: 'login-form__button login-form__button--second',
      attr: { class: 'login-form__button-container' },
    });

    this.setProps({
      ...inputs,
      repeatPasswordInput,
      buttonSubmit,
      buttonRedirect,
      sendForm: this.sendForm.bind(this),
  })
}

sendForm (event:Event) {
  event.preventDefault();
  event.stopPropagation();
  const form: HTMLFormElement|null = document.querySelector('.login-form__form--reg');
  if (form) {
    const emailHTML= form.querySelector('input[name="email"]') as HTMLInputElement;
    const loginHTML= form.querySelector('input[name="login"]') as HTMLInputElement;
    const firstNameHTML= form.querySelector('input[name="first_name"]') as HTMLInputElement;
    const secondNameHTML= form.querySelector('input[name="second_name"]') as HTMLInputElement;
    const phoneHTML= form.querySelector('input[name="phone"]') as HTMLInputElement;
    const passwordHTML= form.querySelector('input[name="password"]') as HTMLInputElement;

    const formData = {
      email: emailHTML?.value,
      login: loginHTML?.value,
      first_name: firstNameHTML?.value,
      second_name:secondNameHTML?.value,
      phone:phoneHTML?.value,
      password:passwordHTML?.value,
    }

    AuthController.signup(formData);
  }
};



  render() {
    return this.compile(`
    <div class="login-form"> 
      <div class="login-form__form-container" >
        <form class="login-form__form login-form__form--reg" id={{formId}}>
          <h1 class="login-form__title">{{title}}</h1>
          {{emailInput}}
          {{loginInput}}
          {{firstNameInput}}
          {{secondNameInput}}
          {{phoneInput}}
          {{repeatPasswordInput}}
          {{buttonSubmit}}
        </form>
        {{buttonRedirect}}
        </div>
    </div>
     
    `);
  }
}

const regForm = new LoginForm('div', {
  formId: 'regForm',
  title: 'Регистрация',
  
  attr: { class: 'login-form__container' },
  events: [

    {
      class: '.login-form__button--second',
      event: 'click',
      handler: ()=>{
        router.go("/");
      },
    },
  ],
});

export default regForm;
