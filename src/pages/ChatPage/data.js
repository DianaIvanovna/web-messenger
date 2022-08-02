// временный файл с тем, как предположительно будут приходить данные с бекенда
import photo1 from '../../../static/img/avatars/avatar1.png';
import photo2 from '../../../static/img/avatars/avatar3.png';
import photo3 from '../../../static/img/avatars/photo.jpg';

export const dialogs = [
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
        flagRead: 0,
        flagSend: 1,
        myMes: 1,
      },
      {
        text: `Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        data: '10:10',
        flagRead: 1,
        flagSend: 1,
        myMes: 0,
      },
      {
        text: 'здравствуй))',
        data: '10:05',
        flagRead: 1,
        flagSend: 1,
        myMes: 1,
      },
      {
        text: 'привет!',
        data: '10:00',
        flagRead: 1,
        flagSend: 1,
        myMes: 0,
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
        flagRead: 1,
        flagSend: 1,
        myMes: 1,
      },
      {
        text: 'привет!',
        data: '10:00',
        flagRead: 1,
        flagSend: 1,
        myMes: 0,
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
        flagRead: 1,
        flagSend: 1,
        myMes: 1,
      },
      {
        text: 'бла бла бла',
        data: '10:00',
        flagRead: 1,
        flagSend: 1,
        myMes: 0,
      },
    ],
  },
];
