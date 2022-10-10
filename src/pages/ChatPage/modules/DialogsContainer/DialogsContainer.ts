/* eslint no-unused-vars: "off" */
import Block, { PlainObject } from '../../../../utils/ComponentFunctions/Block';
import DialogsItem from '../../../../components/DialogsItem/DialogsItem';
import { Indexed } from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';
import { ChatController } from '../../../../controllers/ChatController';
import Button from '../../../../components/Button/Button';

import { DialogInterface } from '../../../../store/type';
import { MessageController } from '../../../../controllers/MessageController';

const DialogsHandler = (dialogs:DialogInterface[]) => {
  const dialogComponents:Record<string, DialogsItem> = {};

  let dialogTmp = '';
  dialogs?.forEach((item, index) => {
    dialogComponents[`dialogComponents-${index}`] = new DialogsItem('div', {
      ...item,
      attr: { class: 'dialogs-item' },
      events: [
        {
          event: 'click',
          handler: (event:Event) => {
            event.preventDefault();
            event.stopPropagation();
            ChatController.openDialog(dialogs?.[index].id);
            if (!dialogs?.[index].messages) {
              MessageController.getOldMessages(dialogs?.[index].id);
            }
          },
        },
      ],
    });
  });

  Object.entries(dialogComponents).forEach(([key]) => {
    dialogTmp = `${dialogTmp}  {{${key}}}`;
  });

  return {
    dialogComponents,
    dialogTmp,
  };
};

function mapUserToProps(state:Indexed):Indexed {
  return {
    chats: state.chats,
  };
}

class DialogsContainerBlock extends Block {
  constructor(tagName:string = 'div', props:Record<string, any> = {}) {
    const newProps = { ...props };

    if (!props.chats) {
      newProps.dialogTmp = "<div class='chat__loader' >Загрузка...</div>";
    }

    super(tagName, newProps);
    const button = new Button('div', {
      text: 'Создать новый чат',
      class: 'chat__button-new-chat',
      events: [
        {
          event: 'click',
          handler: this.createChat.bind(this),
        },
      ],
    });
    this.setProps({
      button,
    });
  }

  componentDidMount() {
    ChatController.getChats();
  }

  middlewareProps(nextProps:PlainObject):PlainObject {
    let newProps = { ...nextProps };

    if ('chats' in newProps && newProps.chats) {
      if (newProps.chats.length === 0) {
        const dialogTmp = '<p>Диалогов нет</p>';
        newProps = { ...newProps, dialogTmp };
      } else {
        const { dialogComponents, dialogTmp } = DialogsHandler(newProps.chats);
        newProps = { ...newProps, ...dialogComponents, dialogTmp };
      }
    }

    return newProps;
  }

  createChat() {
    this._props.openPopupCreateChat();
  }

  render() {
    const template = `{{button}} ${this._props.dialogTmp}`;
    return this.compile(template);
  }
}

const DialogsContainerBlockConnectedToStore = connect(DialogsContainerBlock, mapUserToProps);

const dialogsContainerBlock = new DialogsContainerBlockConnectedToStore('div', {});

export default dialogsContainerBlock;
