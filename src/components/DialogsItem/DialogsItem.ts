import './DialogsItem.scss';
import Block from '../../utils/ComponentFunctions/Block';
import avatarStub from "../../../static/img/avatars/avatar2.png";

class DialogsItem extends Block {

  constructor(tag:string, props:Record<string, any>) {
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
    `);
  }
}

export default DialogsItem;
