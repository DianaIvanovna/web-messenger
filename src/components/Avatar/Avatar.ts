import './Avatar.scss';
import Block from '../../utils/ComponentFunctions/Block';
import pen from '../../../static/img/icons/pen.png';
import  {Indexed} from '../../store/Store';
import { connect } from '../../store/utils/connect';
import {UserController} from '../../controllers/UserController';
import photo from '../../../static/img/avatars/avatar4.png';

function mapUserToProps(state:Indexed):Indexed {
    return {
        avatar: state.user?.avatar || null,
        avatarFile: state.user?.avatarFile || null,
    }; 
}
 
class Avatar extends Block {
    constructor(tag:string, props:{attr?:object}) {  
        const newProps:Record<string, any> = { ...props, pen };

        super(tag, newProps);
        const events = [
            ...(newProps.events || []),
            {   
                event: 'change',
                class:".avatar__input",
                handler: this.sendAvatar.bind(this)
            }
        ]
            
        this.setProps({
            events: events,
        })
    }

    sendAvatar(event:Event) {
        event.preventDefault();
        event.stopPropagation();
        let Data = new FormData();
        const eventTarget = event.target as HTMLInputElement ;
        if (eventTarget.files) {
            Data.append('avatar', eventTarget.files[0]);
            UserController.changeAvatar(Data);
        }
    }

    middlewareProps(nextProps:Indexed):Indexed {
        if (!nextProps.avatar) {
            nextProps.avatarFile = photo
        }
        if ('avatar' in nextProps && nextProps.avatar) {
            UserController.getAvatar(nextProps.avatar);
            
        }

        return nextProps;
    }

    render() {
        return this.compile(`
        <form  id="avatarForm" class="avatar__form" >
            <input type="file" id="file-input" name="file" multiple class="avatar__input" accept=".jpg, .jpeg, .png" >
            <label for="file-input">
            
            <img src={{avatarFile}} alt="аватар" class="avatar__file" />
            <img src={{pen}} alt="изменить аватар" class="avatar__icon" />
            </label>
        </form>
        `);
    }
}


export default connect(Avatar,mapUserToProps );
