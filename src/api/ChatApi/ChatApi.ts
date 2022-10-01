import HTTPTransport from "../../utils/HTTPTransport/HTTPTransport";
import {dataAddUsers, dataCreateChat, dataUsersChat, dataTokenChat} from "./types";


export default class ChatApi {
    private readonly _headers = {
        'content-type': 'application/json',
        'credentials': 'include',
        'mode': 'cors',
    } 

    private ChatApiInstance:HTTPTransport;

    constructor() {
        this.ChatApiInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/chats");
    }

    getChats() {
        return this.ChatApiInstance.get('/', {
            headers: this._headers,
        })
            .then((res:XMLHttpRequest) => { 
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
            .then(data => {
                return JSON.parse(data.response)
            })
    }

    getTokenChat(data:dataTokenChat) {  

        return this.ChatApiInstance.post(`/token/${data.id}`, {
            headers: this._headers,
            data,
        })
            .then((res:XMLHttpRequest) => { 
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
            .then(data => {
                return JSON.parse(data.response)
            })
    }

    createChat(data: dataCreateChat) {
        return this.ChatApiInstance.post('/', {
            headers: this._headers,
            data,
        })
            .then((res:XMLHttpRequest) => {
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
            .then(data => {
                return JSON.parse(data.response)
            })
    }

    getChatUsers(data: dataUsersChat) {
        return this.ChatApiInstance.get(  `/${data.id}/users`, {
            headers: this._headers,
            data,
        })
            .then((res:XMLHttpRequest) => {
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
            .then(data => {
                return JSON.parse(data.response)
            })
    }

    addUsersToChat(data:dataAddUsers) {
        return this.ChatApiInstance.put('/users', {
            headers: this._headers,
            data,
        })
            .then((res:XMLHttpRequest) => {
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
    }
   
    deleteUsersToChat(data:dataAddUsers) {
        return this.ChatApiInstance.delete('/users', {
            headers: this._headers,
            data,
        })
            .then((res:XMLHttpRequest) => {
                if (res.status === 200)  {
                    return res
                }
                return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
            })
    }

}
