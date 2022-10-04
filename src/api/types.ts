export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type MethodsObject  = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export type TOptions = {
    headers?:{[key:string]:any},
    method?: Methods,
    data?: object,
    timeout?:number,
    formData?:FormData,
}

export const METHODS:MethodsObject = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT', 
    DELETE: 'DELETE', 
};

