import FormValidation from '../../../../../utils/FormValidation/FormValidation';
import FieldInput from '../../../../../components/FieldInput/FieldInput';
import Button from '../../../../../components/Button/Button';

const inputsProps = {
  emailInput: {
    name: 'email',
    type: 'text',
    placeholder: 'введите почту',
    title: 'Почта',
    value: 'pochta@yandex.ru',
    pattern: '^[A-Za-z]([A-za-z\w-][.]?)+[A-Za-z0-9]@[a-z]*\.[a-z]{2,6}\.?[a-z]{0,6}',
    'data-error': 'Неправильный формат email',
    required: true,
  },
  loginInput: {
    name: 'login',
    type: 'text',
    placeholder: 'введите Логин',
    title: 'Логин',
    value: 'ivanivanov',
    pattern: '^(?=.*[A-Za-z])[0-9A-Za-z_-]{3,20}$',
    'data-error': 'Должно быть от 3 до 20 символов. Допускается латиница, цифры (но не состоять из цифр), дефис и нижнее подчёркивание',
    required: true,
  },
  firstNameInput: {
    name: 'first-name',
    type: 'text',
    placeholder: 'введите имя',
    title: 'Имя',
    value: 'Иван',
    pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    required: true,
  },
  secondNameInput: {
    name: 'second-name',
    type: 'text',
    placeholder: 'введите фамилию',
    title: 'Фамилия',
    value: 'Иванов',
    pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    required: true,
  },
  phoneInput: {
    name: 'phone',
    type: 'text',
    placeholder: 'введите телефон',
    title: 'Телефон',
    value: '+7 (909) 967 30 30',
    pattern: '(^[+]*)([0-9]{10,15})',
    'data-error': 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
    required: true,
  },
};

const UserSettingFormUpdate = (changeForm) => {
  const disabledInputs = (disabledValue) => {
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
        disabled: disabledValue,
        attr: { class: 'user-setting__input' },
      });
    });
    return inputs;
  };

  const formId = 'userSetting';
  let flagDisabled = true;
  const inputs = disabledInputs(flagDisabled);

  const changeUserDataBtnHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    flagDisabled = !flagDisabled;
    saveButton.show();
    cancelButton.show();
    changeUserDataBtn.hide();
    changePasswordBtn.hide();
    exitBtn.hide();
    formUserData.setProps({
      ...disabledInputs(flagDisabled),

    });
  };
  const changeUserDataBtn = new Button('div', {
    text: 'Изменить данные',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
    events: [
      {
        event: 'click',
        handler: changeUserDataBtnHandler,
      },
    ],
  });

  const changePasswordBtn = new Button('div', {
    text: 'Изменить пароль',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
    events: [
      {
        event: 'click',
        handler: (event) => {
          event.preventDefault();
          event.stopPropagation();
          changeForm('password');
        },
      },
    ],
  });

  const exitBtn = new Button('div', {
    text: 'Выйти',
    class: 'user-setting__button user-setting__button--exit',
    attr: { class: 'user-setting__button-container' },
    events: [
      {
        event: 'click',
        handler: (event) => {
          event.preventDefault();
          event.stopPropagation();
          console.log('Выход');
        },
      },
    ],
  });

  const saveButton = new Button('div', {
    form: formId,
    text: 'Сохранить',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
  });

  const cancelButtonHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    flagDisabled = !flagDisabled;
    saveButton.hide();
    cancelButton.hide();
    changeUserDataBtn.show();
    changePasswordBtn.show();
    exitBtn.show();

    formUserData.setProps({
      ...disabledInputs(flagDisabled),

    });
  };

  const cancelButton = new Button('div', {
    text: 'Отмена',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
    events: [
      {
        event: 'click',
        handler: cancelButtonHandler,
      },
    ],
  });

  const sendForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form: HTMLFormElement|null = document.querySelector('.user-setting__form');
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

  // скрываю кнопки сохранить и отмена, покажу после "Изменить данные"
  saveButton.hide();
  cancelButton.hide();

  class FormUserData extends FormValidation {
    render() {
      return this.compile(`
        <form class="user-setting__form" id={{formId}}>
            {{emailInput}}
            {{loginInput}}
            {{firstNameInput}}
            {{secondNameInput}}
            {{phoneInput}}

            {{changeUserDataBtn}}
            {{changePasswordBtn}}
            {{exitBtn}}

            {{saveButton}}
            {{cancelButton}}
        </form>
      `);
    }
  }

  const formUserData = new FormUserData('div', {
    formId,
    ...inputs,
    changeUserDataBtn,
    changePasswordBtn,
    saveButton,
    cancelButton,
    exitBtn,
    sendForm,
    attr: { class: 'user-setting__form-container' },
  });

  return formUserData;
};

export default UserSettingFormUpdate;
