import { expect } from "chai";
import Sinon from "sinon";
import Router from "./Router";

describe("Router",()=>{

    global.window.history.back = () => {
        if ( typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget:window} as unknown as PopStateEvent)
        }
        fakeBack()
    }
    global.window.history.forward = () => {
        if ( typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget:window} as unknown as PopStateEvent)
        }
        fakeForward()
    }
    global.window.history.pushState = () => {
        if ( typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget:window} as unknown as PopStateEvent)
        }
        fakePushState()
    }

    const fakeBack = Sinon.fake.returns(true);
    const fakeForward = Sinon.fake.returns(true);
    const fakePushState = Sinon.fake.returns(true);

    const BlockMock = class {}
    const router = new Router(".root");
        
        

    it('Router.use return this',()=>{
        const res = router.use("/", BlockMock)
        expect(res).to.eq(router)
    })
    it('Router.go call history.pushState',()=>{
        router.start();
        router.go("/12");

        expect(fakePushState.callCount).to.eq(1)
    })
    it('Router.back call history.back',()=>{
        router.back();

        expect(fakeBack.callCount).to.eq(1)
    })

    it('Router.forward call history.forward',()=>{
        router.forward();

        expect(fakeForward.callCount).to.eq(1)
    })

})
