import HTTPTransport from "../../utils/HTTPTransport/HTTPTransport";
import {profileData, passwordData} from "./types";

export default class AuthApi {
    private readonly _headers = {
        'content-type': 'application/json',
        'credentials': 'include',
        'mode': 'cors',
    }

    private UserApiInstance:HTTPTransport;

    constructor() {
        this.UserApiInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/");
    }

    
    profile(data: profileData) {
        return this.UserApiInstance.put('user/profile', {
            headers: this._headers,
            data: data 
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
    avatar(data: FormData) {
        return this.UserApiInstance.put('user/profile/avatar', {
            headers: {
                'credentials': 'include',
                'mode': 'cors',
            },
            formData: data 
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
    getAvatar(path:string){
        return this.UserApiInstance.get(`resources${path}`, {
            headers: this._headers,
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
    password(data: passwordData) {
        return this.UserApiInstance.put('user/password', {
            headers: this._headers,
            data: data 
        })
        .then((res:XMLHttpRequest) => {
            if (res.status === 200)  {
                return res
            }
            return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
        })
        
    }
}
