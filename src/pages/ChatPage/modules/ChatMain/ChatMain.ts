import Block from '../../../../utils/ComponentFunctions/Block';

export default class ChatMainBlock extends Block {
  get element() {
    return this._element;
  }

  render() {
    return this.compile(`
    <div class="chat__menu-container">
      <div class="{{menuStyle}}"> 
        <img
          class="chat__icon chat__icon--0"
          src="{{icon1}}"
          alt="настройки пользователя"
        />
        <img
          class="chat__icon chat__icon--1"
          src="{{icon2}}"
          alt="чаты"
        />
        <img
          class="chat__icon chat__icon--2"
          src="{{icon3}}"
          alt="контакты"
        />
        <img
          class="chat__icon chat__icon--3"
          src="{{icon4}}"
          alt="настройки"
        />
      </div>

      <div class="chat__main">
      {{userSetting}}
        {{dialogsContainer}}
        {{contactsContainer}}
        {{settingContainer}}
      </div>
      
    </div>
    {{chatContainer}}
    `);
  }
}
