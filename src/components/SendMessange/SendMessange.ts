import classes from './SendMessange.module.scss';
import FormValidation from '../../utils/FormValidation/FormValidation';
import clip from '../../../static/img/icons/clip.png';
import addUser from "../../../static/img/icons/addUser.png";
import sendMessangeIcon from '../../../static/img/icons/send-messange.png';
import Button from '../Button/Button';

class SendMessange extends FormValidation {
  constructor(tag:string, props:Record<string, any>) {
    const formId = 'sendMessange';
    const newProps = { ...props };

    newProps.classes = classes;
    newProps.clip = clip;
    newProps.addUser = addUser;
    newProps.sendMessangeIcon = sendMessangeIcon;
    newProps.formId = formId;
    newProps.events= [
      {
        event: 'click',
        class: '.send-messange__img--add-user',
        handler: newProps.openPopupAddUsers
      }
    ]
    

    super(tag, newProps); 
    const button = new Button('div', {
      form: formId,
      text: `<img src=${sendMessangeIcon}  />`,  
      class: classes['send-messange__button'],
      attr: { class: classes['send-messange__button'] },
    });
    

    this.setProps({
      button,
      sendForm: this.sendForm.bind(this),
  })
  }

  sendForm (event:Event) {
    event.preventDefault();
    event.stopPropagation(); 
    const form :HTMLFormElement|null = document.querySelector(`.${classes['send-messange']}`);
    if (form) { 
      const input = form.querySelector('input[name="messange"]') as HTMLInputElement;
    
      this._props.sendMessange(input.value);
      form.reset();
    } 
  }

  render() {
    return this.compile(`
       <form class={{classes.send-messange}} id="{{formId}}" >
        <div class={{classes.send-messange__button-container}}>
         
          <img src={{clip}} class={{classes.send-messange__img}} />
          <img src={{addUser}}  class="{{classes.send-messange__img}} send-messange__img--add-user " />
          
        </div>
        <input class={{classes.send-messange__input}} placeholder="Сообщение" type="text" id="messange" name="messange" required >
    
        <p class="error error-messange"></p>
        {{button}}
        
       </form>
    `);
  }
}

//<button class="{{classes.send-messange__img}} send-messange__img--add-user "></button>
export default SendMessange;
