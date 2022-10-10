/* eslint-disable camelcase */
/* eslint no-unused-vars: "off" */
import sanitizeHtml from 'sanitize-html';
import FormValidation from '../../../../../utils/FormValidation/FormValidation';
import FieldInput from '../../../../../components/FieldInput/FieldInput';
import Button from '../../../../../components/Button/Button';
import { Indexed } from '../../../../../store/Store';
import { connect } from '../../../../../store/utils/connect';
import { AuthController } from '../../../../../controllers/AuthController';
import { UserController } from '../../../../../controllers/UserController';

import { inputsPropsFormUpdate } from './inputsProps';

type PlainObject = { [key: string]: any }

const UserSettingFormUpdate = (changeForm: (form:'formUpdate' |'formPassword') => void) => {
  function mapUserToProps(state:Indexed):Indexed {
    return {
      user: { ...state.user },
    };
  }

  class FormUserData extends FormValidation {
    _flagDisabled : boolean;

    _formInputs: FieldInput[];

    constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
      const newProps = { ...propsAndChildren };
      super(tagName, newProps);
      this._flagDisabled = true;

      const emailInput = new FieldInput('div', {
        ...inputsPropsFormUpdate.emailInput,
        disabled: this._flagDisabled,
        attr: { class: 'user-setting__input user-setting__input--' },
      });
      const loginInput = new FieldInput('div', {
        ...inputsPropsFormUpdate.loginInput,
        disabled: this._flagDisabled,
        attr: { class: 'user-setting__input' },
      });
      const firstNameInput = new FieldInput('div', {
        ...inputsPropsFormUpdate.firstNameInput,
        disabled: this._flagDisabled,
        attr: { class: 'user-setting__input' },
      });
      const secondNameInput = new FieldInput('div', {
        ...inputsPropsFormUpdate.secondNameInput,
        disabled: this._flagDisabled,
        attr: { class: 'user-setting__input' },
      });
      const phoneInput = new FieldInput('div', {
        ...inputsPropsFormUpdate.phoneInput,
        disabled: this._flagDisabled,
        attr: { class: 'user-setting__input' },
      });
      const changeUserDataBtn = new Button('div', {
        text: 'Изменить данные',
        class: 'user-setting__button',
        attr: { class: 'user-setting__button-container' },
        events: [
          {
            event: 'click',
            handler: this.changeUserDataBtnHandler.bind(this),
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
            handler: (event:Event) => {
              event.preventDefault();
              event.stopPropagation();
              changeForm('formPassword');
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
            handler: this.logout.bind(this),
          },
        ],
      });
      const saveButton = new Button('div', {
        form: this._props.formId,
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
            handler: this.cancelButtonHandler.bind(this),
          },
        ],
      });

      this._formInputs = [emailInput, loginInput, firstNameInput, secondNameInput, phoneInput];

      saveButton.hide();
      cancelButton.hide();

      this.setProps({
        emailInput,
        loginInput,
        firstNameInput,
        secondNameInput,
        phoneInput,
        changeUserDataBtn,
        changePasswordBtn,
        exitBtn,
        saveButton,
        cancelButton,
        sendForm: this.sendFormData.bind(this),
      });
    }

    changeUserDataBtnHandler(event:Event) {
      event.preventDefault();
      event.stopPropagation();

      this._flagDisabled = true;
      this._children.saveButton.show();
      this._children.cancelButton.show();
      this._children.changeUserDataBtn.hide();
      this._children.changePasswordBtn.hide();
      this._children.exitBtn.hide();

      this._formInputs.forEach((item) => {
        item.setProps({
          disabled: false,
        });
      });
    }

    cancelButtonHandler(event?:Event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this._flagDisabled = false;
      this._children.saveButton.hide();
      this._children.cancelButton.hide();
      this._children.changeUserDataBtn.show();
      this._children.changePasswordBtn.show();
      this._children.exitBtn.show();

      this._formInputs.forEach((item) => {
        item.setProps({
          disabled: true,
        });
      });
    }

    sendFormData(event:Event) {
      event.preventDefault();
      event.stopPropagation();
      const form: HTMLFormElement|null = document.querySelector('.user-setting__form-user');
      if (form) {
        const first_name = form.querySelector('input[name="first_name"]') as HTMLInputElement;
        const second_name = form.querySelector('input[name="second_name"]') as HTMLInputElement;
        const display_name = form.querySelector('input[name="display_name"]') as HTMLInputElement;
        const login = form.querySelector('input[name="login"]') as HTMLInputElement;
        const email = form.querySelector('input[name="email"]') as HTMLInputElement;
        const phone = form.querySelector('input[name="phone"]') as HTMLInputElement;

        const formData = {
          first_name: first_name ? first_name.value : '',
          second_name: second_name ? second_name.value : '',
          display_name: display_name ? display_name.value : '',
          login: login ? login.value : '',
          email: email ? email.value : '',
          phone: phone ? phone.value : '',
        };

        UserController.changeProfile(formData);
        this.cancelButtonHandler();
      }
    }

    middlewareProps(nextProps:PlainObject):PlainObject {
      if ('user' in nextProps) {
        this._formInputs.forEach((item) => {
          item.setProps({
            value: sanitizeHtml(nextProps.user?.[item.name]),
          });
        });
      }

      return nextProps;
    }

    logout(event:Event) {
      event.preventDefault();
      event.stopPropagation();
      AuthController.logout();
    }

    render() {
      return this.compile(`
            <form class="user-setting__form user-setting__form-user" id={{formId}}>
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
  const FormUserDataConnectedToStore = connect(FormUserData, mapUserToProps);

  return new FormUserDataConnectedToStore('div', {
    formId: 'userSetting123',
    attr: { class: 'user-setting__form-container' },
  });
};

export default UserSettingFormUpdate;
