import EventBus from "../utils/ComponentFunctions/EventBus";
import set from "../utils/OtherFunctions/set";
import {chatType} from "./type";

export enum StoreEvents {
    Updated = 'updated',
}
export type storeType = {
  chats: chatType[],
};

export type Indexed<T = any> = {
    [key in string]: T;
};

class Store extends EventBus  {
    // constructor() {}

    private _resetData: Indexed = {
      auth: {
        authCheck: false,
        isLogged: false,
      },
      error: null,
      searchUsers: null,
      user: null,
      chats:  null,
      activeChat : null,
      usersActiveChat: null
  };

    private state: Indexed = {
        auth: {
          authCheck: false,
          isLogged: false,
        },
        error: null,
        searchUsers: null,
        user: null,
        chats:  null,
        activeChat : null,
        usersActiveChat: null
    };
  
    public getState() {
      return this.state;
    }
    public resetState() {
      return this.state = this._resetData;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvents.Updated);
    };
} 

const store = new Store()

export default store;