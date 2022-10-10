import './Popup.scss';
import Block from '../../utils/ComponentFunctions/Block';
import { EventElement } from '../../utils/ComponentFunctions/types';
import { SVG } from '../SVG/SVG';

type PopupProps = {
  attr?:object,
  events?: EventElement[],
  children: any,
  svg?: Block
}

class Popup extends Block {
  constructor(tag:string, props:PopupProps) {
    const newProps = { ...props };

    newProps.events = newProps.events ? [...newProps.events,
      {
        class: '.popup__close',
        event: 'click',
        handler: () => {
          this.closeForm();
        },
      },
    ] : [
      {
        class: '.popup__close',
        event: 'click',
        handler: () => {
          this.closeForm();
        },
      },
    ];

    newProps.svg = new SVG('div', { id: 'close' });

    super(tag, newProps);
    if (newProps.children) {
      newProps.children.setProps({
        closeForm: this.closeForm.bind(this),
      });
    }
  }

  closeForm() {
    this.hide();
  }

  render() {
    return this.compile(`
    <div class="popup">
    <div class="popup__back"></div>
    <div class="popup__container" >
      <div class="popup__content"> 
        {{svg}}
        {{children}}
      </div>
    </div>
  </div>
    `);
  }
}

export default Popup;
