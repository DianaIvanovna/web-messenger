import Block from '../../utils/ComponentFunctions/Block';
import renderDOM from '../../utils/ComponentFunctions/renderDom';
import UserSettingComponent from './modules/UserSetting/UserSetting';

const chat = () => {
  const userSetting = UserSettingComponent();

  class ChatPage extends Block {
    render() {
      return this.compile(`
        {{userSetting}}
      `);
    }
  }

  const chatPage = new ChatPage('div', {
    userSetting,
    attr: { class: 'chat__main' },
  });

  renderDOM('.chat__menu-container', chatPage);
};

export default chat();
