export interface DialogInterface {
    id: number;
    photo: string;
    first_name:string;
    link: string;
    unreadMessage: number;
    messages:
      {text: string,
      data: string,
      flagRead: boolean,
      flagSend: boolean,
      myMes: boolean,}[] ;
}

export type UserData = {
  id: number
  first_name:string,
  second_name:string,
  display_name: string,
  login:string,
  email:string,
  phone: string,
  avatar: string,
}

export type MessageType = {
  chat_id: number,
  content: string,
  file: null,
  id: number,
  is_read: boolean,
  time: string,
  type: "message"
  user_id: number,
}
export type LastMessageType = {
  content: string,
  id: number,
  time: string,
  user: {
    avatar: null|string,
    display_name: null|string,
    email: null|string,
    first_name: null|string,
    login: null|string,
    phone:null|string,
    second_name: null|string,
  }
}

export type ChatType = {
  avatar: null|string,
  created_by: number,
  id: number,
  last_message: LastMessageType,
  messages?:MessageType[] | null,
  title: string,
  unread_count: number,
  userConnect?: boolean,
}
