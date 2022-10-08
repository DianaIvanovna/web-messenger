import './CreateChatForm.scss';
import FormValidation from '../../../../utils/FormValidation/FormValidation';
import FieldInput from '../../../../components/FieldInput/FieldInput';
import Button from '../../../../components/Button/Button';
import {ChatController} from '../../../../controllers/ChatController';

class CreateChatForm extends FormValidation{

  constructor(tagName:string = 'div', propsAndChildren:Record<string, any> = {}) {
    const newProps = { ...propsAndChildren };
    newProps.formId = "createChat";
    super(tagName, newProps);

    const titleChatInput =  new FieldInput('div', {
      name: 'title',
      type: 'text',
      placeholder: "введите название чата", 
      title:"",
      'data-error': 'Это обязательное поле"',
      required: true,
    });
    const createChatBtn = new Button('div', {
        text: 'Создать чат',
        form: this._props.formId,
        class:" default-button create-chat-form__button",
        events: [
          {
            event: 'click',
            handler: this.sendForm.bind(this),
          },
        ],
    });
  
    this.setProps({
      titleChatInput,
      createChatBtn,
      sendForm: this.sendForm.bind(this),
    });


  }

  sendForm (event:Event)  {
    event.preventDefault();
    event.stopPropagation();
    
    const form: HTMLElement|null = document.getElementById(this._props.formId);
    
    if (form) {
      const title = form.querySelector('input[name="title"]') as HTMLInputElement;
      ChatController.createChat({
        title: title ? title.value : "",
      });
      this._props.closeForm()
    }
  };

  render() {
    return this.compile(`
        <h2 class="create-chat-form__title" >Создать новый чат</h2>
        <form  id={{formId}} class="create-chat-form"  >
          {{titleChatInput}}
          {{createChatBtn}}
        </form>
    `);
  }
}

export default CreateChatForm;