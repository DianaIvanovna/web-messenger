import EventBus from "../utils/ComponentFunctions/EventBus";
import set from "../utils/OtherFunctions/set";
import {ChatType} from "./type";

export enum StoreEvents {
    Updated = 'updated',
}
export type storeType = {
  chats: ChatType[],
};

export type Indexed<T = any> = {
    [key in string]: T;
};

const DEFAULT_STATE  = {
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
}

class StoreClass extends EventBus  {

    private state: Indexed = DEFAULT_STATE;
  
    public getState() {
      return this.state;
    }
    public resetState() {
      return this.state = DEFAULT_STATE;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvents.Updated);
    };
} 


export const Store = new StoreClass()
