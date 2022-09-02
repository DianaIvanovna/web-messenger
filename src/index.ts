import './style.scss';
import Router from './utils/Router/Router';
import {ErrorPage404,ErrorPage500} from "./pages/ErrorPage/ErrorPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import loginForm from './pages/LoginAndSigninPage/LoginForm';
import regForm from "./pages/LoginAndSigninPage/RegForm";

const router = new Router(".root");

router
.use("/404", ErrorPage404)
.use("/500", ErrorPage500)
.use("/", ChatPage)
.use("/login", loginForm)
.use("/reg", regForm)
.start();
