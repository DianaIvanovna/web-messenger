import Block from '../../utils/ComponentFunctions/Block';
import renderDOM from '../../utils/ComponentFunctions/renderDom';
import UserSettingComponent from './modules/UserSetting/UserSetting';
import DialogsContainer from './modules/DialogsContainer/DialogsContainer';
import SettingContainer from './modules/SettingContainer/SettingContainer';
import ContactsContainer from './modules/ContactsContainer/ContactsContainer';
import ChatContainer from './modules/ChatContainer/ChatContainer';

import icon1 from '../../../static/img/icons/user-settings.png';
import icon2 from '../../../static/img/icons/chats.png';
import icon3 from '../../../static/img/icons/contacts.png';
import icon4 from '../../../static/img/icons/settings.png';

const chat = () => {
  class ChatMain extends Block {
    setProps = (nextProps) => {
      if (!nextProps) {
        return;
      }

      this._setUpdate = false;
      const oldProps = { ...this._props };

      // activeChat - переменная с чатом, который нужно открыть в chatContainer
      // если она изменилась, передаю пропсом в chatContainer
      if ('activeChat' in nextProps && this._children.chatContainer) {
        this._children.chatContainer.setProps({
          activeChat: nextProps.activeChat,
        });
      }

      const { children, props } = this._getChildren(nextProps);

      if (Object.values(children).length) {
        Object.assign(this._children, children);
      }
      if (Object.values(props).length) {
        Object.assign(this._props, nextProps);
      }

      if (this._setUpdate) {
        this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
        this._setUpdate = false;
      }
    };

    get element() {
      return this._element;
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

  const openDialog = (item) => {
    chatMain.setProps({
      activeChat: item,
    });
  };

  const userSetting = UserSettingComponent();
  const dialogsContainer = DialogsContainer(openDialog);
  const contactsContainer = ContactsContainer();
  const settingContainer = SettingContainer();
  const chatContainer = ChatContainer(ChatMain);

  const menuStyle = 'chat__menu chat__menu--active-1';

  const iconHandler = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    menuFunction[index]();
    chatMain.setProps({
      menuStyle: `chat__menu chat__menu--active-${index}`,
    });
  };
  const getUserSettings = () => {
    userSetting.show();
    dialogsContainer.hide();
    contactsContainer.hide();
    settingContainer.hide();
  };
  const getDialogs = () => {
    userSetting.hide();
    dialogsContainer.show();
    contactsContainer.hide();
    settingContainer.hide();
  };

  const getContacts = () => {
    userSetting.hide();
    dialogsContainer.hide();
    contactsContainer.show();
    settingContainer.hide();
  };

  const getSettings = () => {
    userSetting.hide();
    dialogsContainer.hide();
    contactsContainer.hide();
    settingContainer.show();
  };

  const menuFunction = [getUserSettings, getDialogs, getContacts, getSettings];

  menuFunction[1]();

  const chatMain = new ChatMain('div', {
    icon1,
    icon2,
    icon3,
    icon4,
    menuStyle,
    userSetting,
    contactsContainer,
    settingContainer,
    dialogsContainer,
    chatContainer,
    activeChat: null,
    attr: { class: 'chat' },
    events: [
      {
        class: '.chat__icon--0',
        event: 'click',
        handler: (event) => {
          iconHandler(event, 0);
        },
      },
      {
        class: '.chat__icon--1',
        event: 'click',
        handler: (event) => {
          iconHandler(event, 1);
        },
      },
      {
        class: '.chat__icon--2',
        event: 'click',
        handler: (event) => {
          iconHandler(event, 2);
        },
      },
      {
        class: '.chat__icon--3',
        event: 'click',
        handler: (event) => {
          iconHandler(event, 3);
        },
      },
    ],
  });

  renderDOM('.root', chatMain);
};

export default chat();
