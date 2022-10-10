import './AddUserToChatForm.scss';
import sanitizeHtml from 'sanitize-html';
import FormValidation from '../../../../utils/FormValidation/FormValidation';
import SearchUser from '../../../../components/SearchUser/SearchUser';
import List from '../../../../components/List/List';
import deleteIcon from '../../../../../static/img/icons/delete.png';
import { ChatController } from '../../../../controllers/ChatController';

import { connect } from '../../../../store/utils/connect';
import { Indexed } from '../../../../store/Store';

type UsersType = {
  avatar: string,
  display_name: string,
  email: string,
  first_name: string,
  id: number,
  login: string,
  phone: string,
  role: string,
  second_name: string,
}

type PlainObject = { [key: string]: any }

function mapUserToProps(state:Indexed):Indexed {
  return {
    usersActiveChat: state.usersActiveChat,
    activeChatId: state.activeChatId,
    user: state.user,
  };
}

class AddUserToChatForm extends FormValidation {
  constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
    const newProps = { ...propsAndChildren };
    newProps.formId = 'createChat';

    const listUsers = new List('div', {
      arrChildren: [],
      classLi: 'add-user-to-chat-form__li',
      deleteIcon,
      attr: { class: 'add-user-to-chat-form__list' },
      events: [
        {
          event: 'click',
          class: '.add-user-to-chat-form__icon',
          handler: (event:Event) => {
            this.deleteUser(event);
          },
        },
      ],
    });

    newProps.listUsers = listUsers;

    const searchUser = new SearchUser('div', {});

    newProps.SearchUser = searchUser;

    super(tagName, newProps);

    if (newProps.usersActiveChat) {
      this.usersHandler(newProps.usersActiveChat);
    }
  }

  sendForm(event:Event) {
    event.preventDefault();
    event.stopPropagation();

    const form: HTMLElement|null = document.getElementById(this._props.formId);

    if (form) {
      const title = form.querySelector('input[name="title"]') as HTMLInputElement;
      ChatController.createChat({
        title: title ? title.value : '',
      });
    }
  }

  deleteUser(event:Event) {
    const eventTarget = event.target as HTMLInputElement;
    const id = eventTarget?.getAttribute('data-user-id');

    if (id) {
      ChatController.deleteUsersToChat({
        users: [+id],
        chatId: this._props.activeChatId,
      });
    }
  }

  usersHandler(users:UsersType[]) {
    let arr;
    if (users?.length > 0) {
      arr = users.map((item) => {
        if (item.id === this._props.user?.id) {
          return `Вы: ${item.login} `;
        }
        return `${sanitizeHtml(item.login)} <img src={{deleteIcon}} alt="удалить" class="add-user-to-chat-form__icon" data-user-id="${item.id}" ></img>`;
      });
    } else {
      arr = ['Нет пользователей'];
    }

    this._children.listUsers.setProps({
      arrChildren: arr,
    });
  }

  middlewareProps(nextProps:PlainObject):PlainObject {
    if ('activeChatId' in nextProps && nextProps.activeChatId) {
      if (nextProps.activeChatId !== this._props.activeChatId) {
        ChatController.getChatUsers({
          id: nextProps.activeChatId,
        });
      }
    }

    if ('usersActiveChat' in nextProps && nextProps.usersActiveChat) {
      this.usersHandler(nextProps.usersActiveChat);
    }

    return nextProps;
  }

  render() {
    return this.compile(`
        {{SearchUser}}
        <h2 class="add-user-to-chat-form__title" >Пользователи чата:</h2>
        {{listUsers}}
    `);
  }
}

export default connect(AddUserToChatForm, mapUserToProps);
