import classes from './SendMessange.module.scss';
import FormValidation from '../../utils/FormValidation/FormValidation';
import clip from '../../../static/img/icons/clip.png';
import sendMessangeIcon from '../../../static/img/icons/send-messange.png';
import Button from '../Button/Button';

class SendMessange extends FormValidation {
  constructor(tag:string, props:Record<string, any>) {
    const formId = 'sendMessange';
    const newProps = { ...props };

    newProps.classes = classes;
    newProps.clip = clip;
    newProps.sendMessangeIcon = sendMessangeIcon;
    newProps.formId = formId;
    newProps.button = new Button('div', {
      form: formId,
      text: `<img src=${sendMessangeIcon}  />`,
      class: classes['send-messange__img'],
      attr: { class: classes['send-messange__img'] },
    });
    newProps.sendForm = (event:Event) => {
      event.preventDefault();
      event.stopPropagation();
      // const { elements } = document.querySelector(`.${classes['send-messange']}`);
      const form :HTMLFormElement|null = document.querySelector(`.${classes['send-messange']}`);

      if (form) {
        Array.from(form.elements)
          .filter((item) => item.tagName === 'INPUT')
          .forEach((element: HTMLInputElement) => {
            const { value, name } = element;
            console.log({ name, value });
          });
      }
    };

    super(tag, newProps);
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
