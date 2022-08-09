import './Button.scss';
import Block from '../../utils/ComponentFunctions/Block';

class Button extends Block {
  constructor(tag: string, props) {
    /* eslint no-param-reassign: "off" */
    props.class = props.class
      ? `button ${props.class}`
      : 'button default-button';
    props.type = props.type ? `type= ${props.type}` : '';
    props.form = props.form ? `form= ${props.form}` : '';
    props.disabled = props.disabled ? `disabled= ${props.disabled}` : '';

    super(tag, props);
  }

  render() {
    return this.compile(`
    <button class="{{class}}"   {{type}} {{form}} {{disabled}} >
      {{text}}
    </button> 
    `);
  }
}

export default Button;
