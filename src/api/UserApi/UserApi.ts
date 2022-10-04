import HTTPTransport from "../../utils/HTTPTransport/HTTPTransport";
import {ProfileData, PasswordData, SearchUserData} from "./types";
import { TOptions, METHODS} from '../types';
import { UserData } from "../../store/type";

export class UserApi {
    private readonly _defaultHeaders = {
        'content-type': 'application/json',
        'credentials': 'include',
        'mode': 'cors',
    }
    private _authInstance:HTTPTransport;

    constructor() {
        this._authInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2");
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

    profile(data: ProfileData):Promise<UserData> {
        return this.request('/user/profile', {
            method: METHODS.PUT,
            data: data 
        })
    }
    avatar(data: FormData):Promise<UserData> {
        return this.request('/user/profile/avatar', {
            method: METHODS.PUT,
            headers: {
                'credentials': 'include',
                'mode': 'cors',
            },
            formData: data 
        })

    }
    getAvatar(path:string):Promise<string>{

        return this._authInstance.get(`/resources${path}`, {
            headers: this._defaultHeaders,
        })
        .then((res:XMLHttpRequest) => {
            if (res.status === 200)  {
                return res
            }
            
            return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
        })
        .then(data => {
            return data.responseURL
        })
    }
    password(data: PasswordData):Promise<null> {
        return this.request('/user/password', {
            method: METHODS.PUT,
            data: data 
        })
        
    }

    searchUser(data: SearchUserData):Promise<UserData[]> {
        return this.request('/user/search', {
            method: METHODS.POST,
            data: data 
        })
        
    }
}
