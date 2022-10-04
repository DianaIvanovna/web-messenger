import {inputError} from "../../../../../constants/ErrorConst";
import {pattenrInput} from "../../../../../constants/PatternConsts";
type inputsType = {
  name: string,
  type: string,
  placeholder: string,
  title: string,
  pattern: string,
  'data-error': string,
  required: boolean,
}
type inputsPropsType = {
  emailInput: inputsType,
  loginInput: inputsType,
  firstNameInput: inputsType,
  secondNameInput: inputsType,
  phoneInput: inputsType,
}

export const inputsPropsFormUpdate:inputsPropsType = {
    emailInput: {
      name: 'email',
      type: 'text',
      placeholder: 'введите почту', 
      title: 'Почта',
      pattern: pattenrInput.email, 
      'data-error': inputError.email,
      required: true,
    },
    loginInput: {
      name: 'login',
      type: 'text',
      placeholder: 'введите Логин',
      title: 'Логин',
      pattern: pattenrInput.login, 
      'data-error': inputError.login,
      required: true,
    },
    firstNameInput: {
      name: 'first_name',
      type: 'text',
      placeholder: 'введите имя',
      title: 'Имя',
      pattern: pattenrInput.first_name, 
      'data-error': inputError.first_name,
      required: true,
    },
    secondNameInput: {
      name: 'second_name',
      type: 'text',
      placeholder: 'введите фамилию',
      title: 'Фамилия',
      pattern:pattenrInput.second_name, 
      'data-error': inputError.second_name,
      required: true,
    },
    phoneInput: {
      name: 'phone',
      type: 'text',
      placeholder: 'введите телефон',
      title: 'Телефон',
      pattern: pattenrInput.phone, 
      'data-error': inputError.phone,
      required: true,
    },
};
