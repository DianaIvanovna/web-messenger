import './UserSetting.scss';
import FormValidation from '../../../../utils/FormValidation/FormValidation';
import pen from '../../../../../static/img/icons/pen.png';
import UserSettingFormUpdate from './modules/UserSettingFormUpdate';
import UserSettingPasswordUpdate from './modules/UserSettingPasswordUpdate';
import Store, {StoreEvents, Indexed} from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';
import Block from "../../../../utils/ComponentFunctions/Block";
import { getTemplate } from '../../../../utils/Templator/Templator';

import photo from '../../../../../static/img/avatars/avatar4.png';

type PlainObject = { [key: string]: any }

const UserSettingComponent = () => {

    function mapUserToProps(state:Indexed):Indexed {
        return {
          user: state.user,
        }; 
    }

    class UserSetting extends FormValidation {
        constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
            const newProps = { ...propsAndChildren };
            newProps.avatar = photo;
            super(tagName, newProps);

            this.setProps({
                formUserUpdate: UserSettingFormUpdate(this.changeForm.bind(this)),
                formPasswordUpdate : UserSettingPasswordUpdate(this.changeForm.bind(this)),
            })
        }
        componentDidMount() {
            this.changeForm("formUpdate");
        }

        changeForm (form:'formUpdate' |'formPassword') {
            if (form === 'formUpdate') {
              this._children.formUserUpdate.show();
              this._children.formPasswordUpdate.hide();
            } else {
                this._children.formUserUpdate.hide();
                this._children.formPasswordUpdate.show();
            }
        };

        middlewareProps(nextProps:PlainObject):PlainObject {
          if ('user' in nextProps) {
            if (nextProps.user?.avatar) {
                nextProps.avatar = nextProps.user.avatar
            }
          }

          return nextProps;
        }

      render() {
          return this.compile(`
          <div class="user-setting">
            <div class="user-setting__avatar-container" >
              <img src={{avatar}} alt="аватар" class="user-setting__avatar" />
              <img src={{pen}} alt="изменить аватар" class="user-setting__icon" />
            </div>
            {{formUserUpdate}}
            {{formPasswordUpdate}}
          </div>
          `);
        }
    }
    const UserSettingConnectedToStore = connect(UserSetting,mapUserToProps );
    return  new UserSettingConnectedToStore('div', {
        //photo,
        pen,
       // formUserUpdate,
        //formPasswordUpdate,
        attr: { class: 'chat__user-setting' },
    
      });
}

export default UserSettingComponent; 