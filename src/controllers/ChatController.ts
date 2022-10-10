import { ChatApi } from '../api/ChatApi/ChatApi';
import {
  DataAddUsers, DataCreateChat, DataUsersChat, DataTokenChat,
} from '../api/ChatApi/types';
import { Store } from '../store/Store';
import WebSocketService from '../utils/WebSocketService/WebSocketService';
import { ChatType, UserData } from '../store/type';

const api = new ChatApi();

class ChatControllerClass {
  private _webSocketService:WebSocketService;

  constructor() {
    this._webSocketService = new WebSocketService();
  }

  public async getChats() {
    try {
      const chats:ChatType[] = await api.getChats();

      Store.set('chats', chats);
      chats.forEach((chat) => {
        this.getTokenChat({
          id: chat.id,
        });
      });
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async getTokenChat(data:DataTokenChat) {
    try {
      const tokenData:{token:string} = await api.getTokenChat(data);
      const store = Store.getState();
      const indexChat = store.chats?.findIndex((item:ChatType) => item.id === data.id);

      if (indexChat !== -1) {
        this._webSocketService.use(store.user?.id, data.id, tokenData.token);
      }
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async createChat(data:DataCreateChat) {
    try {
      await api.createChat(data);
      this.getChats();
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async addUsersToChat(data:DataAddUsers) {
    try {
      await api.addUsersToChat(data);
      this.getChatUsers({
        id: data.chatId,
      });
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async deleteUsersToChat(data:DataAddUsers) {
    try {
      await api.deleteUsersToChat(data);
      this.getChatUsers({
        id: data.chatId,
      });
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public async getChatUsers(data:DataUsersChat) {
    try {
      const users:UserData[] = await api.getChatUsers(data);
      Store.set('usersActiveChat', users);
    } catch (error) {
      Store.set('error', `${error.status}: ${error.text}`);
    }
  }

  public openDialog(id: number) {
    Store.set('activeChatId', id);
  }
}

export const ChatController = new ChatControllerClass();
