
import Block from "../../utils/ComponentFunctions/Block";
import Store, {StoreEvents} from "../Store";
import isEqual from "../../utils/OtherFunctions/isEqual";

type Indexed<T = any> = {
    [key in string]: T;
};

export function connect2(mapStateToProps: (state: any) => any) {
  return function  wrap(Component: typeof Block) {
    let previousState: any;

    return class extends Component {
      constructor(tag: string, args:Indexed) {
          previousState  = mapStateToProps(Store.getState());
          super(tag, {...args, ...previousState });
        
  
          Store.on(StoreEvents.Updated, () => {
              const stateProps = mapStateToProps(Store.getState());
              // if (flag) {
              //   console.log("========");
              //   console.log("state", previousState );
              //   console.log("newState", stateProps);
              //   console.log("!isEqual(state, newState)", !isEqual(previousState , stateProps))
              // }

              
              if (!isEqual(previousState , stateProps)) {
                  this.setProps({...stateProps});
              }
              previousState  = stateProps;
          });
      }
    } 
  }

// return class extends Component {
//   constructor(tag: string, args:Indexed) {
//       let previousState  = mapStateToProps(Store.getState());
//       super(tag, {...args, ...previousState });
     

//       Store.on(StoreEvents.Updated, () => {
//           const stateProps = mapStateToProps(Store.getState());
//           if (flag) {
//             console.log("========");
//             console.log("state", previousState );
//             console.log("newState", stateProps);
//             console.log("!isEqual(state, newState)", !isEqual(previousState , stateProps))
//           }

          
//           if (!isEqual(previousState , stateProps)) {
//               this.setProps({...stateProps});
//           }
//           previousState  = stateProps;
//       });
//   }
// } 
}


export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed , flag?:boolean){
    return class extends Component {
      constructor(tag: string, args:Indexed) {
          //let state = {...mapStateToProps(Store.getState())} ;
          let state = JSON.parse(JSON.stringify(mapStateToProps(Store.getState())))
          super(tag, {...args, ...mapStateToProps(Store.getState())});
         
   
          Store.on(StoreEvents.Updated, () => {
              //const newState = {...mapStateToProps(Store.getState())};
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
