/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export const enum PatternInput {
    email= '^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2}$',
    login= '^(?=.*[A-Za-z])[0-9A-Za-z_-]{3,20}$',
    first_name= '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    second_name= '(^[A-ZА-Я])([A-ZА-Яa-zа-я-]+)',
    phone= '(^[+]*)([0-9]{10,15})',
    password= '^(?=.*[A-ZА-Я])(?=.*[0-9]).{10,}$',
}
