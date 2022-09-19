type inputsPropsType = {
    [key:string]: {[key:string]:string|boolean}
  }

export const inputsPropsFormUpdate:inputsPropsType = {
    emailInput: {
      name: 'email',
      type: 'text',
      placeholder: 'введите почту', 
      title: 'Почта',
      pattern: '^[A-Za-z]([A-za-z\w-][.]?)+[A-Za-z0-9]@[a-z]*\.[a-z]{2,6}\.?[a-z]{0,6}',
      'data-error': 'Неправильный формат email',
      required: true,
    },
    loginInput: {
      name: 'login',
      type: 'text',
      placeholder: 'введите Логин',
      title: 'Логин',
      pattern: '^(?=.*[A-Za-z])[0-9A-Za-z_-]{3,20}$',
      'data-error': 'Должно быть от 3 до 20 символов. Допускается латиница, цифры (но не состоять из цифр), дефис и нижнее подчёркивание',
      required: true,
    },
    firstNameInput: {
      name: 'first_name',
      type: 'text',
      placeholder: 'введите имя',
      title: 'Имя',
      pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
      'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
      required: true,
    },
    secondNameInput: {
      name: 'second_name',
      type: 'text',
      placeholder: 'введите фамилию',
      title: 'Фамилия',
      pattern: '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
      'data-error': 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
      required: true,
    },
    phoneInput: {
      name: 'phone',
      type: 'text',
      placeholder: 'введите телефон',
      title: 'Телефон',
      pattern: '(^[+]*)([0-9]{10,15})',
      'data-error': 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
      required: true,
    },
};