import EventBus from "../utils/ComponentFunctions/EventBus";
import set from "../utils/OtherFunctions/set";

import photo1 from '../../static/img/avatars/avatar1.png';
import photo2 from '../../static/img/avatars/avatar3.png';
import photo3 from '../../static/img/avatars/photo.jpg';
export enum StoreEvents {
    Updated = 'updated',
}

export type Indexed<T = any> = {
    [key in string]: T;
};

class Store extends EventBus  {
    // constructor() {}

    private state: Indexed = {
        auth: {
          authCheck: false,
          isLogged: false,
        },


        testText: "testText!!!",
        test2 : "ddddddddddddd",
        error: null,

 
        user: null,
        dialogs: [{
          id: 1,
          photo: photo1,
          first_name: 'Милана',
          link: '/',
          unreadMessage: 2,
          messages: [
            {
              text: 'интересно..',
              data: '10:15',
              flagRead: false,
              flagSend: true,
              myMes: true,
            },
            {
              text: `Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
      
              Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
              data: '10:10',
              flagRead: true,
              flagSend: true,
              myMes: false,
            },
            {
              text: 'здравствуй))',
              data: '10:05',
              flagRead: true,
              flagSend: true,
              myMes: true,
            },
            {
              text: 'привет!',
              data: '10:00',
              flagRead: true,
              flagSend: true,
              myMes: false,
            },
          ],
        },
        {
          id: 3,
          photo: photo3,
          first_name: 'Очнь длинное имя, которое не помещается в контейнер',
          link: '/',
          unreadMessage: 0,
          messages: [
            {
              text: 'здравствуй))',
              data: '10:05',
              flagRead: true,
              flagSend: true,
              myMes: true,
            },
            {
              text: 'привет!',
              data: '10:00',
              flagRead: true,
              flagSend: true,
              myMes: false,
            },
          ],
        },
        {
          id: 2,
          photo: photo2,
          first_name: 'Леня',
          link: '/',
          unreadMessage: 79,
          messages: [
            {
              text: 'бла?',
              data: '10:05',
              flagRead: true,
              flagSend: true,
              myMes: true,
            },
            {
              text: 'бла бла бла',
              data: '10:00',
              flagRead: true,
              flagSend: true,
              myMes: false,
            },
          ],
        },], 
        activeChat : null,
    };
  
    public getState() {
      return this.state;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);
      this.emit(StoreEvents.Updated);
    };
} 

const store = new Store()

//TODO:удали потом

window.store = store;

export default store;