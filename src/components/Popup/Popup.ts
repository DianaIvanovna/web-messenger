import './Popup.scss';
import Block from '../../utils/ComponentFunctions/Block';

class Popup extends Block{

  constructor(tag:string, props:Record<string, any>) {
    const newProps = { ...props };
    
    newProps.events = newProps.events? [...newProps.events, 
      {
        class: '.popup__close',
        event: 'click',
        handler: () => {
          this.closeForm();
        },
      }
    ]: [
      {
        class: '.popup__close',
        event: 'click',
        handler: () => {
          this.closeForm();
        },
      }
    ]

    super(tag, newProps);
    if (newProps.children) {
      newProps.children.setProps({
        closeForm: this.closeForm.bind(this)
      })
    }
  }

  closeForm() {
    this.hide()
  }

  render() {
    return this.compile(`
    <div class="popup">
    <div class="popup__back"></div>
    <div class="popup__container" >
      <div class="popup__content">
        <svg class="popup__close" width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="30" height="30" rx="15" fill="#F7F9FA"/>
            <path d="M11.4984 11.422C11.8934 11.036 12.5338 11.036 12.9287 11.422L19.3004 17.6489C19.6954 18.0349 19.6954 18.6608 19.3004 19.0468L18.5016 19.8274C18.1066 20.2134 17.4662 20.2134 17.0713 19.8274L10.6996 13.6005C10.3046 13.2145 10.3046 12.5887 10.6996 12.2027L11.4984 11.422Z" fill="#BCD2D6"/>
            <path d="M10.6996 19.0468C10.3046 18.6608 10.3046 18.0349 10.6996 17.6489L17.0713 11.422C17.4662 11.036 18.1066 11.036 18.5016 11.422L19.3004 12.2027C19.6954 12.5887 19.6954 13.2145 19.3004 13.6005L12.9287 19.8274C12.5338 20.2134 11.8934 20.2134 11.4984 19.8274L10.6996 19.0468Z" fill="#BCD2D6"/>
        </svg>
      
        {{children}}
      </div>
    </div>
  </div>
    `);
  }
}

export default Popup;