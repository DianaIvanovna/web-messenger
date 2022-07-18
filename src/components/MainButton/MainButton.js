// пробуем сделать шаблон для кнопки

import { getTemplate } from '../../utils/Templator';
import './MainButton.scss';

const MainButton = (props) => {
  console.log('props', props);
  const context = {
    nameButton: props.nameButton,
    handlerButton: props.handlerButton,
    buttonClass: 'button',
  };
  const template = `<button class={{buttonClass}} onClick={{handlerButton}}>{{nameButton}}</button>`;

  return getTemplate(template, context);
};

export default MainButton;
