import Button from "./Button"

describe("Button",()=>{

    it("should render",()=>{
        new Button('div', {text: `Загрузить еще`, class: "button", type: "submit", form:"form", disabled: true});
    })
})
