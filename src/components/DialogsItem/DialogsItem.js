import { getTemplate } from '../../utils/Templator';
import './DialogsItem.scss';

const DialogsItem = (props) => {
  const context = {
    first_name: props.first_name,
    id: props.id,
    link: props.link,
    photo: props.photo,
    unreadMessage: props.unreadMessage,
    lastMessange: props.lastMessange,
    openDialog: props.openDialog,
  };
  const template = `
    <div class="dialogs-item" onClick={{openDialog}}>
    <img src={{photo}} alt="avatar" class="dialogs-item__photo"  />
    <div class="dialogs-item__text-container" >
        <p class="dialogs-item__name">{{first_name}}</p>
        <p class="dialogs-item__messange">{{lastMessange.text}}</p>
    </div>
   
    <span class="dialogs-item__number">{{unreadMessage}}</span>
    <span class="dialogs-item__time">10:49</span>
    </div>
  
  `;

  return getTemplate(template, context);
};

export default DialogsItem;
