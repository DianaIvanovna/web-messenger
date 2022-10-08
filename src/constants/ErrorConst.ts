export const enum InputError {
    email= 'Неправильный формат email',
    login= 'Должно быть от 3 до 20 символов. Допускается латиница, цифры (но не состоять из цифр), дефис и нижнее подчёркивание',
    first_name= 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    second_name= 'Первая буква должна быть заглавной. Допускается латиница или кириллица, дефис.',
    phone= 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
    password= 'Пароль должен содержать от 8 до 40 символов. Обязательно хотя бы одна заглавная буква и цифра.',
    password_repeat= 'Пароль не совпадает',
}

