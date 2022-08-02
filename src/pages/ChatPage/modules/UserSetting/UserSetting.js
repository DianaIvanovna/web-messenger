import { getTemplate } from '../../../../utils/Templator';
import FieldInput from '../../../../components/FieldInput/FieldInput';
import './UserSetting.scss';
import photo from '../../../../../static/img/avatars/photo.jpg';
import pen from '../../../../../static/img/icons/pen.png';

const UserSetting = (props) => {
  const passwordForm = [
    {
      name: 'prevPassword',
      type: 'password',
      placeholder: 'введите Пароль',
      title: 'Старый пароль',
    },
    {
      name: 'newPassword',
      type: 'password',
      placeholder: 'введите Пароль',
      title: 'Новый пароль',
    },
    {
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Повторите новый пароль',
      title: 'Пароль',
    },
  ];
  let flagActiveForm = false;
  let form = '';
  props.userForm.forEach((item, index) => {
    form = form + FieldInput({ ...item, disabled: true });
  });

  const changeUserDataForm = (event) => {
    event.preventDefault();
    const formDom = document.querySelector('.user-setting__form');

    let form = '';
    props.userForm.forEach((item, index) => {
      form = form + FieldInput({ ...item });
    });

    form =
      form +
      `<button class="user-setting__button" > Сохранить </button>
    <button class="user-setting__button" >Отмена </button>`;

    console.log('form', form);
    formDom.innerHTML = form;
  };
  const changePassword = (event) => {
    event.preventDefault();
    const formDom = document.querySelector('.user-setting__form');

    let form = '';
    passwordForm.forEach((item, index) => {
      form = form + FieldInput({ ...item });
    });

    form =
      form +
      `<button class="user-setting__button" > Сохранить </button>
    <button class="user-setting__button" >Отмена </button>`;

    console.log('form', form);
    formDom.innerHTML = form;
  };

  //console.log('form', form);
  const context = {
    photo,
    pen,
    form,
    passwordForm,
    changeUserDataForm: () => {
      changeUserDataForm(event);
    },
    changePassword: () => {
      changePassword(event);
    },
  };
  const template = `
  <div class="user-setting" >
    <div class="user-setting__avatar-container" >
        <img src={{photo}} alt="аватар" class="user-setting__avatar" />
        <img src={{pen}} alt="изменить аватар" class="user-setting__icon" />
    </div>

    <form class="user-setting__form">
        {{form}}
        <button onClick={{changeUserDataForm}} class="user-setting__button" > Изменить данные </button>
        <button class="user-setting__button" onClick={{changePassword}}> Изменить пароль </button>
        <button class="user-setting__button user-setting__button--exit">Выйти </button>
   </form>
  </div>
   

  `;

  return getTemplate(template, context);
};

export default UserSetting;
