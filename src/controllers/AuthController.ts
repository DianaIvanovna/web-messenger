
import AuthApi from "../api/AuthApi/AuthApi";
import Store from "../store/Store";
import Router from '../utils/Router/Router';
import {signupData, signinData} from "../api/AuthApi/types";

const router = new Router(".root");

const authApi = new AuthApi();

class AuthController {
  public async auth() {
    try {
      document.querySelector(".preloader__back")?.classList.add("preloader__back--show")
      const data = await authApi.auth();

      setTimeout(()=>{
        Store.set("user", data);
        Store.set("auth.authCheck", true);
        Store.set("auth.isLogged", true);
        document.querySelector(".preloader__back")?.classList.remove("preloader__back--show")
        router.go("/messenger");

      }, 1000)
    } catch (error) {
      Store.set("auth.authCheck", true);
      Store.set("auth.isLogged", false);
      router.go("/reg");
      document.querySelector(".preloader__back")?.classList.remove("preloader__back--show")
    }
  }

  public async signup(data:signupData) {
    try {
      await authApi.signup(data);
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

      router.go("/reg");
      Store.set("user", null)
      Store.set("auth.isLogged", false);

    } catch (error) {
      Store.set("error", `${error.status}: ${error.text}`);
    }
  }
} 

  export default new AuthController;