import './Message.scss';
import Block from '../../utils/ComponentFunctions/Block';

class Message extends Block {
  render() {
    return this.compile(`
       <p class="message__text" >
          {{text}}
          <time class="message__data" >{{data}}</time>
        </p>
    `);
  }
}

export default Message;
