import "./ChatPage.scss";
import UserSettingComponent from './modules/UserSetting/UserSetting';
import DialogsContainer from './modules/DialogsContainer/DialogsContainer';
import SettingContainer from './modules/SettingContainer/SettingContainer';
import ContactsContainer from './modules/ContactsContainer/ContactsContainer';
import ChatContainer from './modules/ChatContainer/ChatContainer';
import ChatMain from './modules/ChatMain/ChatMain';

import icon1 from '../../../static/img/icons/user-settings.png';
import icon2 from '../../../static/img/icons/chats.png';
import icon3 from '../../../static/img/icons/contacts.png';
import icon4 from '../../../static/img/icons/settings.png';

import { dialogInterface } from './data';

const chat = () => {
  // const openDialog = (item:dialogInterface) => {
  //   chatMain.setProps({
  //     activeChat: item,
  //   });
  // };

  const userSetting = UserSettingComponent();
  const dialogsContainer = DialogsContainer();
  const contactsContainer = ContactsContainer();
  const settingContainer = SettingContainer();
  const chatContainer = ChatContainer();

  const menuStyle = 'chat__menu chat__menu--active-1';

  const iconHandler = (event:Event, index:number) => {
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
        handler: (event:Event) => {
          iconHandler(event, 0);
        },
      },
      {
        class: '.chat__icon--1',
        event: 'click',
        handler: (event:Event) => {
          iconHandler(event, 1);
        },
      },
      {
        class: '.chat__icon--2',
        event: 'click',
        handler: (event:Event) => {
          iconHandler(event, 2);
        },
      },
      {
        class: '.chat__icon--3',
        event: 'click',
        handler: (event:Event) => {
          iconHandler(event, 3);
        },
      },
    ],
  });

  return chatMain;
};

export default chat();
