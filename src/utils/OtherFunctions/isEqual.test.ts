/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import isEqual from './isEqual';

describe('isEqual function', () => {
  it('objects are not equal', () => {
    const obj1 = { a: { b: { a: 2 } }, d: 5 };
    const obj2 = { a: { b: { c: 1 } } };

    const res = isEqual(obj1, obj2);

    expect(res).to.be.false;
  });

  it('nested objects are not equal', () => {
    const obj1 = { a: { b: { a: 2 } } };
    const obj2 = { a: { b: { a: 1 } } };

    const res = isEqual(obj1, obj2);

    expect(res).to.be.false;
  });

  it('nested objects are equal', () => {
    const obj1 = { a: { b: { a: 2 } } };
    const obj2 = { a: { b: { a: 2 } } };

    const res = isEqual(obj1, obj2);

    expect(res).to.be.true;
  });
});
