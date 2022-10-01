// Класс FormValidation нужен для валидации форм
import Block from '../ComponentFunctions/Block';
import { FormValidationInterface } from './types';

class FormValidation extends Block implements FormValidationInterface {
  _form: HTMLFormElement|null;

  _button: HTMLElement | null;

  constructor(tag:string, props = {}) {
    super(tag, props);
    this._form = null;
 

    this._formSubmission = this._formSubmission.bind(this);
  }

  componentDidMount() {
    this._validateForm();
  }

  addEvents() {
    const { events = [] } = this._props;

    type EventElement = {
      class?:string,
      event:string,
      handler: Function
    }

    // оставляю старую логику добавления событий
    let bufElement: HTMLElement | null = null;

    events.forEach((element:EventElement, index:number) => {
      bufElement = element.class ? this._element.querySelector(element.class) : this._element;
      if (bufElement) {
        bufElement.addEventListener(events[index].event, events[index].handler);
      }
    });

    // добавляю обработчики для input
    this._setHandlers();
  }

  _setHandlers() { // Добавляет необходимые для валидации обработчики всем полям формы.
    this._form = this._element.querySelector('form');
    if (this._form) {
      Array.from(this._form)
        .filter((item:HTMLElement) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return item.hasAttribute('name');
        })
        .forEach((element) => {
          element.addEventListener('blur', this._checkInputValidity.bind(this));
          element.addEventListener('focus', this._resetError.bind(this));
        });
    }

    if (this._button) {
      this._button.addEventListener('click', this._formSubmission); 
    }
  }

  removeEvents() {
    // оставляю старую логику добавления событий
    const { events = [] } = this._props;
    type EventElement = {
      class?:string,
      event:string,
      handler: Function
    }
    let bufElement:HTMLElement | null = null;

    events.forEach((element:EventElement, index:number) => {
      bufElement = element.class ? this._element.querySelector(element.class) : this._element;
      if (bufElement) {
        bufElement.removeEventListener(events[index].event, events[index].handler);
      }
    });
    // удаляю обработчики для input
    this._removeHandlers();
  }

  _removeHandlers() { // удаляет обработчики всем полям формы.
    if (this._form) {
      Array.from(this._form)
        .filter((item:HTMLElement) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return item.hasAttribute('name'); 
        })
        .forEach((element) => {
          element.removeEventListener('input', this._checkInputValidity.bind(this));
          element.removeEventListener('focus', this._resetError.bind(this));
        });
    }

    if (this._button) {
      this._button.removeEventListener('click', this._formSubmission);
    }
  }

  _formSubmission(event:Event) { // отправка формы
    event.preventDefault();
    event.stopPropagation();

    this._validateForm();


    if (this._button?.classList.contains('button-valid')) {
      this._props.sendForm(event);
    }
  }

  _checkInputValidity(event:Event) {
    this._validateForm();
    this._validateInputElement(event.target as HTMLInputElement);
  }

  _resetError(input:Event) { // убирает сообщение об ошибке
    this._form = this._element?.querySelector('form');

    const inputElement = input.target as HTMLInputElement;

    if (inputElement) {
      const errorElement = this._form?.querySelector(`.error__${inputElement.name}`);
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }

  _validateInputElement(element:HTMLInputElement) { // проверяет валидность отдельных инпутов
    this._form = this._element.querySelector('form');
    const errorElement = this._form?.querySelector(`.error__${element.name}`);

    if (element.checkValidity()) { return true }

    const requiredAndEmpty: boolean = element.hasAttribute('required') && !element.value

    if (requiredAndEmpty) {
      if (errorElement) {
        errorElement.textContent = 'Это обязательное поле';
      }

      return false;
    }

    const errorInput = element.getAttribute('data-error');

    if (errorInput) {
      if (errorElement) {
        errorElement.textContent = errorInput;
      }
      return false;
    }

    return false;
  }

  _validateForm() { // проверяет валидность всей формы
    let flagValid = true;
    this._form = this._element.querySelector('form');
    if (this._form) {
      Array.from(this._form)
        .filter(((item:HTMLElement) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return item.hasAttribute('name');
        }))
        .forEach((element:HTMLInputElement) => {
          if (!(this._validateInputElement(element))) flagValid = false;
        });
    }
    this._setSubmitButton(flagValid);
  }

  _setSubmitButton(flag:boolean) { // делает кнопку активной/неактивной
    if (this._button) {
      if (flag) {
        this._button.classList.add('button-valid');
        this._button.removeAttribute('disabled');
      } else {
        this._button.classList.remove('button-valid');
        this._button.setAttribute('disabled', 'disabled');
      }
    }
  }
}

export default FormValidation;
