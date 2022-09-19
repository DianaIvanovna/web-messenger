
import Block from "../../utils/ComponentFunctions/Block";
import Store, {StoreEvents} from "../Store";
import isEqual from "../../utils/OtherFunctions/isEqual";

type Indexed<T = any> = {
    [key in string]: T;
};

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed , flag?:boolean): typeof Block {
  return class extends Component {
    constructor(tag: string, args:Indexed) {
      // console.log("args", args)
      // console.log("tag", tag, "args", {...args, ...mapStateToProps(Store.getState())})
      let state = mapStateToProps(Store.getState());
        super(tag, {...args, ...mapStateToProps(Store.getState())});
       
 
        Store.on(StoreEvents.Updated, () => {
            const newState = mapStateToProps(Store.getState());
            // console.log("========");
            // console.log("state", state);
            // console.log("newState", newState);
            if (flag) {
              console.log("========");
            console.log("state", state);
            console.log("newState", newState);
            }

            if (!isEqual(state, newState)) {
                //console.log("testText", Store.getState())
                this.setProps({...newState});
            }
            state = newState;
        });
    }
  } 
}
