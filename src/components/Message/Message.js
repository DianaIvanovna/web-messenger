/* eslint no-param-reassign: "off" */
import './Message.scss';
import Block from '../../utils/ComponentFunctions/Block';

class Message extends Block {
  render() {
    return this.compile(`
       <p class="message__text" >
          {{text}}
          <time class="message__data" >{{data}}</time>
        </p>
    `);
  }
}

export default Message;

// import { getTemplate } from '../../utils/Templator';
// import classes from './Message.module.scss';

// const message = (props) => {
//   const returnClass = (props) => `${classes.message}  ${props.myMes ? classes['message--my'] : ''}  ${
//     props.flagRead ? classes['message--read'] : ''
//   } ${props.flagSend ? classes['message--send'] : ''}`;

//   const context = {
//     text: props.text,
//     data: props.data,
//     classes,
//     classMes: returnClass(props),
//   };
//   const template = `
//    <div class="{{classMes}}">
//     <p class="{{classes.message__text}}" >
//       {{text}}
//       <span class="{{classes.message__data}}" >{{data}}</span>
//     <p/>
//    </div>

//   `;

//   return getTemplate(template, context);
// };

// export default message;
