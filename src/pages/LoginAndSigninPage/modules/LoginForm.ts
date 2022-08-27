/* eslint no-unused-vars: "off" */
import FormValidation from '../../../utils/FormValidation/FormValidation';
import FieldInput from '../../../components/FieldInput/FieldInput';
import Button from '../../../components/Button/Button';

const inputsProps = {
  loginInput: {
    name: 'login',
    type: 'text',
    title: 'Логин',
    pattern: '^(?=.*[A-Za-z])[0-9A-Za-z_-]{3,20}$',
    'data-error': 'Должно быть от 3 до 20 символов. Допускается латиница, цифры (но не состоять из цифр), дефис и нижнее подчёркивание',
    required: true,
  },
  passwordInput: {
    name: 'password',
    type: 'password',
    title: 'Пароль',
    pattern: '^(?=.*[A-ZА-Я])(?=.*[0-9]).{10,}$',
    'data-error': 'Пароль должен содержать от 8 до 40 символов. Обязательно хотя бы одна заглавная буква и цифра.',
    required: true,
  },
};

const LoginFormModule = (redirectFunction: (form:'regForm'|'loginForm')=>void) => {
  const loginInput = new FieldInput('div', {
    ...inputsProps.loginInput,
    attr: { class: 'login-form__field' },
  });
  const passwordInput = new FieldInput('div', {
    ...inputsProps.passwordInput,
    attr: { class: 'login-form__field' },
  });
  const buttonSubmit = new Button('div', {
    form: 'loginForm',
    text: 'Авторизоваться',
    class: 'login-form__button login-form__button--submit',
    attr: { class: 'login-form__button-container' },
  });
  const buttonRedirect = new Button('div', {
    text: 'Нет аккаунта?',
    class: 'login-form__button login-form__button--second',
    attr: { class: 'login-form__button-container' },
  });
  const sendForm = (event:Event) => {
    event.preventDefault();
    event.stopPropagation();
    const form: HTMLFormElement|null = document.querySelector('.login-form__form');
    if (form) {
      const { elements } = form;

      Array.from(elements)
        .filter((item) => item.tagName === 'INPUT')
        .forEach((element: HTMLInputElement) => {
          const { name, value } = element;
          console.log({ name, value });
        });
    }
  };

  class LoginForm extends FormValidation {
    render() {
      return this.compile(`
        <form class="login-form__form" id={{formId}}>
          <h1 class="login-form__title">{{title}}</h1>
          {{loginInput}}
          {{passwordInput}}
          {{buttonSubmit}}
          {{buttonRedirect}}
        </form>
      `);
    }
  }

  const loginForm = new LoginForm('div', {
    formId: 'loginForm',
    title: 'Вход',
    loginInput,
    passwordInput,
    buttonSubmit,
    buttonRedirect,
    sendForm,
    attr: { class: 'login-form' },
    events: [

      {
        class: '.login-form__button--second',
        event: 'click',
        handler: redirectFunction,
      },
    ],
  });

  return loginForm;
};

export default LoginFormModule;
