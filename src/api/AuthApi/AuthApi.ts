import HTTPTransport from "../../utils/HTTPTransport/HTTPTransport";
import {signupData, signinData} from "./types";

export default class AuthApi {
    private readonly _headers = {
        'content-type': 'application/json',
        'credentials': 'include',
        'mode': 'cors',
    }

    private AuthApiInstance:HTTPTransport;

    constructor() {
        this.AuthApiInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");
    }
    auth() {
        return this.AuthApiInstance.get('/user', {
            headers: this._headers,
        })
        .then((res:XMLHttpRequest) => {
            if (res.status === 200) return res;

            return Promise.reject({
                status: res.status,
                response: JSON.parse(res.response)
            }); 
        }) 
        .then(data => {
            return JSON.parse(data.response)
        })
    }
    signup(data: signupData) {
        return this.AuthApiInstance.post('/signup', {
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
            return data.response
        })
    }
    signin(data: signinData) {
        return this.AuthApiInstance.post('/signin', {
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
            return data.response
        })
    }

    logout() {
        return this.AuthApiInstance.post('/logout', {
            headers: this._headers,
        })
        .then((res:XMLHttpRequest) => {
            if (res.status === 200)  {
                return res
            }
            return Promise.reject({status: res.status, text: JSON.parse(res.response).reason});
        })
        .then(data => {
            return data.response
        })
    }
}
