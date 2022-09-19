/* eslint no-unused-vars: "off" */
import FormValidation from '../../../../../utils/FormValidation/FormValidation';
import FieldInput from '../../../../../components/FieldInput/FieldInput';
import Button from '../../../../../components/Button/Button';
import  {Indexed} from '../../../../../store/Store';
import { connect } from '../../../../../store/utils/connect';
import UserLoginController from '../../../../../controllers/UserLoginController';

import {inputsPropsFormUpdate} from "./inputsProps";
type PlainObject = { [key: string]: any }

const UserSettingFormUpdate = (changeForm: (form:'formUpdate' |'formPassword') => void) => {

    function mapUserToProps(state:Indexed):Indexed {
        return {
          user: state.user,
        }; 
    }

    class FormUserData extends FormValidation {
        _flagDisabled : Boolean;
        _formInputs: FieldInput[];
        private _userLoginController;

        constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
            const newProps = { ...propsAndChildren };
            super(tagName, newProps);
            this._flagDisabled = true;

            const emailInput =  new FieldInput('div', {
                ...inputsPropsFormUpdate.emailInput,
                disabled: this._flagDisabled,
                attr: { class: 'user-setting__input user-setting__input--' },
            });
            const loginInput =  new FieldInput('div', {
                ...inputsPropsFormUpdate.loginInput,
                disabled: this._flagDisabled,
                attr: { class: 'user-setting__input' },
            });
            const firstNameInput =  new FieldInput('div', {
                ...inputsPropsFormUpdate.firstNameInput,
                disabled: this._flagDisabled,
                attr: { class: 'user-setting__input' },
            });
            const secondNameInput =  new FieldInput('div', {
                ...inputsPropsFormUpdate.secondNameInput,
                disabled: this._flagDisabled,
                attr: { class: 'user-setting__input' },
            });
            const phoneInput =  new FieldInput('div', {
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
                    handler: this.logout.bind(this)
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

            this._formInputs = [emailInput,loginInput,firstNameInput,secondNameInput,phoneInput];
            this._userLoginController = UserLoginController;

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
                cancelButton
            })
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

            this._formInputs.forEach((item)=>{
                item.setProps({
                    disabled: false
                })
            })
        };

        cancelButtonHandler (event:Event) {
            event.preventDefault();
            event.stopPropagation();
            this._flagDisabled = false;
            this._children.saveButton.hide();
            this._children.cancelButton.hide();
            this._children.changeUserDataBtn.show();
            this._children.changePasswordBtn.show();
            this._children.exitBtn.show();

            this._formInputs.forEach((item)=>{
                item.setProps({
                    disabled: true
                })
            })
        };

        sendForm (event:Event)  {
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

        middlewareProps(nextProps:PlainObject):PlainObject {
            if ('user' in nextProps) {
                this._formInputs.forEach((item)=>{
                    item.setProps({
                        value: nextProps.user?.[item.name]
                    })
                })
            }

            return nextProps;
        }

        logout(event:Event) {
          event.preventDefault();
          event.stopPropagation();
          this._userLoginController.logout();
        }
    
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
    const FormUserDataConnectedToStore = connect(FormUserData,mapUserToProps );
    return new FormUserDataConnectedToStore('div', {
        formId: 'userSetting',
        attr: { class: 'user-setting__form-container' },
      });;
}





export default UserSettingFormUpdate;
