/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export const enum METHODS {
    GET='GET',
    POST= 'POST',
    PUT='PUT',
    DELETE='DELETE',
  }

export type TOptions = {
    headers?:{[key:string]:any},
    method?: METHODS,
    data?: object,
    timeout?:number,
    formData?:FormData,
}
