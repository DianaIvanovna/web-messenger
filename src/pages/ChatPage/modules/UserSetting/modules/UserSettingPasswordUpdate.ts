import FormValidation from '../../../../../utils/FormValidation/FormValidation';
import FieldRepeatPassword from '../../../../../components/FieldInput/FieldRepeatPassword';
import Button from '../../../../../components/Button/Button';

const UserSettingPasswordUpdate = (changeForm) => {
  const formId = 'userEditPassword';
  const repeatPasswordInput = new FieldRepeatPassword('div', {
    title: 'Пароль',
    titleRepeat: 'Пароль',
    name: 'password',
    nameRepeat: 'repeatPassword',
    required: true,
    pattern: '^(?=.*[A-ZА-Я])(?=.*[0-9]).{10,}$',
    'data-error': 'Пароль должен содержать от 8 до 40 символов. Обязательно хотя бы одна заглавная буква и цифра.',
    'data-error-repeat': 'Пароль не совпадает',
    attr: { class: 'user-setting__input' },
  });

  const saveButton = new Button('div', {
    form: formId,
    text: 'Сохранить',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
  });

  const cancelButton = new Button('div', {
    text: 'Отмена',
    class: 'user-setting__button',
    attr: { class: 'user-setting__button-container' },
    events: [
      {
        event: 'click',
        handler: (event) => {
          event.preventDefault();
          event.stopPropagation();
          changeForm('update');
        },
      },
    ],
  });

  const sendForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form: HTMLFormElement|null = document.querySelector('.user-setting__form--password');
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

  class FormPasswordUpdate extends FormValidation {
    render() {
      return this.compile(`
        <form class="user-setting__form user-setting__form--password" id={{formId}}>
            {{repeatPasswordInput}}

            {{saveButton}}
            {{cancelButton}}
        </form>
      `);
    }
  }

  const formPasswordUpdate = new FormPasswordUpdate('div', {
    formId,
    sendForm,
    repeatPasswordInput,
    saveButton,
    cancelButton,
    attr: { class: 'user-setting__form-container' },
  });

  return formPasswordUpdate;
};

export default UserSettingPasswordUpdate;
