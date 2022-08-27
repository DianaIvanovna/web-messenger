import Block from '../../../../utils/ComponentFunctions/Block';
type PlainObject = { [key: string]: any }

export default class ChatMainBlock extends Block {
  setProps = (nextProps:PlainObject) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps = { ...this._props };

    // activeChat - переменная с чатом, который нужно открыть в chatContainer
    // если она изменилась, передаю пропсом в chatContainer
    if ('activeChat' in nextProps && this._children.chatContainer) {
      this._children.chatContainer.setProps({
        activeChat: nextProps.activeChat,
      });
    }

    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }
    if (Object.values(props).length) {
      Object.assign(this._props, nextProps);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
      this._setUpdate = false;
    }
  };

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
