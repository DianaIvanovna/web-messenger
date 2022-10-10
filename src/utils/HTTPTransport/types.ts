/* eslint no-unused-vars: 0 */
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type MethodsObject = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}
export type TOptions = {
  headers?:{[key:string]:any},
  method?: Methods,
  data?: object,
  timeout?:number
  formData?:FormData,
}

export interface HTTPTransportInterface {
  get (url:string, options?:object): Promise<unknown>;

  post (url:string, options?:object): Promise<unknown>;

  put (url:string, options?:object): Promise<unknown>;

  delete (url:string, options?:object): Promise<unknown>;

  request (url:string, options?:TOptions): Promise<unknown>;
}
