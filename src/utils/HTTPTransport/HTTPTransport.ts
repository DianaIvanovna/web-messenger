import { HTTPTransportInterface } from './types';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport implements HTTPTransportInterface {
  get = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  post = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url, options) => {
    const {
      headers = {}, method, data, timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
