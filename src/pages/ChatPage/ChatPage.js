import DialogsItem from '../../components/DialogsItem/DialogsItem';
import Message from '../../components/Message/Message';
import SendMessange from '../../components/SendMessange/SendMessange';
import UserSetting from './modules/UserSetting/UserSetting';
import { dialogs } from './data';

const chat = () => {
  const mainContainer = document.querySelector('.chat__main');
  const chatContainer = document.querySelector('.chat__container');
  const userForm = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'введите почту',
      title: 'Почта',
      value: 'pochta@yandex.ru',
    },
    {
      name: 'login',
      type: 'text',
      placeholder: 'введите Логин',
      title: 'Логин',
      value: 'ivanivanov',
    },
    {
      name: 'first-name',
      type: 'text',
      placeholder: 'введите имя',
      title: 'Имя',
      value: 'Иван',
    },
    {
      name: 'second-name',
      type: 'text',
      placeholder: 'введите фамилию',
      title: 'Фамилия',
      value: 'Иванов',
    },
    {
      name: 'phone',
      type: 'text',
      placeholder: 'введите телефон',
      title: 'Телефон',
      value: '+7 (909) 967 30 30',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'введите Пароль',
      title: 'Пароль',
      value: 'qwerty',
    },
  ];

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
    div.innerHTML = SendMessange();
    chatContainer.append(div);
  };

  const getUserSettings = () => {
    // ВЫВОД НАСТРОЕК ПОЛЬЗОВАТЕЛЯ

    mainContainer.innerHTML = '';

    let div = document.createElement('div');
    div.className = 'chat__user-setting';
    div.innerHTML = UserSetting({
      userForm,
    });
    mainContainer.append(div);
  };

  const getContacts = () => {
    // ВЫВОД КОНТАКТОВ
    mainContainer.innerHTML = 'разрабатывается..';
  };
  const getSettings = () => {
    // ВЫВОД НАСТРОЕК ПРИЛОЖЕНИЯ
    mainContainer.innerHTML = 'разрабатывается..';
  };

  const getDialogs = () => {
    // ВЫВОД СПИСКА ДИАЛОГОЛОВ
    mainContainer.innerHTML = '';

    dialogs?.forEach((item, index) => {
      let div = document.createElement('div');
      div.innerHTML = DialogsItem({
        ...item,
        lastMessange: item.messages?.[0],
        openDialog: () => {
          openDialog(index);
        },
      });

      mainContainer.append(div);
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
  chatContainer.innerHTML = `<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>`;
};

export default chat();
