import type BlockType from './Block'
import Sinon from "sinon";
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const eventBusMock = {
    on: Sinon.fake(),
    emit: Sinon.fake(),
  }

const { default: Block } = proxyquire('./Block', {
    './EventBus': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
          }
    }
    }
) as { default: typeof BlockType };


describe("Block",()=>{
    class ComponentMock extends Block {

        render() {
            return this.compile(`
                <div>test</div>
             `);
        }
    }

    it("should fire 'INIT' event on init", () => {
       new ComponentMock();
        
       expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.INIT)).to.eq(true);
    })
    it("should fire 'FLOW_RENDER' event after init", () => {
        const block = new ComponentMock();
        block.init()
         
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_RENDER)).to.eq(true);
     })
    it("should fire 'FLOW_CDU' event after setProps", () => {
        const block = new ComponentMock();
        block.setProps({
            test: "test"
        })
         
        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.FLOW_CDU)).to.eq(true);
    })
})
