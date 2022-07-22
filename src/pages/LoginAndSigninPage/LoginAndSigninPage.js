import FieldInput from '../../components/FieldInput/FieldInput';
const loginAndSigninPage = () => {
  const regForm = [
    {
      name: 'email',
      type: 'text',
      title: 'Почта',
    },
    {
      name: 'login',
      type: 'text',
      title: 'Логин',
    },
    {
      name: 'first-name',
      type: 'text',
      title: 'Имя',
    },
    {
      name: 'second-name',
      type: 'text',

      title: 'Фамилия',
    },
    {
      name: 'phone',
      type: 'text',

      title: 'Телефон',
    },
    {
      name: 'password',
      type: 'password',

      title: 'Пароль',
    },
    {
      name: 'repeatPassword',
      type: 'password',

      title: 'Повторите пароль',
    },
  ];
  const loginForm = [
    {
      name: 'login',
      type: 'text',
      title: 'Логин',
    },
    {
      name: 'password',
      type: 'password',
      title: 'Пароль',
    },
  ];
  const form = document.querySelector('.login-form__form');

  const renderLoginForm = () => {
    form.innerHTML = '';
    let title = document.createElement('h1');
    title.textContent = 'Вход';
    title.className = 'login-form__title';
    form.append(title);

    loginForm.forEach((item, index) => {
      let div = document.createElement('div');
      div.className = 'login-form__field';
      div.innerHTML = FieldInput({
        ...item,
      });

      form.append(div);
    });

    let button = document.createElement('button');
    button.textContent = 'Авторизоваться';
    button.className = 'login-form__button';
    form.append(button);
    let button2 = document.createElement('button');
    button2.textContent = 'Нет аккаунта?';
    button2.className = 'login-form__button login-form__button--second';
    button2.addEventListener('click', renderRegForm);
    form.append(button2);
  };

  const renderRegForm = () => {
    form.innerHTML = '';
    let title = document.createElement('h1');
    title.textContent = 'Регистрация';
    title.className = 'login-form__title';
    form.append(title);

    regForm.forEach((item, index) => {
      let div = document.createElement('div');
      div.className = 'login-form__field';
      div.innerHTML = FieldInput({
        ...item,
      });

      form.append(div);
    });

    let button = document.createElement('button');
    button.textContent = 'Зарегистрироваться';
    button.className = 'login-form__button';
    form.append(button);
    let button2 = document.createElement('button');
    button2.textContent = 'Войти';
    button2.className = 'login-form__button login-form__button--second';
    button2.addEventListener('click', renderLoginForm);
    form.append(button2);
  };

  // при первом вхождение показываю форму авторизации
  renderLoginForm();
};

export default loginAndSigninPage();
