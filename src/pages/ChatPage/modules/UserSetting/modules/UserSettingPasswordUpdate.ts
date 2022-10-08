/* eslint no-unused-vars: "off" */
import FormValidation from '../../../../../utils/FormValidation/FormValidation';
import FieldRepeatPassword from '../../../../../components/FieldInput/FieldRepeatPassword';
import FieldInput from '../../../../../components/FieldInput/FieldInput';
import Button from '../../../../../components/Button/Button';
import {UserController} from '../../../../../controllers/UserController';
import {InputError} from "../../../../../constants/ErrorConst";
import {PatternInput} from "../../../../../constants/PatternConsts";

const UserSettingPasswordUpdate = (changeForm: (form:'formUpdate' |'formPassword') => void) => {

    class FormPasswordUpdate extends FormValidation {

        constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
            const newProps = { ...propsAndChildren };
            super(tagName, newProps);

            const oldPassword = new FieldInput('div', {
                name: 'old_password',
                type: 'password',
                title: 'Старый пароль',
                pattern: PatternInput.password,
                'data-error': InputError.password,
                required: true,
                attr: { class: 'user-setting__input' },
            });
            
            const repeatPasswordInput = new FieldRepeatPassword('div', {
                title: 'Новый пароль',
                titleRepeat: 'Повторите новый пароль',
                name: 'password',
                nameRepeat: 'repeatPassword',
                required: true,
                pattern: PatternInput.password,
                'data-error': InputError.password,
                'data-error-repeat': InputError.password_repeat,
                attr: { class: 'user-setting__input' },
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
                    handler: this.cancelButtonHandler.bind(this)
                },
                ],
            });
            this.setProps({
                oldPassword,
                repeatPasswordInput,
                saveButton,
                cancelButton,
                sendForm: this.sendFormPassword.bind(this),
            })
        }

        cancelButtonHandler(event?:Event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            changeForm('formUpdate');
        }

        sendFormPassword (event:Event) {
            event.preventDefault();
            event.stopPropagation();
            const form: HTMLFormElement|null = document.querySelector('.user-setting__form--password');

            
            if (form) {
                const oldPassword = form.querySelector('input[name="old_password"]') as HTMLInputElement;
                const newPassword = form.querySelector('input[name="password"]') as HTMLInputElement;
               
                const formData = {
                    oldPassword: oldPassword ? oldPassword.value : "",
                    newPassword:  newPassword ? newPassword.value : "",
                };

                UserController.changePassword(formData);
                this.cancelButtonHandler();
            } 
        };

        render() {
        return this.compile(`
                <form class="user-setting__form user-setting__form--password" id={{formId}}>
                    {{oldPassword}}
                    {{repeatPasswordInput}}

                    {{saveButton}}
                    {{cancelButton}}
                </form>
            `);
        }
    }

    return new FormPasswordUpdate('div', {
        formId: 'userSettingPassword',
        attr: { class: 'user-setting__form-container' },
    });

};

export default UserSettingPasswordUpdate;
