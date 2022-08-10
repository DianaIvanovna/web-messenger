/* eslint no-unused-vars: "off" */
import Block from '../../../../utils/ComponentFunctions/Block';
import DialogsItem from '../../../../components/DialogsItem/DialogsItem';
import { dialogs, dialogInterface } from '../../data';

const DialogsContainer = (openDialog:(item:dialogInterface)=>void) => {
  const dialogComponents:{
    [key:string]:DialogsItem
  } = {};

  let dialogTmp = '';
  dialogs?.forEach((item, index) => {
    dialogComponents[`dialogComponents-${index}`] = new DialogsItem('div', {
      ...item,
      lastMessange: item.messages?.[0],
      attr: { class: 'dialogs-item' },
      events: [
        {
          event: 'click',
          handler: (event:Event) => {
            event.preventDefault();
            event.stopPropagation();
            openDialog(dialogs?.[index]);
          },
        },
      ],
    });
  });

  // еще не сделала вывод в шаблон массива , поэтому строю шаблонную строку таким образом
  Object.entries(dialogComponents).forEach(([key]) => {
    dialogTmp = `${dialogTmp}  {{${key}}}`;
  });

  class DialogsContainerBlock extends Block {
    render() {
      return this.compile(dialogTmp);
    }
  }

  const dialogsContainerBlock = new DialogsContainerBlock('div', {
    ...dialogComponents,

  });

  return dialogsContainerBlock;
};

export default DialogsContainer;
