import HTTPTransport from "../../utils/HTTPTransport/HTTPTransport";
import {DataAddUsers, DataCreateChat, DataUsersChat, DataTokenChat} from "./types";
import { TOptions, METHODS} from '../types';
import { ChatType, UserData } from "../../store/type";


export class ChatApi {
    private readonly _defaultHeaders = {
        'content-type': 'application/json',
        'credentials': 'include',
        'mode': 'cors',
    }
    private _authInstance:HTTPTransport;

    constructor() {
        this._authInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/chats");
    }

    request(path:string, options:TOptions={}) {
        if (!options.headers) {
            options.headers = this._defaultHeaders
        }

        return this._authInstance.request(path, options)
            .then((res:XMLHttpRequest) => {
                if (res.status === 200) return res;

                return Promise.reject({
                    status: res.status,
                    text: res.response
                }); 
            }) 
            .then(data => {
                if ( data.response==="OK") {
                    return null
                }
                return JSON.parse(data.response)
            })
    }

    getChats():Promise<ChatType[]> {
        return this.request('/', {
            method: METHODS.GET
        })
    }

    getTokenChat(data:DataTokenChat):Promise<{token:string }> {  
        return this.request(`/token/${data.id}`, {
            method: METHODS.POST,
            data,
        })
    }

    createChat(data: DataCreateChat):Promise<null>  {
        return this.request(`/`, {
            method: METHODS.POST,
            data,
        })
    }

    getChatUsers(data: DataUsersChat):Promise<UserData[]>  {
        return this.request(`/${data.id}/users`, {
            method: METHODS.GET,
            data,
        })
    }

    addUsersToChat(data:DataAddUsers):Promise<null> {
        return this.request('/users', {
            method: METHODS.PUT,
            data,
        })

    }
   
    deleteUsersToChat(data:DataAddUsers):Promise<null> {
        return this.request('/users', {
            method: METHODS.DELETE,
            data,
        })
    }
}
