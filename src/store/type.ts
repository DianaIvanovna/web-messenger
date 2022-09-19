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