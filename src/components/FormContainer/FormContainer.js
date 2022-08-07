// Класс FormContainer нужен для валидации форм
import Block from '../../utils/ComponentFunctions/Block';

const validationRequiredField = 'Это обязательное поле';

class FormContainer extends Block {
  constructor(tag, props = {}) {
    super(tag, props);
    this._form = null;
  }

  componentDidMount() {
    this._validateForm();
  }

  addEvents() {
    const { events = [] } = this._props;

    // оставляю старую логику добавления событий
    let bufElement = null;

    events.forEach((element, index) => {
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
        .filter((item) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return !!item.name;
        })
        .forEach((element) => {
          element.addEventListener('blur', this._checkInputValidity.bind(this));
          element.addEventListener('focus', this._resetError.bind(this));
        });
    }

    if (this._button) {
      this._button.addEventListener('click', this._formSubmission.bind(this));
    }
  }

  removeEvents() {
    // оставляю старую логику добавления событий
    const { events = [] } = this._props;
    let bufElement = null;

    events.forEach((element, index) => {
      bufElement = this._element.querySelector(element.class);
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
        .filter((item) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return !!item.name;
        })
        .forEach((element) => {
          element.removeEventListener('input', this._checkInputValidity.bind(this));
        });
    }

    if (this._button) {
      this._button.removeEventListener('click', this._formSubmission.bind(this));
    }
  }

  _formSubmission(event) { // отправка формы
    this._validateForm();
    if (event.target.classList.contains('button-valid')) {
      this._props.sendForm(event);
    }
  }

  _checkInputValidity(event) {
    this._error.textContent = '';
    this._validateForm();
    this._validateInputElement(event.target);
  }

  _resetError(input) { // убирает сообщение об ошибке
    this._form = this._element.querySelector('form');
    const errorElement = this._form.querySelector(`.error__${input.target.name}`);
    errorElement.textContent = '';
  }

  _validateInputElement(element) { // проверяет валидность отдельных инпутов
    this._form = this._element.querySelector('form');
    const errorElement = this._form.querySelector(`.error__${element.name}`);

    if (!element.checkValidity()) {
      if (element.hasAttribute('required') && !element.value) {
        errorElement.textContent = validationRequiredField;
        return false;
      }

      const errorInput = element.getAttribute('data-error');

      if (errorInput) {
        errorElement.textContent = errorInput;
        return false;
      }

      return false;
    }
    return true;
  }

  _validateForm() { // проверяет валидность всей формы
    let flagValid = true;
    this._form = this._element.querySelector('form');
    if (this._form) {
      Array.from(this._form)
        .filter(((item) => {
          if (item.getAttribute('form') === this._props?.formId) {
            this._button = item;
          }
          return !!item.name;
        }))
        .forEach((element) => {
          if (!(this._validateInputElement(element, this._form))) flagValid = false;
        });
    }
    this._setSubmitButton(flagValid);
  }

  _setSubmitButton(flag) { // делает кнопку активной/неактивной
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

export default FormContainer;
