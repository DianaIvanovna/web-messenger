import Avatar from "./Avatar";
import {UserController} from "../../controllers/UserController";
import Sinon from "sinon";
import { expect } from "chai";


describe("Avatar", ()=>{
    it("should render", ()=>{
        new Avatar('div',{});
    })
    it("should call fetch getAvatar", ()=>{
        const spy = Sinon.spy(UserController, 'getAvatar');
        const avatar = new Avatar('div',{});

        avatar.setProps({
            avatar: "/avatar.png"
        })
        
        expect(spy.calledOnce).to.eq(true)
    })
})
