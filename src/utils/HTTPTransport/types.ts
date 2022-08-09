/* eslint no-unused-vars: 0 */
export interface HTTPTransportInterface {
  get (url:string, options?:object): Promise<unknown>;

  post (url:string, options?:object): Promise<unknown>;

  put (url:string, options?:object): Promise<unknown>;

  delete (url:string, options?:object): Promise<unknown>;

  request (url:string, options?:{
    headers?:object,
    method: string,
    data: unknown,
    timeout?:number
  }): Promise<unknown>;
}
