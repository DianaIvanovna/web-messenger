
import AuthApi from "../api/AuthApi/AuthApi";
import Store from "../store/Store";
import Router from '../utils/Router/Router';
import {signupData, signinData} from "../api/AuthApi/types";
import MessageController from "./MessageController";

const router = new Router(".root");

const authApi = new AuthApi();

class AuthController {
  public async auth() {
    try {
      document.querySelector(".preloader__back")?.classList.add("preloader__back--show")
      const data = await authApi.auth();
      Store.set("user", data);
      Store.set("auth.authCheck", true);
      Store.set("auth.isLogged", true);
      document.querySelector(".preloader__back")?.classList.remove("preloader__back--show")
      router.go("/messenger");
    } catch (error) {
      Store.set("auth.authCheck", true);
      Store.set("auth.isLogged", false);
      //router.go("/");
      document.querySelector(".preloader__back")?.classList.remove("preloader__back--show")
    }
  }

  public async signup(data:signupData) {
    try {
      await authApi.signup(data);
      router.go("/messenger");
    } catch (error) {
      Store.set("error", `${error.status}: ${error.text}`);
    }
  }
  public async signin(data:signinData) {
    try {
      await authApi.signin(data);

      this.auth()
    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  }

  public async logout() {
    try {
      await authApi.logout();

      router.go("/");
      MessageController.closeSockets();
      Store.resetState();

    } catch (error) {
      Store.set("error", `${error.status}: ${error.text}`);
    }
  }
} 

  export default new AuthController;