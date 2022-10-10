import Block from '../../utils/ComponentFunctions/Block';
import './ErrorPage.scss';

class ErrorPage extends Block {
  render() {
    return this.compile(`
      <h1 class="error-page__title">{{code}}</h1>
        <p class="error-page__description">Oooops! Страница не найдена</p>
      `);
  }
}

const ErrorPage404 = new ErrorPage('div', { attr: { class: 'error-page' }, code: '404', title: 'Oooops! Страница не найдена' });
const ErrorPage500 = new ErrorPage('div', { attr: { class: 'error-page' }, code: '500', title: 'Мы уже фиксим' });

export { ErrorPage404, ErrorPage500 };
