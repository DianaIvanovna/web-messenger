// временный файл с тем, как предположительно будут приходить данные с бекенда
import phoro1 from '../../../static/img/avatars/avatar1.png';
import phoro2 from '../../../static/img/avatars/avatar3.png';
import phoro3 from '../../../static/img/avatars/photo.jpg';

export const dialogs = [
  {
    id: 1,
    photo: phoro1,
    first_name: 'Милана',
    link: '/',
    unreadMessage: 2,
  },
  {
    id: 3,
    photo: phoro3,
    first_name: 'Очнь длинное имя, которое не помещается в контейнер',
    link: '/',
    unreadMessage: 0,
  },
  {
    id: 2,
    photo: phoro2,
    first_name: 'Леня',
    link: '/',
    unreadMessage: 79,
  },
];
