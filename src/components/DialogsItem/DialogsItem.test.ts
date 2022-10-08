import DialogsItem from "./DialogsItem";

describe('DialogsItem',()=>{
    it("should render",()=>{
        const chat = {
            id: 1176,
            photo: "/",
            first_name:"",
            link: "",
            unreadMessage: 0,
            messages: [],
            attr: {class: 'dialogs-item' },

        }
        
        new DialogsItem('div', {...chat});
    })
})
