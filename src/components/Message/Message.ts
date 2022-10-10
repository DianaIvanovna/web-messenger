import './Message.scss';
import Block from '../../utils/ComponentFunctions/Block';

type MessageProps = {
  attr?:object,
  chat_id: number,
  content: string,
  file: null,
  id: number,
  is_read: boolean,
  time: string,
  type: 'message'
  user_id: number,
}

class Message extends Block {
  constructor(tag:string, props:MessageProps) {
    const newProps = { ...props };
    const date = new Date(newProps.time);
    newProps.time = `${date.getHours()}:${date.getMinutes()}`;

    super(tag, newProps);
  }

  render() {
    return this.compile(`
       <p class="message__text" >
          {{content}}
          <time class="message__data" >{{time}}</time>
        </p>
    `, undefined, true);
  }
}

export default Message;
