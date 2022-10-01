# CloudTalk

CloudTalk - проект с реализацией собственного веб-мессенджера.

## Технологический стек

- HTML, предпроцессор SCSS
- JavaScript
- Parcel - для автоматизации ручной сборки приложения.
- Netlify — сервис для разворачивания приложения в сети интернет. 

## Особенности проекта
- Реализация собственного простого шаблонизатора. подробнее в [шаблонизатор](src/utils/Templator/README.md)
- Реализация компонентного подхода на чистом JS. подробнее в [Block](src/utils/ComponentFunctions/README.md)
- Реализация Fetch на базе Promise и XHP в [FormValidation.ts](src/utils/FormValidation/FormValidation.ts)
- Валидация всех форм происходит в классе [FormValidation.ts](src/utils/FormValidation/FormValidation.ts)
- Реализация собственного Роутинга. Подробнее в [Описание работы Роутинга](src/utils/Router/README.md)
    "/" — страница входа (Если пользователь авторизован, автоматически перенаправляет на страницу чата)
    "/sign-up" — страница регистрации
    "/messenger" — страница чата и настроек пользователя (находятся на одной странице в разных разделах)
    "/500" - страница с ошибкой 500
    "*" - при неизвестном маршруте страница 404

    Если пользователь не авторизован, то вместо страницы "/messenger" показываю форму авторизации.
- Работа с Api реализована через классы api и их контроллеры. 
    - Авторизация:  [AuthApi.ts](src/api/AuthApi/AuthApi.ts) и  [AuthController.ts](src/controllers/AuthController.ts)
    - Работа с чатами:  [ChatApi.ts](src/api/ChatApi/ChatApi.ts) и  [ChatController.ts](src/controllers/ChatController.ts) 
    - Работа с данными пользователя:  [UserApi.ts](src/api/UserApi/UserApi.ts) и  [UserController.ts](src/controllers/UserController.ts) 
    - Работа с WebSocket для отправки сообщений:  [WebSocketService.ts](src/utils/WebSocketService/WebSocketService.ts) и  [MessageController.ts](src/controllers/MessageController.ts) 
    


## Планы на будущее
- доработать api чатов отправкой файлов
- добавить удаление чатов
- //https://ya-praktikum.tech/api/v2/chats вынеси в отдельную константу

## Инструкция как развернуть проект

- Клонируйте или скачайте репозиторий: https://github.com/DianaIvanovna/web-messenger
- Предварительно установите node.js
- Установите необходимые пакеты командой: npm i
- Запустите локальный сервер командой: npm run dev
- Запуск express по команде npm run start

## Дополнительно

- Дизайн доступен по ссылке в [фигме](https://www.figma.com/file/AcJiYk7XlOvnSpgjThv3DP/CloudTalk?node-id=13%3A30)
- Сервис можно посмотреть по ссылке в [Netlify](https://dianaivanovna-web-messenger.netlify.app/)
