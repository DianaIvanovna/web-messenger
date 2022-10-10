import HTTPTransport from '../../utils/HTTPTransport/HTTPTransport';
import { SignupData, SigninData } from './types';
import { TOptions, METHODS } from '../types';
import { UserData } from '../../store/type';

export class AuthApi {
  private readonly _defaultHeaders = {
    'content-type': 'application/json',
    credentials: 'include',
    mode: 'cors',
  };

  private _authInstance:HTTPTransport;

  constructor() {
    this._authInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
  }

  request(path:string, options:TOptions = {}) {
    const newOptions = { ...options };

    if (!newOptions.headers) {
      newOptions.headers = this._defaultHeaders;
    }

    return this._authInstance.request(path, newOptions)
      .then((res:XMLHttpRequest) => {
        if (res.status === 200) return res;

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          status: res.status,
          text: res.response,
        });
      })
      .then((data) => {
        if (data.response === 'OK') {
          return null;
        }
        return JSON.parse(data.response);
      });
  }

  auth(): Promise<UserData> {
    return this.request('/user', {
      method: METHODS.GET,
    });
  }

  signup(data: SignupData): Promise<null> {
    return this.request('/signup', {
      method: METHODS.POST,
      data,
    });
  }

  signin(data: SigninData): Promise<null> {
    return this.request('/signin', {
      method: METHODS.POST,
      data,
    });
  }

  logout(): Promise<null> {
    return this.request('/logout', {
      method: METHODS.POST,
    });
  }
}
