import { getTemplate } from '../../utils/Templator';
import classes from './Message.module.scss';

const message = (props) => {
  const returnClass = (props) => {
    return `${classes.message}  ${props.myMes ? classes['message--my'] : ''}  ${
      props.flagRead ? classes['message--read'] : ''
    } ${props.flagSend ? classes['message--send'] : ''}`;
  };

  const context = {
    text: props.text,
    data: props.data,
    classes,
    classMes: returnClass(props),
  };
  const template = `
   <div class="{{classMes}}">
    <p class="{{classes.message__text}}" >
      {{text}}
      <span class="{{classes.message__data}}" >{{data}}</span>
    <p/>
   </div>

  `;

  return getTemplate(template, context);
};

export default message;
