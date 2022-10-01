
import ChatApi from "../api/ChatApi/ChatApi";
import {dataAddUsers, dataCreateChat,dataUsersChat} from "../api/ChatApi/types";
import Store from "../store/Store";
import WebSocketService from "../utils/WebSocketService/WebSocketService";
import {chatType} from "../store/type";
import {dataTokenChat} from "../api/ChatApi/types";

const api = new ChatApi();
 
class ChatController {
  private _webSocketService:WebSocketService ;
  constructor() {
    this._webSocketService = new WebSocketService();
  }

  public async getChats() {
    try {
      const chats:chatType[] = await api.getChats();
    
      Store.set("chats", chats);
      chats.forEach(chat => { 
        this.getTokenChat({
          id: chat.id
        })
      });

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 
  
  public async getTokenChat(data:dataTokenChat) {
    try {
      const tokenData = await api.getTokenChat(data);
      const store = Store.getState();
      const indexChat = store.chats?.findIndex((item:chatType)=>{
        return item.id === data.id
      })

      if (indexChat!== -1) {
        this._webSocketService.use(store.user?.id, data.id, tokenData.token)
      }

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 

  public async createChat(data:dataCreateChat) {
    try {
      const chat = await api.createChat(data);
      console.log("chats", chat)
      this.getChats()

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 
  public async addUsersToChat(data:dataAddUsers) {
    try {
      await api.addUsersToChat(data);
      this.getChatUsers({
        id: data.chatId
      })

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 
  public async deleteUsersToChat(data:dataAddUsers) {
    try {
      await api.deleteUsersToChat(data);
      this.getChatUsers({
        id: data.chatId
      })

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 
  public async getChatUsers(data:dataUsersChat) {
    try {
      const users = await api.getChatUsers(data);
      Store.set("usersActiveChat",users);
      console.log("users", users);
      

    } catch (error) {
        Store.set("error", `${error.status}: ${error.text}`);
    }
  } 

  public openDialog (id: number) {
    Store.set("activeChatId", id);
  }
} 

  export default new ChatController;