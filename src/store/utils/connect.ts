
import Block from "../../utils/ComponentFunctions/Block";
import {StoreEvents, Store} from "../Store";
import isEqual from "../../utils/OtherFunctions/isEqual";

type Indexed<T = any> = {
    [key in string]: T;
};

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed , flag?:boolean){
    return class extends Component {
      constructor(tag: string, args:Indexed) {
          let state = JSON.parse(JSON.stringify(mapStateToProps(Store.getState())))
          super(tag, {...args, ...mapStateToProps(Store.getState())});
         
   
          Store.on(StoreEvents.Updated, () => {
              const newState =JSON.parse(JSON.stringify(mapStateToProps(Store.getState())))
              if (flag) {
                console.log("========");
                console.log("state", state);
                console.log("newState", newState); 
              }
  
              if (!isEqual(state, newState)) {
                  this.setProps({...newState});
              }
              state = newState;
          });
      }
    } 
 
}
