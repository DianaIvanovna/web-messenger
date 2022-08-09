/* eslint no-param-reassign: "off" */
import Message from '../../../../components/Message/Message';
import SendMessange from '../../../../components/SendMessange/SendMessange';

const ChatContainer = (ParentComponent) => {
  class ChatContainerBlock extends ParentComponent {
    constructor(tag, props) {
      if (!props.activeChat) {
        props.activeChat = '<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>';
      }

      super(tag, props);
    }

    setProps = (newProps) => {
      if (!newProps) {
        return;
      }
      const nextProps = { ...newProps };
      this._setUpdate = false;
      const oldProps = { ...this._props };

      // логика для отображения всех сообщений из чата
      if ('activeChat' in nextProps) {
        let activeChatTmp = '';
        nextProps.activeChat.messages.forEach((message, index) => {
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
        this._eventBus.emit(ParentComponent.EVENTS.FLOW_CDU, oldProps, this._props);
        this._setUpdate = false;
      }
    };

    render() {
      return this.compile(`
        {{activeChat}}
      `);
    }
  }

  const chatContainerBlock = new ChatContainerBlock('div', {

    attr: { class: 'chat__container' },

  });

  return chatContainerBlock;
};

export default ChatContainer;
