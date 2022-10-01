import './Message.scss';
import Block from '../../utils/ComponentFunctions/Block';

class Message extends Block {
  constructor(tag:string, props:Record<string, any>) {
    const newProps = { ...props };
    const date= new Date(newProps.time);
    newProps.time = `${date.getHours()}:${date.getMinutes()}`;

    super(tag, newProps);
  }
  render() {
    return this.compile(`
       <p class="message__text" >
          {{content}}
          <time class="message__data" >{{time}}</time>
        </p>
    `);
  }
}

export default Message;
