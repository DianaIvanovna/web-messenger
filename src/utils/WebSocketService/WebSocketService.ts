import Store, {Indexed} from "../../store/Store";
import {SocketItem, sendData} from "./types";
import { chatType } from "../../store/type";

function mapUserToProps(state:Indexed):Indexed {
  return {
    chats: state.chats,
  }; 
}

export default class WebSocketService  {
  static __instance: any;
  static EVENTS = {
    OPEN: 'open',
    MESSANGE: 'message',
    ERROR: 'error',
    CLOSE: 'close',
  };

  private _sockets:SocketItem[] = []; 

  constructor() {
    if (WebSocketService.__instance) {
      return WebSocketService.__instance;
    }
    WebSocketService.__instance = this;
  }

  public use(userId:number, chatId:number, token:string) {
    const newSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 

    this._sockets.push({
      chatId: chatId,
      token: token,
      userId:userId,
      socket : newSocket,
    })

    this._addEventsHandler(newSocket, chatId);
  }


  private _addEventsHandler(socket:WebSocket, chatId:number) {
    socket.addEventListener('open', this._openSoket.bind(this, chatId));     // соединение установлено
    socket.addEventListener('message', this._newMessangeSoket.bind(this, chatId));  // пришло новое сообщение
    socket.addEventListener('error', this._errorSoket.bind(this, chatId));    // ошибка
    socket.addEventListener('close', this._closeSoket.bind(this, chatId));    // сокет закрылся
  }
  private _removeEventsHandler(socket:WebSocket) {
    socket.removeEventListener('open', this._openSoket.bind(this));     // соединение установлено
    socket.removeEventListener('message', this._newMessangeSoket.bind(this));  // пришло новое сообщение
    socket.removeEventListener('error', this._errorSoket.bind(this));    // ошибка
    socket.removeEventListener('close', this._closeSoket.bind(this));    // сокет закрылся
  }

  _openSoket() {
  }

  _newMessangeSoket(chatId:number) {
    const eventMessage = event as MessageEvent;
    if (!eventMessage) {
      return ;
    }

    const data = JSON.parse(eventMessage.data);
    const state = mapUserToProps(Store.getState());
    const index =  state.chats.findIndex((item:chatType)=>{
      return item.id === chatId
    })

    if (index === -1) {
      return;
    }
    
    if (data?.type === 'user connected') {
      Store.set(`chats.${index}.userConnect`, true)
      return;
    }

    let newMessages;
    let oldMessages = state.chats[index].messages? state.chats[index].messages : [];
    if (Array.isArray(data)) {
      newMessages = [...oldMessages, ...data,]
    } else {
      newMessages = [data, ...oldMessages]
    }

    if (newMessages ) {
      Store.set(`chats.${index}.messages`,  newMessages  )
    }

  }
  _errorSoket() {
    const eventMessage = event as ErrorEvent;
    if (!eventMessage) {
      return ;
    }
    console.log('Ошибка', eventMessage.message);
  }


  _closeSoket(chatId:number) {
    const eventMessage = event as CloseEvent;
    if (!eventMessage) {
      return ;
    }

    if (eventMessage.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
      if (eventMessage.code === 1006) {
        const indexSocket = this._sockets.findIndex((item)=>{
          return item.chatId === chatId
        })
        this._reconnecting(indexSocket);
      }
      
    }

    console.log('Код: ' + eventMessage.code + ' причина: ' + eventMessage.reason);
  }


  public send(chatId:number, messange:sendData) {
    const indexChat = this._sockets.findIndex((item)=>{
      return item.chatId === chatId
    })

    if (indexChat!== -1) {
      // добавить проверку что соединение отвалилось
      this._sockets[indexChat].socket.send(JSON.stringify(messange));
    }

  }

  public closeSockets() {
    this._sockets.forEach((item)=>{
      item.socket.close(1000, "работа закончена");
      this._removeEventsHandler(item.socket)
    })
  }

  private _reconnecting(indexSocket:number) {
    const data = this._sockets[indexSocket]; 
    if (data) {
      const newSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${data.token}`); 
      data.socket = newSocket
      this._addEventsHandler(newSocket, data.chatId);
    }
    
  }
  
}

