import { expect } from 'chai';
import { getTemplate } from './Templator';

describe('Templator', () => {
  it('should return string with variable substitution', () => {
    const tmp = '<div>{{test}}</div>';
    const ctx = {
      test: 'diana',
    };
    const expectedResult = '<div>diana</div>';

    const res = getTemplate(tmp, ctx);

    expect(res).to.eq(expectedResult);
  });

  it('should return string with nested object substitution', () => {
    const tmp = '<div>{{data.name}}</div>';
    const ctx = {
      data: {
        name: 'diana',
      },
    };
    const expectedResult = '<div>diana</div>';

    const res = getTemplate(tmp, ctx);

    expect(res).to.eq(expectedResult);
  });
  it('should return a string with an undefined if there is no variable', () => {
    const tmp = '<div>{{data.test}}</div>';
    const ctx = {
      data: {
        name: 'diana',
      },
    };
    const expectedResult = '<div>undefined</div>';

    const res = getTemplate(tmp, ctx);

    expect(res).to.eq(expectedResult);
  });

  it('should protect against XSL if sanitize is enabled', () => {
    const tmp = '<div>{{data.test}}</div>';
    const ctx = {
      data: {
        name: "'<script>alert('XSS')</script>'",
      },
    };
    const sanitize = true;
    const expectedResult = '<div>undefined</div>';

    const res = getTemplate(tmp, ctx, sanitize);

    expect(res).to.eq(expectedResult);
  });
});
