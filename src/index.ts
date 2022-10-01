import './style.scss';
import Router from './utils/Router/Router';
import {ErrorPage404,ErrorPage500} from "./pages/ErrorPage/ErrorPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import loginForm from './pages/LoginAndSigninPage/LoginForm';
import regForm from "./pages/LoginAndSigninPage/RegForm";
import EventBus from './utils/ComponentFunctions/EventBus';
import PopupError from './components/PopupError/PopupError';
import renderDOM from './utils/ComponentFunctions/renderDom';

import { connect } from './store/utils/connect';
import AuthController from './controllers/AuthController';
import Store, {Indexed} from "./store/Store";

function mapToProps(state:Indexed):Indexed {
    return {
        isLogged: state.auth.isLogged,
    }; 
}

function mapUserToProps(state:Indexed):Indexed {
    return {
        error: state.error,
    }; 
}


class Index {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
      };
    private _eventBus;
    private _authController;
    constructor() {
        this._eventBus = new EventBus();
        this._registerEvents();
        this._authController = AuthController;
        this._eventBus.emit(Index.EVENTS.INIT);
    }

    _registerEvents() {
        this._eventBus.on(Index.EVENTS.INIT, this.init.bind(this));
    }

    checkingForAuthorization(): boolean {
        const state = mapToProps(Store.getState());
        return state.isLogged
    }

    init() {
        // в самом начале запускаю роутинг
        const router = new Router(".root");

        router
        .use("/", loginForm)
        .use("/500", ErrorPage500)
        .use("/messenger", ChatPage, this.checkingForAuthorization)  
        .use( "/sign-up", regForm)
        .use("*", ErrorPage404)

        .start();

        this._authController.auth();

        const PopupErrorConnectedToStore= connect(PopupError,mapUserToProps )
        const popupError = new PopupErrorConnectedToStore('div', {
            attr: { class: 'popup-error' },
            
        }) 
        popupError.hide()
        renderDOM(".popup-error-container", popupError)
    }

}
export default new Index();

 