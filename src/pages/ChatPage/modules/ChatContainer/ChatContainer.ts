import Message from '../../../../components/Message/Message';
import SendMessange from '../../../../components/SendMessange/SendMessange';
import ChatMain from '../ChatMain/ChatMain';
import Store, {StoreEvents, Indexed} from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';

const ChatContainer = () => {

   function mapUserToProps(state:Indexed):Indexed {
    return {
      activeChat: state.activeChat
    }; 
  }

  class ChatContainerBlock extends ChatMain {
    constructor(tag:string, props:Record<string, any>) {
      const newProps = { ...props };
      if (!props.activeChat) {
        newProps.activeChat = '<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>';
      }
 
      super(tag, newProps);
    }

    setProps = (newProps:Record<string, any>) => {
      if (!newProps) {
        return;
      }
      const nextProps = { ...newProps };
      this._setUpdate = false;
      const oldProps = { ...this._props };

      type MessangeType = {
          text: string
          data: string,
          flagRead: boolean,
          flagSend: boolean,
          myMes: boolean,
      }

      // логика для отображения всех сообщений из чата
      if ('activeChat' in nextProps) {
        let activeChatTmp = '';
        console.log("nextProps.activeChat", nextProps.activeChat)
        nextProps.activeChat.messages.forEach((message:MessangeType, index:number) => {
          const messageName = `message-${index}`;
          const classMes = `message ${message.myMes ? 'message--my' : ''} ${
            message.flagRead ? 'message--read' : ''
          } ${message.flagSend ? 'message--send' : ''}`;

          nextProps[`message-${index}`] = new Message('div', {
            ...message,
            attr: { class: classMes },
          });
          activeChatTmp = `{{${messageName}}} ${activeChatTmp}`;
        });

        // форма отправки сообщения
        if (!this._children.SendMessange) {
          nextProps.SendMessange = new SendMessange('div', { attr: { class: 'chat__input-messange' } });
        }

        activeChatTmp = `${activeChatTmp} {{SendMessange}} `;

        nextProps.activeChat = activeChatTmp;
      }

      const { children, props } = this._getChildren(nextProps);

      if (Object.values(children).length) {
        Object.assign(this._children, children);
      }
      if (Object.values(props).length) {
        Object.assign(this._props, nextProps);
      }

      if (this._setUpdate) {
        this._eventBus.emit(ChatMain.EVENTS.FLOW_CDU, oldProps, this._props);
        this._setUpdate = false;
      }
    };

    render() {
      return this.compile(`
        {{activeChat}}
      `);
    }
  }

  const  ChatContainerBlockConnectedToStore = connect(ChatContainerBlock,mapUserToProps )


  const chatContainerBlock = new ChatContainerBlockConnectedToStore('div', {
    attr: { class: 'chat__container' },
  });

  return chatContainerBlock;
};

export default ChatContainer;
