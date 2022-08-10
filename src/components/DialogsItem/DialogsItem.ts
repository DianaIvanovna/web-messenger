import './DialogsItem.scss';
import Block from '../../utils/ComponentFunctions/Block';

class DialogsItem extends Block {
  render() {
    return this.compile(`
    <img src={{photo}} alt="avatar" class="dialogs-item__photo"  />
    <div class="dialogs-item__text-container" >
        <p class="dialogs-item__name">{{first_name}}</p>
        <p class="dialogs-item__messange">{{lastMessange.text}}</p>
    </div>

    <span class="dialogs-item__number">{{unreadMessage}}</span>
    <time class="dialogs-item__time">10:49</time>
    `);
  }
}

export default DialogsItem;
