/* eslint no-unused-vars: "off" */
import FormValidation from '../../utils/FormValidation/FormValidation';
import FieldInput from '../../components/FieldInput/FieldInput';
import Button from '../../components/Button/Button';
import './LoginAndSigninPage.scss';
import Router from '../../utils/Router/Router';
import { AuthController } from '../../controllers/AuthController';
import { InputError } from '../../constants/ErrorConst';
import { PatternInput } from '../../constants/PatternConsts';

const router = new Router('.root');
const inputsProps = {
  loginInput: {
    name: 'login',
    type: 'text',
    title: 'Логин',
    pattern: PatternInput.login,
    'data-error': InputError.login,
    required: true,
  },
  passwordInput: {
    name: 'password',
    type: 'password',
    title: 'Пароль',
    pattern: PatternInput.password,
    'data-error': InputError.password,
    required: true,
  },
};

class LoginForm extends FormValidation {
  constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
    const newProps = { ...propsAndChildren };
    super(tagName, newProps);

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
    this.setProps({
      loginInput,
      passwordInput,
      buttonSubmit,
      buttonRedirect,
      sendForm: this.sendForm.bind(this),
    });
  }

  sendForm(event:Event) {
    event.preventDefault();
    event.stopPropagation();
    const form: HTMLFormElement|null = document.querySelector('.login-form__form--signin');
    if (form) {
      const loginHTML = form.querySelector('input[name="login"]') as HTMLInputElement;
      const passwordHTML = form.querySelector('input[name="password"]') as HTMLInputElement;
      const formData = {
        login: loginHTML.value,
        password: passwordHTML.value,
      };
      AuthController.signin(formData);
    }
  }

  render() {
    return this.compile(`
      <div class="login-form">
        <div class="login-form__form-container" >
          <form class="login-form__form login-form__form--signin" id={{formId}}>
            <h1 class="login-form__title">{{title}}</h1>
            {{loginInput}}
            {{passwordInput}}
            {{buttonSubmit}}
            
          </form> 
          {{buttonRedirect}}
        </div>
      </div>
    `);
  }
}

const loginForm = new LoginForm('div', {
  formId: 'loginForm',
  title: 'Вход',

  attr: { class: 'login-form__container' },
  events: [

    {
      class: '.login-form__button--second',
      event: 'click',
      handler: () => {
        router.go('/sign-up');
      },
    },
  ],
});

export default loginForm;
