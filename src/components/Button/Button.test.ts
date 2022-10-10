import Button from './Button';

describe('Button', () => {
  it('should render', () => {
    // eslint-disable-next-line no-new
    new Button('div', {
      text: 'Загрузить еще', class: 'button', type: 'submit', form: 'form', disabled: true,
    });
  });
});
