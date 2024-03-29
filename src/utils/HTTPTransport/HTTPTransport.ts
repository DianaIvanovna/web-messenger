import { HTTPTransportInterface, TOptions,  MethodsObject } from './types';


const METHODS:MethodsObject = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE', 
};
const defaultOptions: TOptions = {
  headers: {},
  data: {},
  timeout: 5000,
  method: METHODS.GET
}



function queryStringify(data:{[key:string]:any}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key:string, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport implements HTTPTransportInterface {
  _host: string;

  constructor(host:string) {
    this._host = host;
  }

  get = (url:string, options:TOptions = {}) => {
    let newUrl = url;
    if (!!options?.data) {
      newUrl = `${newUrl}${queryStringify(options.data)}`;
    }

    return this.request(newUrl, { ...options, method: METHODS.GET });
  }

  post = (url:string, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url:string, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url:string, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url:string, options?:TOptions): Promise<unknown> => {
    if (!options) {
      options = defaultOptions
    }
    const {headers = null, data = null, timeout = 5000, method = METHODS.GET, formData = null} = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        this._host + url,
      );

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      
      }

      xhr.setRequestHeader("Content-Security-Policy", "default-src 'self';img-src *;script-src trusted.com;");

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (formData) {
        xhr.send(formData);
      }
      else {
        xhr.send(data?JSON.stringify(data):null);
      }
    });
  };
}
