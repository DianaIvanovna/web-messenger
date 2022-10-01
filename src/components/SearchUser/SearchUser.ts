import "./SearchUser.scss";
import FormValidation from "../../utils/FormValidation/FormValidation";
import UserController from "../../controllers/UserController";
import ChatController from "../../controllers/ChatController";
import Button from "../Button/Button";
import { connect } from '../../store/utils/connect';
import  { Indexed} from '../../store/Store';
import List from "../List/List";

type PlainObject = { [key: string]: any }

type usersType = {
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

function mapUserToProps(state:Indexed):Indexed {
  return {
    searchUsers: state.searchUsers,
    activeChatId: state.activeChatId,
  }; 
}

class SearchUser extends FormValidation { 
    private _userController ;
    private _chatController ;

    constructor(tag:string, props:Record<string, any>) {
      const newProps = { ...props };
      newProps.formId = "searchUser";
      super(tag, newProps);

      if (newProps.searchUsers) {
        this.usersHandler(newProps.searchUsers);
      }

      this._userController = UserController;
      this._chatController = ChatController;

      const listUsers =  new List('div', {
        arrChildren: [],
        classLi: "search-user__li",
        attr: { class: "search-user__list" },
        events: [
         {
          event: "click",
          handler: this.addUserToChat.bind(this),
         }
        ]
      });

      const createChatBtn = new Button('div', {
        text: 'найти',
        form: this._props.formId,
        class:" default-button create-chat-form__button",
        events: [
          {
            event: 'click',
            handler: this.sendForm.bind(this),
          },
        ],
      });
      
      this.setProps({
        sendForm: this.sendForm.bind(this),
        createChatBtn: createChatBtn,
        listUsers: listUsers,
      })
    } 

    usersHandler(users:usersType[]) {  
      let arr:string[];
      if (users?.length >0) {
        arr = users.map((item)=>{
          return `<span data-user-id="${item.id}" >${item.login}</span>`
        })
      } else if (users?.length === 0) {
        arr = [`пользователь не найден`]
      }else  {
        arr = []
      }
      this._children.listUsers.setProps({
        arrChildren: arr
      });
    }

    sendForm(event:Event) {
      event.preventDefault();
      event.stopPropagation();

      const form: HTMLElement|null = document.getElementById(this._props.formId);
  
      if (form) {
        const input = form.querySelector('input[name="login"]') as HTMLInputElement;
        this._userController.searchUser({
          login: input ? input.value : "",
        });
        this._children.listUsers.show();
      }
    }

    addUserToChat(event:Event) {
      const eventTarget = event.target as HTMLInputElement ;
      const id = eventTarget?.getAttribute("data-user-id") ;

      if (id) {
        this._chatController.addUsersToChat({
          users: [+id],
          chatId: this._props.activeChatId
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
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8854 15.9456C12.2351 18.0682 8.35569 17.9011 5.8989 15.4444C3.26287 12.8083 3.26287 8.53445 5.8989 5.89842C8.53494 3.26238 12.8088 3.26238 15.4448 5.89842C17.9016 8.3552 18.0687 12.2346 15.946 14.8849L21.1017 20.0405C21.3946 20.3334 21.3946 20.8083 21.1017 21.1012C20.8088 21.3941 20.3339 21.3941 20.041 21.1012L14.8854 15.9456ZM6.95956 14.3837C4.90931 12.3334 4.90931 9.00933 6.95956 6.95908C9.00982 4.90882 12.3339 4.90882 14.3842 6.95908C16.4329 9.00782 16.4344 12.3286 14.3887 14.3792C14.3872 14.3807 14.3857 14.3822 14.3842 14.3837C14.3827 14.3852 14.3812 14.3867 14.3797 14.3882C12.3291 16.4339 9.00831 16.4324 6.95956 14.3837Z" fill="black"/>
                  </svg>
                </button>
                {{listUsers}}
            </div> 
        </form>
      `);
    }
  }
  
  export default   connect(SearchUser,mapUserToProps );
//{{createChatBtn}}

// <form className="search-psychologist-by-name__form">
// <div className="search-psychologist-by-name__input-container">
//     <SVG id={props.svg ? props.svg : "search"} />
//     <input
//         ref={inputRef}
//         type="text"
//         placeholder="Поиск по ФИО"
//         className="search-psychologist-by-name__input"
//         value={props.searchValue}
//         onChange={event => {
//             setSearchValue(event.target.value);
//         }}
//         onClick={() => {
//             setSelectedPsychologistId(null);
//         }}
//     />
// </div>

// {arrPsychologist && showList ? (
//     <>
//         {filteredPsychologist.length === 0 ? (
//             <ul className="search-psychologist-by-name__list">
//                 <p className="search-psychologist-by-name__error">Психологи не найдены...</p>
//             </ul>
//         ) : (
//             <ul className="search-psychologist-by-name__list">
//                 {filteredPsychologist.map((item, index) => {
//                     return (
//                         <li
//                             key={index}
//                             onClick={() => {
//                                 if (selectedPsychologistId === item.id) {
//                                     setSelectedPsychologistId(null);
//                                     inputRef.current.value = "";
//                                 } else {
//                                     setSelectedPsychologistId(item.id);
//                                     inputRef.current.value = item.firstName;
//                                     setShowList(false);
//                                 }
//                             }}
//                             className={selectedPsychologistId === item.id ? "search-psychologist-by-name__li--active" : ""}
//                         >
//                             <p>{item.firstName}</p>
//                         </li>
//                     );
//                 })}
//             </ul>
//         )}
//     </>
// ) : null}
// </form>