import './PopupError.scss';
import Block from '../../utils/ComponentFunctions/Block';
import { Store } from '../../store/Store';

type PlainObject = { [key: string]: any }

class PopupError extends Block {
  middlewareProps(nextProps:PlainObject):PlainObject {
    if ('error' in nextProps) {
      if (nextProps.error) {
        this.show();

        const errorHandler = () => {
          Store.set('error', null);
          this.hide();
          clearInterval(timerId);
        };

        const timerId = setTimeout(errorHandler, 3000);
      } else {
        this.hide();
      }
    }

    return nextProps;
  }

  render() {
    return this.compile(`
        <p class="popup-error__text">{{error}}</p>
        `);
  }
}

export default PopupError;
