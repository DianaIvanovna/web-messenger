# CloudTalk

CloudTalk - проект с реализацией собственного веб-мессенджера.

## Технологический стек

- HTML, предпроцессор SCSS
- JavaScript
- Parcel - для автоматизации ручной сборки приложения.
- Netlify — сервис для разворачивания приложения в сети интернет.

## Особенности проекта
Реализация собственного простого шаблонизатора. подробнее в [шаблонизатор](src/utils/Templator/README.md)
Реализация компонентного подхода на чистом JS. подробнее в [Block](src/utils/ ComponentFunctions /README.md)
Реализация Fetch на базе Promise и XHP в [FormValidation.ts](src/utils/ FormValidation/ FormValidation.ts)
Валидация всех форм происходит в классе [FormValidation](src/utils/ FormValidation / FormValidation.ts)

## Инструкция как развернуть проект

- Клонируйте или скачайте репозиторий: https://github.com/DianaIvanovna/web-messenger
- Предварительно установите node.js
- Установите необходимые пакеты командой: npm i
- Запустите локальный сервер командой: npm run dev
- Запуск express по команде npm run start

## Дополнительно

- Дизайн доступен по ссылке в [фигме](https://www.figma.com/file/AcJiYk7XlOvnSpgjThv3DP/CloudTalk?node-id=13%3A30)
- Сервис можно посмотреть по ссылке в [Netlify](https://dianaivanovna-web-messenger.netlify.app/)
