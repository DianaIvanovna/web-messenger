import DialogsItem from '../../components/DialogsItem/DialogsItem';
import Message from '../../components/Message/Message';
import SendMessange from '../../components/SendMessange/SendMessange';
import { dialogs } from './data';

(function () {
  const MainContainer = document.querySelector('.chat__main');
  const chatContainer = document.querySelector('.chat__container');

  const openDialog = (index) => {
    chatContainer.innerHTML = '';
    chatContainer.classList.add('chat__container--dialog');

    dialogs?.[index].messages.forEach((item, index) => {
      let div = document.createElement('div');
      div.className = 'chat__messange';
      div.innerHTML = Message({
        ...item,
      });

      chatContainer.prepend(div);
    });

    let div = document.createElement('div');
    div.className = 'chat__messange';
    div.innerHTML = SendMessange({});
    console.log('div', div);
    chatContainer.append(div);
  };

  const getUserSettings = () => {
    // ВЫВОД НАСТРОЕК ПОЛЬЗОВАТЕЛЯ
    MainContainer.innerHTML = 'getUserSettings';
  };

  const getContacts = () => {
    // ВЫВОД КОНТАКТОВ
    MainContainer.innerHTML = 'getContacts';
  };
  const getSettings = () => {
    // ВЫВОД НАСТРОЕК ПРИЛОЖЕНИЯ
    MainContainer.innerHTML = 'getSettings';
  };

  const getDialogs = () => {
    // ВЫВОД СПИСКА ДИАЛОГОЛОВ
    MainContainer.innerHTML = '';

    dialogs?.forEach((item, index) => {
      let div = document.createElement('div');
      div.innerHTML = DialogsItem({
        ...item,
        lastMessange: item.messages?.[0],
        openDialog: () => {
          openDialog(index);
        },
      });

      MainContainer.append(div);
    });
  };

  const menuFunction = [getUserSettings, getDialogs, getContacts, getSettings];
  const chatMenu = document.querySelector('.chat__menu');
  const chatMenuButton = document.querySelectorAll('.chat__icon');
  chatMenuButton.forEach((item, index) => {
    item.addEventListener('click', () => {
      menuFunction[index]();
      chatMenu.className = `chat__menu chat__menu--active-${index}`;
    });
  });

  // при первом открытии показываю список чатов
  menuFunction[1]();
  // при первом открытии
  //chatContainer.innerHTML = `<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>`;
  openDialog(0);
})();
