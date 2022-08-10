import './UserSetting.scss';
import FormValidation from '../../../../utils/FormValidation/FormValidation';
import pen from '../../../../../static/img/icons/pen.png';
import UserSettingFormUpdate from './modules/UserSettingFormUpdate';
import UserSettingPasswordUpdate from './modules/UserSettingPasswordUpdate';

// временно
import photo from '../../../../../static/img/avatars/photo.jpg';

const UserSettingComponent = () => {
  const changeForm = (form:'formUpdate' |'formPassword') => {
    if (form === 'formUpdate') {
      formUserUpdate.show();
      formPasswordUpdate.hide();
    } else {
      formUserUpdate.hide();
      formPasswordUpdate.show();
    }
  };
  const formUserUpdate = UserSettingFormUpdate(changeForm);
  const formPasswordUpdate = UserSettingPasswordUpdate(changeForm);

  changeForm('formUpdate');
  class UserSetting extends FormValidation {
    render() {
      return this.compile(`
      <div class="user-setting">
        <div class="user-setting__avatar-container" >
          <img src={{photo}} alt="аватар" class="user-setting__avatar" />
          <img src={{pen}} alt="изменить аватар" class="user-setting__icon" />
        </div>
        {{formUserUpdate}}
        {{formPasswordUpdate}}
      </div>
      `);
    }
  }

  const userSetting = new UserSetting('div', {
    photo,
    pen,
    formUserUpdate,
    formPasswordUpdate,
    attr: { class: 'chat__user-setting' },

  });

  return userSetting;
};

export default UserSettingComponent;
