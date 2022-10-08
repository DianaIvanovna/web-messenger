import {InputError} from "../../../../../constants/ErrorConst";
import {PatternInput} from "../../../../../constants/PatternConsts";
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
      pattern: PatternInput.email, 
      'data-error': InputError.email,
      required: true,
    },
    loginInput: {
      name: 'login',
      type: 'text',
      placeholder: 'введите Логин',
      title: 'Логин',
      pattern: PatternInput.login, 
      'data-error': InputError.login,
      required: true,
    },
    firstNameInput: {
      name: 'first_name',
      type: 'text',
      placeholder: 'введите имя',
      title: 'Имя',
      pattern: PatternInput.first_name, 
      'data-error': InputError.first_name,
      required: true,
    },
    secondNameInput: {
      name: 'second_name',
      type: 'text',
      placeholder: 'введите фамилию',
      title: 'Фамилия',
      pattern:PatternInput.second_name, 
      'data-error': InputError.second_name,
      required: true,
    },
    phoneInput: {
      name: 'phone',
      type: 'text',
      placeholder: 'введите телефон',
      title: 'Телефон',
      pattern: PatternInput.phone, 
      'data-error': InputError.phone,
      required: true,
    },
};
