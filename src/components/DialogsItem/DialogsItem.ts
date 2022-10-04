import './DialogsItem.scss';
import Block from '../../utils/ComponentFunctions/Block';
import avatarStub from "../../../static/img/avatars/avatar2.png";
import {LastMessageType} from "../../store/type";
import {EventElement} from "../../utils/ComponentFunctions/types";

type DialogsItemProps  = {
  id: number;
  photo: string;
  first_name:string;
  link: string;
  unreadMessage: number;
  messages:
    {
      text: string,
      data: string,
      flagRead: boolean,
      flagSend: boolean,
      myMes: boolean,
    }[] ;
  attr?: object,
  events?: EventElement[],
  avatar?:string;
  textLastMes?:string;
  timeLastMes?:string;
  last_message?:LastMessageType;
}

class DialogsItem extends Block {
  constructor(tag:string, props:DialogsItemProps) {
    const newProps = { ...props };
    if (!newProps.avatar) {
      newProps.avatar = avatarStub
    }
    newProps.textLastMes="";
    newProps.timeLastMes="";
    if (newProps.last_message) {
      newProps.textLastMes = newProps.last_message.content;
      const date= new Date(newProps.last_message.time);
      newProps.timeLastMes = `${date.getHours()}:${date.getMinutes()}`;
    }
    super(tag, newProps);
  }

  render() {
    return this.compile(`
    <div>
      <img src={{avatar}} alt="avatar" class="dialogs-item__photo"  />
    </div>
    <div class="dialogs-item__text-container" >
        <p class="dialogs-item__name">{{title}}</p>
        <p class="dialogs-item__messange">{{textLastMes}}</p>
    </div>

    <span class="dialogs-item__number">{{unread_count}}</span>
    <time class="dialogs-item__time">{{timeLastMes}}</time>
    `, undefined, true);
  }
}

export default DialogsItem;
