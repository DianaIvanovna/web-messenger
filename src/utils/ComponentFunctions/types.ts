/* eslint no-unused-vars: 0 */
export interface EventBusInterface {
  listeners: {
    [key:string]: Function[];
  };
  on(event:string, callback:()=>Function): void;
  off(event:string, callback:()=>Function): void;
  emit(event:string, args:any[]): void;
}

export type EventElement = {
  class?:string, 
  event:string,
  handler: Function
}
