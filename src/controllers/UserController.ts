import { UserApi } from '../api/UserApi/UserApi';
import { Store } from '../store/Store';
import { ProfileData, PasswordData, SearchUserData } from '../api/UserApi/types';
import { UserData } from '../store/type';

const api = new UserApi();

class UserControllerClass {
  public async changeProfile(data:ProfileData) {
    try {
      const user:UserData = await api.profile(data);
      Store.set('user', user);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async changePassword(data:PasswordData) {
    try {
      await api.password(data);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async changeAvatar(data:FormData) {
    try {
      const user:UserData = await api.avatar(data);
      Store.set('user', user);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async getAvatar(path:string) {
    try {
      const avatar:string = await api.getAvatar(path);
      Store.set('user.avatarFile', avatar);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async searchUser(data:SearchUserData) {
    try {
      const users:UserData[] = await api.searchUser(data);
      Store.set('searchUsers', users);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }
}

export const UserController = new UserControllerClass();
