/* eslint no-unused-vars: "off" */
import FormValidation from '../../utils/FormValidation/FormValidation';
import FieldInput from '../../components/FieldInput/FieldInput';
import FieldRepeatPassword from '../../components/FieldInput/FieldRepeatPassword';
import Button from '../../components/Button/Button';
import "./LoginAndSigninPage.scss";
import Router from "../../utils/Router/Router";

import AuthController from '../../controllers/AuthController';

const router = new Router(".root");

type inputsPropsType = {
  [key:string]: {[key:string]:string|boolean}
}

const inputsProps:inputsPropsType = {
  emailInput: {
    name: 'email',
    type: 'text',
    title: 'Почта',
    pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2}$',
    'data-error': 'Неправильный формат email',
    required: true,
  },
  loginInput: {
    name: 'login',
    type: 'text',
    title: 'Логин',
    pattern: '^(?=.*[A-Za-z])[0-9A-Za-z_-]{3,20}$',
    'data-error': 'Должно быть от 3 до 20 символов. Допускается латиница, цифры (но не состоять из цифр), дефис и нижнее подчёркивание',
    required: true,
  },
  firstNameInput: {
    name: 'first_name',
    type: 'text',
    title: 'Имя',
    pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    required: true,
  },
  secondNameInput: {
    name: 'second_name',
    type: 'text',
    title: 'Фамилия',
    pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    required: true,
  },
  phoneInput: {
    name: 'phone',
    type: 'text',
    title: 'Телефон',
    pattern: '(^[+]*)([0-9]{10,15})',
    'data-error': 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
    required: true,
  },
};

type inputsType = {
  [key:string] : FieldInput|null
};

const inputs:inputsType = {
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



const sendForm = (event:Event) => {
  event.preventDefault();
  event.stopPropagation();
  const form: HTMLFormElement|null = document.querySelector('.login-form__form');
  if (form) {
    const { elements } = form;
    const formData = {}; 

    Array.from(elements)
      .filter((item) => item.tagName === 'INPUT')
      .forEach((element:HTMLInputElement) => {
        const { name, value } = element;
        formData[name] = value;
      });

      AuthController.signup(formData);
  }
};

class LoginForm extends FormValidation {
  render() {
    return this.compile(`
    <div class="login-form"> 
      <form class="login-form__form" id={{formId}}>
        <h1 class="login-form__title">{{title}}</h1>
        {{emailInput}}
        {{loginInput}}
        {{firstNameInput}}
        {{secondNameInput}}
        {{phoneInput}}
        {{repeatPasswordInput}}
        {{buttonSubmit}}
        {{buttonRedirect}}
      </form>
    </div>
     
    `);
  }
}

const regForm = new LoginForm('div', {
  formId: 'regForm',
  title: 'Регистрация',
  ...inputs,
  repeatPasswordInput,
  sendForm,
  buttonSubmit,
  buttonRedirect,
  attr: { class: 'login-form__container' },
  events: [

    {
      class: '.login-form__button--second',
      event: 'click',
      handler: ()=>{
        router.go("/login");
      },
    },
  ],
});

export default regForm;
