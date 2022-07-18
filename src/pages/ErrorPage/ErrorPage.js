import { getTemplate } from '../../utils/Templator';
import classes from './ErrorPage.module.scss';

const ErrorPage = (props) => {
  const context = {
    title: props.title,
    description: props.description,
    classes: classes,
  };

  const template = `<div class={{classes.error-page}} >
  <h1  class={{classes.error-page__title}} >{{title}}
  </h1>
  <p  class={{classes.error-page__description}}    >{{description}}</p>
</div>`;

  return getTemplate(template, context);
};

export default ErrorPage;
