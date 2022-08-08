/* eslint no-param-reassign: "off" */
import classes from './SendMessange.module.scss';
import FormContainer from '../FormContainer/FormContainer';
import clip from '../../../static/img/icons/clip.png';
import sendMessangeIcon from '../../../static/img/icons/send-messange.png';
import Button from '../Button/Button';

class SendMessange extends FormContainer {
  constructor(tag, props) {
    const formId = 'sendMessange';

    props.classes = classes;
    props.clip = clip;
    props.sendMessangeIcon = sendMessangeIcon;
    props.formId = formId;
    props.button = new Button('div', {
      form: formId,
      text: `<img src=${sendMessangeIcon}  />`,
      class: classes['send-messange__img'],
      attr: { class: 'login-form__button-container' },
    });
    props.sendForm = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { elements } = document.querySelector(`.${classes['send-messange']}`);

      Array.from(elements)
        .filter((item) => !!item.name)
        .forEach((element) => {
          const { name, value } = element;
          console.log({ name, value });
        });
    };

    super(tag, props);
  }

  render() {
    return this.compile(`
       <form class={{classes.send-messange}} id="{{formId}}" >
        <button class={{classes.send-messange__img}}><img src={{clip}} /></button>
        <input class={{classes.send-messange__input}} placeholder="Сообщение" type="text" id="messange" name="messange" required >
        <p class="error error-messange"></p>
        {{button}}
        
       </form>
    `);
  }
}
export default SendMessange;
