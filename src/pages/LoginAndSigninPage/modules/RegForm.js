import FormContainer from '../../../components/FormContainer/FormContainer';
import FieldInput from '../../../components/FieldInput/FieldInput';
import FieldRepeatPassword from '../../../components/FieldInput/FieldRepeatPassword';
import Button from '../../../components/Button/Button';

const inputsProps = {
  emailInput: {
    name: 'email',
    type: 'text',
    title: 'Почта',
    pattern: '^[A-Za-z]([A-za-z\w-][.]?)+[A-Za-z0-9]@[a-z]*\.[a-z]{2,6}\.?[a-z]{0,6}',
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
    name: 'first-name',
    type: 'text',
    title: 'Имя',
    pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    required: true,
  },
  secondNameInput: {
    name: 'second-name',
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

const RegForm = (redirectFunction) => {
  const inputs = {
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
  const sendForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { elements } = document.querySelector('.login-form__form');

    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name, value } = element;
        console.log({ name, value });
      });
  };

  class LoginForm extends FormContainer {
    render() {
      return this.compile(`
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
    attr: { class: 'login-form' },
    events: [

      {
        class: '.login-form__button--second',
        event: 'click',
        handler: redirectFunction,
      },
    ],
  });

  return regForm;
};

export default RegForm;
