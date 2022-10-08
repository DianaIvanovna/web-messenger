import './UserSetting.scss';
import FormValidation from '../../../../utils/FormValidation/FormValidation';

import UserSettingFormUpdate from './modules/UserSettingFormUpdate';
import UserSettingPasswordUpdate from './modules/UserSettingPasswordUpdate';
import  { Indexed} from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';
import Avatar from '../../../../components/Avatar/Avatar';

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
            super(tagName, newProps);
            const avatar = new Avatar('div', {
              attr: { class: 'user-setting__avatar-container' }, 
            });


            this.setProps({
                avatar,
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
            
            {{avatar}}
            {{formUserUpdate}}
            {{formPasswordUpdate}}
          </div>
          `);
        }
    }
    const UserSettingConnectedToStore = connect(UserSetting,mapUserToProps );
    return  new UserSettingConnectedToStore('div', {
        attr: { class: 'chat__user-setting' },
      });
}

export default UserSettingComponent; 