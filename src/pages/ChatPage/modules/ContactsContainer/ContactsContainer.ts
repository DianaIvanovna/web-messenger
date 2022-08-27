import Block from '../../../../utils/ComponentFunctions/Block';

const ContactsContainer = () => {
  class ContactsContainerBlock extends Block {
    render() {
      return this.compile(`
        разрабатывается..
      `);
    }
  }

  const contactsContainerBlock = new ContactsContainerBlock('div');

  return contactsContainerBlock;
};

export default ContactsContainer;
