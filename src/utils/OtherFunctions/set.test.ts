import { expect } from 'chai';
import set from './set';

describe('set function', () => {
  let obj = {};
  const keypath = 'b';
  const value = 'b';

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by keypath', () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it("object it's not object", () => {
    const notObject = 'string';

    const result = set(notObject, keypath, value);

    expect(notObject).to.equal(result);
  });
  it("path it's not string", () => {
    const notStringPath = 10;

    // @ts-ignore
    const f = () => { set(obj, notStringPath, value); };

    expect(f).to.throw(Error);
  });

  it('should set a value by nested path', () => {
    const emptyObj = {};
    const nestedPath = 'b.c';
    const newValue = '2';

    const res = set(emptyObj, nestedPath, newValue);

    expect(res).to.deep.equal({ b: { c: newValue } });
  });
});
