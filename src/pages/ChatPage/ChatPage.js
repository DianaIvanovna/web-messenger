import { getTemplate } from '../../utils/Templator';
import DialogsItem from '../../components/DialogsItem/DialogsItem';
import { dialogs } from './data';

(function () {
  const MainContainer = document.querySelector('.chat__main');

  const getUserSettings = () => {
    MainContainer.innerHTML = 'getUserSettings';
  };
  const getDialogs = () => {
    // ВЫВОД СПИСКА ДИАЛОГОЛОВ
    MainContainer.innerHTML = '';

    dialogs?.forEach((item, index) => {
      let div = document.createElement('div');
      div.innerHTML = DialogsItem(item);
      MainContainer.append(div);
    });
  };
  const getContacts = () => {
    MainContainer.innerHTML = 'getContacts';
  };
  const getSettings = () => {
    MainContainer.innerHTML = 'getSettings';
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
})();

// import classes from './ChatPage.module.scss';

// const ChatPage = () => {
//   const listContentArr = [
//     {
//       menuContent: '1',
//       messangeContainer: '1',
//     },
//     {
//       menuContent: '2',
//       messangeContainer: '2',
//     },
//     {
//       menuContent: '3',
//       messangeContainer: '3',
//     },
//     {
//       menuContent: '4',
//       messangeContainer: '4',
//     },
//   ];

//   const iconHadler = (index) => {
//     document.querySelector(`.${classes.chat__ul}`).innerHTML =
//       listContentArr[index].menuContent;

//     console.log(document.querySelector(`.${classes.chat__container}`));
//     document.querySelector(`.${classes.chat__container}`).innerHTML =
//       listContentArr[index].messangeContainer;
//   };

//   const context = {
//     classes,
//     iconChat,
//     iconContacts,
//     iconSettings,
//     iconUserSettings,
//     iconHadler0: () => {
//       iconHadler(0);
//     },
//     iconHadler1: () => {
//       iconHadler(1);
//     },
//     iconHadler2: () => {
//       iconHadler(2);
//     },
//     iconHadler3: () => {
//       iconHadler(3);
//     },
//   };

//   const template = `
//     <div class={{classes.chat}}>
//       <div class={{classes.chat__list}}>
//         <div class={{classes.chat__menu}}>
//           <img class={{classes.chat__icon}} onClick={{iconHadler0}} src={{iconUserSettings}} alt="настройки пользователя"/>
//           <img class={{classes.chat__icon}} onClick={{iconHadler1}} src={{iconChat}} alt="чаты"/>
//           <img class={{classes.chat__icon}} onClick={{iconHadler2}} src={{iconContacts}} alt="контакты"/>
//           <img class={{classes.chat__icon}} onClick={{iconHadler3}} src={{iconSettings}} alt="настройки"/>
//         </div>

//         <div class={{classes.chat__ul}}>
//         1
//         </div>
//       </div>
//       <div class={{classes.chat__container}}>fdfdsf</div>
//     </div>
//   `;

//   return getTemplate(template, context);
// };

// export default ChatPage;
