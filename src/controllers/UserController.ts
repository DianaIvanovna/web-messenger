
import UserApi from "../api/UserApi/UserApi";
import Store from "../store/Store";
import Router from '../utils/Router/Router';
import {profileData, passwordData} from "../api/UserApi/types"

const router = new Router(".root");
const api = new UserApi();

class UserController {

  public async changeProfile(data:profileData) {
    try {
      const user = await api.profile(data);
      Store.set("user", user) 

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  }
  public async changePassword(data:passwordData) {
    try {
       await api.password(data);

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  }
  public async changeAvatar(data:FormData) {
    try {
       const user = await api.avatar(data);
       Store.set("user", user) 

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  }
  public async getAvatar(path:string) {
    try {
       const avatar = await api.getAvatar(path);
      // console.log("avatar", avatar)
       Store.set("user.avatarFile", avatar) 

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  }

} 

  export default new UserController;