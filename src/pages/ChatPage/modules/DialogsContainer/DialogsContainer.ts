/* eslint no-unused-vars: "off" */
import Block, {PlainObject} from '../../../../utils/ComponentFunctions/Block';
import DialogsItem from '../../../../components/DialogsItem/DialogsItem';
import Store, {StoreEvents, Indexed} from '../../../../store/Store';
import { connect } from '../../../../store/utils/connect';
import ChatController from '../../../../controllers/ChatController';

import {dialogInterface} from "../../../../store/type";

const DialogsHandler = (dialogs:dialogInterface[]) => {
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
            ChatController.openDialog(dialogs?.[index]);
          },
        },
      ],
    });
  });

  Object.entries(dialogComponents).forEach(([key]) => {
    dialogTmp = `${dialogTmp}  {{${key}}}`;
  });

  return {
    dialogComponents,
    dialogTmp,
  }
}

const DialogsContainer = () => {
  function mapUserToProps(state:Indexed):Indexed {
    return {
      dialogs: state.dialogs,
    }; 
  }

  class DialogsContainerBlock extends Block {

    constructor(tagName:string = 'div', props:Record<string, any> = {}) {
      let newProps = {...props};

      if ('dialogs' in props) {
        const {dialogComponents,dialogTmp} = DialogsHandler(props.dialogs )
        newProps= { ...newProps, ...dialogComponents, dialogTmp}
      }

      super(tagName, newProps);

    }

    setProps(newProps:PlainObject) {
      if (!newProps) {
        return;
      }
      let nextProps = { ...newProps };
      this._setUpdate = false;
      const oldProps = { ...this._props };

      if ('dialogs' in nextProps) {
        const {dialogComponents,dialogTmp} = DialogsHandler(nextProps.dialogs )
        nextProps= { ...nextProps, ...dialogComponents, dialogTmp}
      }
      const { children, props } = this._getChildren(nextProps);
  
      if (Object.values(children).length) {
        Object.assign(this._children, children);
      }
      if (Object.values(props).length) {
        Object.assign(this._props, nextProps);
      }
  
      if (this._setUpdate) {
        this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
        this._setUpdate = false;
      }
    }

    render() {
      return this.compile(this._props.dialogTmp);
    }
  }

  const DialogsContainerBlockConnectedToStore = connect(DialogsContainerBlock,mapUserToProps )


  const dialogsContainerBlock = new DialogsContainerBlockConnectedToStore('div');


  return dialogsContainerBlock;
};

export default DialogsContainer;
