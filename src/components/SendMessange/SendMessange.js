import { getTemplate } from '../../utils/Templator';
import classes from './SendMessange.module.scss';
import clip from '../../../static/img/icons/clip.png';
import sendMessangeIcon from '../../../static/img/icons/send-messange.png';

const SendMessange = () => {
  const context = {
    classes,
    clip,
    sendMessangeIcon,
  };
  const template = `
   <form class={{classes.send-messange}}>
    <button class={{classes.send-messange__img}}><img src={{clip}} /></button>
    <input class={{classes.send-messange__input}} placeholder="Сообщение" type="text" id="messange" name="messange" >
    <button class={{classes.send-messange__img}}><img src={{sendMessangeIcon}}  /></button>
   </form>

  `;

  return getTemplate(template, context);
};

export default SendMessange;
