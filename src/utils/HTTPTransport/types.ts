/* eslint no-unused-vars: 0 */
export interface HTTPTransportInterface {
  get (url:string, options?:object): Promise<unknown>;

  post (url:string, options?:object): Promise<unknown>;

  put (url:string, options?:object): Promise<unknown>;

  delete (url:string, options?:object): Promise<unknown>;

  request (url:string, options?:{
    headers?:{[key:string]:any},
    method: string,
    data?: FormData,
    timeout?:number
  }): Promise<unknown>;
}
