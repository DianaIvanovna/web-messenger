// временный файл с тем, как предположительно будут приходить данные с бекенда
import photo1 from '../../../static/img/avatars/avatar1.png';
import photo2 from '../../../static/img/avatars/avatar3.png';
import photo3 from '../../../static/img/avatars/photo.jpg';

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

export const dialogs: dialogInterface[] = [
  {
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
  },
];
