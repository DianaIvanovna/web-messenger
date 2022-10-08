import { expect } from "chai";
import merge from "./merge";

describe('merge function', ()=>{ 
    
    it("merge two objects", ()=>{

        const obj1 = {a: {b: {a: 2}}, d: 5};
        const obj2 = {a: {b: {c: 1}}, e:2};
        const objRes = {a: {b: {a: 2,c: 1,}},d: 5,e:2};

        const res = merge(obj1, obj2)
       
   
        expect(res).to.deep.equal(objRes)
    })

    it("merge two emply objects", ()=>{

        const obj1 = {};
        const obj2 = {};
        const objRes = {};

        const res = merge(obj1, obj2)
       
   
        expect(res).to.deep.equal(objRes)
    })

})
