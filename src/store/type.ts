export interface dialogInterface {
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

export type messageType = {
  chat_id: number,
  content: string,
  file: null,
  id: number,
  is_read: boolean,
  time: string,
  type: "message"
  user_id: number,
}
export type lastMessageType = {
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

export type chatType = {
  avatar: null|string,
  created_by: number,
  id: number,
  last_message: lastMessageType,
  messages?:messageType[] | null,
  title: string,
  unread_count: number,
  userConnect?: boolean,
}