import './style.scss';
import Router from './utils/Router/Router';
import {ErrorPage404,ErrorPage500} from "./pages/ErrorPage/ErrorPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import loginForm from './pages/LoginAndSigninPage/LoginForm';
import regForm from "./pages/LoginAndSigninPage/RegForm";
import HomePage from "./pages/HomePage/HomePage";
import EventBus from './utils/ComponentFunctions/EventBus';
import PopupError from './components/PopupError/PopupError';
import renderDOM from './utils/ComponentFunctions/renderDom';

import { connect } from './store/utils/connect';

// /*ТЕСТ */
// import Block from './utils/ComponentFunctions/Block';
// import StoreTest, {StoreEvents} from "./store/StoreTest";
// import {connect} from "./store/utils/connect";

// class Test extends Block {
//     render() {
        
//       return this.compile(`
//       <h1 class="error-page__title">ТЕЕЕЕСТ</h1>
//         <p class="error-page__description">{{test}}</p>
//       `);
//     }
//   }
//   type Indexed<T = any> = {
//     [key in string]: T;
// };
//  function mapUserToProps(state:Indexed):Indexed {
//     return {
//         test: state.testText,
//     };
// }

// const NewTest = connect(Test, mapUserToProps);

//   setTimeout(()=> {
//     StoreTest.set("test2", "neeeeeeeeeeeeeeeeeeew test2")
//   }, 3000)
//   setTimeout(()=> {
//     StoreTest.set("testText", "neeeeeeeeeeeeeeeeeeew testText")
//   }, 4000)

//   const test =  new NewTest('div', {attr: { class: 'error-page' },code:"404", title: "Oooops! Страница не найдена",});
// // КОНЕЦ ТЕСТА


//test2
// const host = 'https://ya-praktikum.tech';

// fetch(`${host}/api/v2/auth/signup`, {
//   method: 'POST',
//   credentials: 'include', // Нужно подставлять куки
//   mode: 'cors', // Работаем с CORS
//   headers: {
//     'content-type': 'application/json', // Данные отправляем в формате JSON
//   },
//   body: JSON.stringify({
//     first_name: "Артурт",
//     second_name: "Морган",
//     login: `a.morgan`,
//     email: `a.morgan@rdr2.com`,
//     phone: "+71234567890",
//     password: "p@ssw0rd", // Грустный и слабый пароль, можно вот так: oPKzos*1X$uKz$ta
//   }),
// })
//   .then(response => response.text()) // Можно вытащить через .json()
//   .then(data => {
//     console.log(data);
//     return data;
//   })
//   .then(data => {
//     fetch(`${host}/api/v2/auth/user`, { // Получаем подробную информацию о пользователе и проверяем, что куки проставились
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//     })
//     .then(r => r.json())
//     .then(data => {
//       console.log('user', data);
//     });
//   });

// import UserLoginController from "./controllers/UserLoginController";

// const data = {
//     first_name: "ddd",
//     second_name: "ddd",
//     login: "login",
//     email: "email",
//     password:"password",
//     phone:"phone",
// }

// const userLoginController = new UserLoginController();

// userLoginController.signup(data)

//конец тест 2





//test3

import UserLoginController from './controllers/UserLoginController';
// UserLoginController.auth()

//end test3




class Index {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
      };
    private _eventBus;
    private _userLoginController;
    constructor() {
        console.log("constructor")
        this._eventBus = new EventBus();
        this._registerEvents();
        this._userLoginController = UserLoginController;
        this._eventBus.emit(Index.EVENTS.INIT);
    }

    _registerEvents() {
        console.log("_registerEvents")
        this._eventBus.on(Index.EVENTS.INIT, this.init.bind(this));
        // this._eventBus.on(Index.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        // this._eventBus.on(Index.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        // this._eventBus.on(Index.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        console.log("init")
        // в самом начале запускаю роутинг
        const router = new Router(".root");

        router
        .use("/", HomePage)
        .use("/500", ErrorPage500)
        .use("/messenger", ChatPage) 
        .use("/login", loginForm)
        .use("/reg", regForm)
        .use("*", ErrorPage404)
        // .use("*",regForm)

        .start();

        this._userLoginController.auth();
    }

}

function mapUserToProps(state:Indexed):Indexed {
    return {
        error: state.error,
    }; 
}

const PopupErrorConnectedToStore= connect(PopupError,mapUserToProps )

const popupError = new PopupErrorConnectedToStore('div', {
    attr: { class: 'popup-error' },
    
}) 

popupError.hide()
renderDOM(".popup-error-container", popupError)

const index = new Index();




// const router = new Router(".root");

// router
// .use("/", HomePage)
// .use("/500", ErrorPage500)
// .use("/messenger", ChatPage) 
// .use("/login", loginForm)
// .use("/reg", regForm)
// .use("*", ErrorPage404)
// // .use("*",regForm)

// .start();
 