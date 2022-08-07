import renderDOM from '../../utils/ComponentFunctions/renderDom';
import LoginForm from './modules/LoginForm';
import RegForm from './modules/RegForm';

const loginAndSigninPage = () => {
  // TODO: скрывать блоки, а не заново рендер делать
  const renderForm = (form) => {
    document.querySelector('.root').innerHTML = '';
    if (form === 'loginForm') {
      renderDOM('.root', loginForm);
    } else {
      renderDOM('.root', regForm);
    }
  };

  const loginForm = LoginForm(() => {
    renderForm('regForm');
  });
  const regForm = RegForm(() => {
    renderForm('loginForm');
  });

  renderForm('loginForm');
};

export default loginAndSigninPage();
