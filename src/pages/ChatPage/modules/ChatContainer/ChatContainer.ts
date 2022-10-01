import Message from '../../../../components/Message/Message';
import SendMessange from '../../../../components/SendMessange/SendMessange';
import ChatMain from '../ChatMain/ChatMain';
import { PlainObject } from '../../../../utils/ComponentFunctions/Block';
import {Indexed} from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';
import MessageController from '../../../../controllers/MessageController';
import Button from '../../../../components/Button/Button';

import { chatType, messageType } from '../../../../store/type';

const ChatContainer = () => {

   function mapUserToProps(state:Indexed):Indexed {
    return {
      userId: state.user?.id,
      chats: state.chats,
      activeChatId: state.activeChatId,
    }; 
  }

  class ChatContainerBlock extends ChatMain {
    _messageController;
    _flagChangeDialog = false;


    constructor(tag:string, props:Record<string, any>) {
      const newProps = { ...props };
      if (!props.activeChatId) {
        newProps.activeChatTmp = '<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>';
      }
      super(tag, newProps);

      const DownloadMoreButton = new Button('div', {
        text: `Загрузить еще`,
        class: "chat__button-download",
        shift: 20,
        events: [
          {
            event: 'click',
            handler: this._downloadMore.bind(this)
          }
        ]
      });
     

      this._messageController = MessageController;
      this.setProps({
        DownloadMoreButton,
      })
    } 
    
    middlewareProps(nextProps:PlainObject):PlainObject {
        if ('chats' in nextProps && nextProps.chats) {
            let activeChatTmp = ''; 
            let messangeTmp = '';
            const activeChatId = nextProps.activeChatId? nextProps.activeChatId : this._props.activeChatId;

            const findIndex = nextProps.chats.findIndex((item:chatType)=> {
              return item.id===activeChatId
            }) 

            if (findIndex === -1) {
              activeChatTmp = '<p class="chat__subtitle">Выберите чат чтобы отправить сообщение</p>';
             
            } else {
              if (nextProps.chats[findIndex]?.messages &&nextProps.chats[findIndex]?.messages.length !==0 ) {
                 // формирую массив сообщение и шаблон сообщений
                messangeTmp = this.createMessangesDOM(nextProps.chats[findIndex].messages, nextProps);
                if (nextProps.chats[findIndex]?.messages?.length % 20) {
                  messangeTmp = ` ${messangeTmp}`
                }else {
                  
                  messangeTmp = `{{DownloadMoreButton}} ${messangeTmp}`
                }
              }
              activeChatTmp = `<div class="chat__container-messages">${messangeTmp}</div> {{sendMessange}} `;
            }
            nextProps.activeChatId = nextProps.activeChatId;
            nextProps.activeChatTmp = activeChatTmp
           
        }
        if ('activeChatId' in nextProps && nextProps.activeChatId !== this._props.activeChatId) {
          this._flagChangeDialog = true;
        }


        

        if ('openPopupAddUsers' in nextProps ) {
          const sendMessange = new SendMessange('div',{ 
            openPopupAddUsers: nextProps.openPopupAddUsers,
            sendMessange: this.sendMessange.bind(this),
            attr: { class: 'chat__input-messange' } 
          });

          this.setProps({
            sendMessange: sendMessange,
          })
        }
        return nextProps;
    }

    private _downloadMore() {
      const chatId = this._props.activeChatId;
      const findIndex = this._props.chats.findIndex((item:chatType)=> {
        return item.id===chatId
      });
      if (findIndex !== -1) {
        const mesLen = this._props.chats[findIndex].messages?.length;
        MessageController.getOldMessages(chatId, mesLen)
      }
    }

    private createMessangesDOM(messages:messageType[], nextProps:any):string {
      let tmp =''
      messages.forEach((message:messageType, index:number) => {
        const flagMesMy = +message.user_id ===+this._props.userId;
        const messageName = `message-${index}`;
        const classMes = `message ${flagMesMy ? 'message--my' : ''} ${message.is_read ? 'message--read' : ''}`; 
        //добавить проверку на отправленность сообщения message--send

        nextProps[`message-${index}`] = new Message('div', {
          ...message,
          attr: { class: classMes },
        });
        tmp = `{{${messageName}}} ${tmp}`;
      });

      return tmp;
    }

    sendMessange(value:string) {
      if (this._props.activeChatId) {
        this._messageController.sendMessange(this._props.activeChatId,value) 
      }
    }

    // afterRendering() {
    //   const messangeContainer = this.element.querySelector('.chat__container-messages');
    //   if (messangeContainer ) {
    //     console.log("скролл вниз")
    //     messangeContainer.scrollTop = messangeContainer.scrollHeight;
    //     this._flagChangeDialog = false;
    //   }
    // }

    render() {
      
      return this.compile(`
        {{activeChatTmp}}
      `);
    }
  }

  const  ChatContainerBlockConnectedToStore = connect(ChatContainerBlock,mapUserToProps)


  const chatContainerBlock = new ChatContainerBlockConnectedToStore('div', {
    attr: { class: 'chat__container' },
  });

  return chatContainerBlock;
};

export default ChatContainer;
