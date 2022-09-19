import "./ChatPage.scss";
import Block from "../../utils/ComponentFunctions/Block";

import { Indexed} from '../../store/Store';
import { connect } from '../../store/utils/connect';

import icon1 from '../../../static/img/icons/user-settings.png';
import icon2 from '../../../static/img/icons/chats.png';
import icon3 from '../../../static/img/icons/contacts.png';
import icon4 from '../../../static/img/icons/settings.png';

import DialogsContainer from './modules/DialogsContainer/DialogsContainer';
import UserSettingComponent from './modules/UserSetting/UserSetting';
import SettingContainer from './modules/SettingContainer/SettingContainer';
import ContactsContainer from './modules/ContactsContainer/ContactsContainer';
import ChatContainer from './modules/ChatContainer/ChatContainer';

function mapUserToProps(state:Indexed):Indexed {
    return {
      user: state.user,
    }; 
}

class Chat extends Block{
    _arrComponents;
    
    constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
        const newProps = { ...propsAndChildren };
        newProps.menuStyle = 'chat__menu chat__menu--active-1';
        newProps.dialogsContainer = DialogsContainer();
        newProps.userSetting = UserSettingComponent();
        newProps.contactsContainer = ContactsContainer();
        newProps.settingContainer = SettingContainer();
        newProps.chatContainer = ChatContainer();
        newProps.activeChat = null;
        newProps.events = [
            {
                class: '.chat__icon--0',
                event: 'click',
                handler: (event:Event) => {
                  this.iconHandler( 0, event);
                },
            },
            {
                class: '.chat__icon--1',
                event: 'click',
                handler: (event:Event) => {
                    this.iconHandler( 1, event);
                },
              },
              {
                class: '.chat__icon--2',
                event: 'click',
                handler: (event:Event) => {
                    this.iconHandler( 2, event);
                },
              },
              {
                class: '.chat__icon--3',
                event: 'click',
                handler: (event:Event) => {
                    this.iconHandler(3, event);
                },
              },
        ]

        

        super(tagName, newProps);
        this._arrComponents = [newProps.userSetting,newProps.dialogsContainer, newProps.contactsContainer, newProps.settingContainer ];
    }
    componentDidMount() {
        this.iconHandler(0);
    }

    iconHandler( index:number, event?:Event) {
        event?.preventDefault();
        event?.stopPropagation();
        this._arrComponents.forEach((item,indexComponent)=> {
            if (indexComponent === index) {
                item.show();
                return;
            }
            item.hide();
        })


        this.setProps(
            {
                menuStyle: `chat__menu chat__menu--active-${index}`,
            }
        )
    }

    init() {
        this._createResources();
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    render() {
        return this.compile(`
        <div class="chat__menu-container">
        <div class="{{menuStyle}}">
          <img
            class="chat__icon chat__icon--0"
            src="{{icon1}}"
            alt="настройки пользователя"
          />
          <img
            class="chat__icon chat__icon--1"
            src="{{icon2}}"
            alt="чаты"
          />
          <img
            class="chat__icon chat__icon--2"
            src="{{icon3}}"
            alt="контакты"
          />
          <img
            class="chat__icon chat__icon--3"
            src="{{icon4}}"
            alt="настройки"
          />
        </div>
  
        <div class="chat__main">
          {{userSetting}}
          {{dialogsContainer}}
          {{contactsContainer}}
          {{settingContainer}}
        </div>
        
      </div>
      {{chatContainer}}
        `);
    }
}

const ChatConnectedToStore = connect(Chat,mapUserToProps )

export default new ChatConnectedToStore("div", {
    icon1,icon2,icon3,icon4,
    attr: { class: 'chat' },
});