// пробуем сделать шаблон для кнопки

import { getTemplate } from '../../utils/Templator';
import './DialogsItem.scss';

const DialogsItem = (props) => {
  const context = {
    first_name: props.first_name,
    id: props.id,
    link: props.link,
    photo: props.photo,
    unreadMessage: props.unreadMessage,
  };
  const template = `
    <div class="dialogs-item">
    <img src={{photo}} alt="avatar" class="dialogs-item__photo"  />
    <div class="dialogs-item__text-container" >
        <p class="dialogs-item__name">{{first_name}}</p>
        <p class="dialogs-item__messange">Друзья, у меня для вас особенный выпуск новостей! Это супер пупуер интересно и длинно</p>
    </div>
   
    <span class="dialogs-item__number">{{unreadMessage}}</span>
    <span class="dialogs-item__time">10:49</span>
    </div>
  
  `;

  return getTemplate(template, context);
};

export default DialogsItem;
