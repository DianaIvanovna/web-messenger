import './SearchUser.scss';
import FormValidation from '../../utils/FormValidation/FormValidation';
import { UserController } from '../../controllers/UserController';
import { ChatController } from '../../controllers/ChatController';
import Button from '../Button/Button';
import { connect } from '../../store/utils/connect';
import { Indexed } from '../../store/Store';
import List from '../List/List';
import { EventElement } from '../../utils/ComponentFunctions/types';
import { SVG } from '../SVG/SVG';
import Block from '../../utils/ComponentFunctions/Block';

type PlainObject = { [key: string]: any }

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

type SearchUserProps = {
  attr?:object,
  events?: EventElement[],
  formId?: string,
  searchUsers?: UsersType[],
  activeChatId?: number,
  svg?: Block
}

function mapUserToProps(state:Indexed):Indexed {
  return {
    searchUsers: state.searchUsers,
    activeChatId: state.activeChatId,
  };
}

class SearchUser extends FormValidation {
  constructor(tag:string, props:SearchUserProps) {
    const newProps = { ...props };
    newProps.formId = 'searchUser';
    newProps.svg = new SVG('div', { id: 'search' });

    super(tag, newProps);

    if (newProps.searchUsers) {
      this.usersHandler(newProps.searchUsers);
    }

    const listUsers = new List('div', {
      arrChildren: [],
      classLi: 'search-user__li',
      attr: { class: 'search-user__list' },
      events: [
        {
          event: 'click',
          handler: this.addUserToChat.bind(this),
        },
      ],
    });

    const createChatBtn = new Button('div', {
      text: 'найти',
      form: this._props.formId,
      class: ' default-button create-chat-form__button',
      events: [
        {
          event: 'click',
          handler: this.sendForm.bind(this),
        },
      ],
    });

    this.setProps({
      sendForm: this.sendForm.bind(this),
      createChatBtn,
      listUsers,
    });
  }

  usersHandler(users:UsersType[]) {
    let arr:string[];
    if (users?.length > 0) {
      arr = users.map((item) => `<span data-user-id="${item.id}" >${item.login}</span>`);
    } else if (users?.length === 0) {
      arr = ['пользователь не найден'];
    } else {
      arr = [];
    }
    this._children.listUsers.setProps({
      arrChildren: arr,
    });
  }

  sendForm(event:Event) {
    event.preventDefault();
    event.stopPropagation();

    const form: HTMLElement|null = document.getElementById(this._props.formId);

    if (form) {
      const input = form.querySelector('input[name="login"]') as HTMLInputElement;
      UserController.searchUser({
        login: input ? input.value : '',
      });
      this._children.listUsers.show();
    }
  }

  addUserToChat(event:Event) {
    const eventTarget = event.target as HTMLInputElement;
    const id = eventTarget?.getAttribute('data-user-id');

    if (id) {
      ChatController.addUsersToChat({
        users: [+id],
        chatId: this._props.activeChatId,
      });
      this._children.listUsers.hide();
    }
  }

  middlewareProps(nextProps:PlainObject):PlainObject {
    if ('searchUsers' in nextProps) {
      this.usersHandler(nextProps.searchUsers);
    }

    return nextProps;
  }

  render() {
    return this.compile(`
        <form  id={{formId}} class="search-user"  >
            <div class="search-user__input-container">
                <input class="search-user__input" input" type="text" name="login" placeholder="добавить человека по логину" required  >
                </input>
                <button  form="{{formId}}" class="search-user__button" >
                  
                  {{svg}}
                </button>
                {{listUsers}}
            </div> 
        </form>
      `);
  }
}

export default connect(SearchUser, mapUserToProps);
