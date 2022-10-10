import Sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });
  it('.post() should send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });
  it('.put() should send PUT request', () => {
    instance.put('/user');

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });
  it('.delete() should send DELETE request', () => {
    instance.delete('/user');

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
  it('.get() should data queryStringify', () => {
    instance.get('/user', {
      data: {
        a: 'test',
      },
    });

    const [request] = requests;

    expect(request.url).to.eq('/user?a=test');
  });
  it('should add headers', () => {
    instance.get('/user', {
      headers: {
        credentials: 'include',
      },
    });

    const [request] = requests;

    expect(request.requestHeaders).to.have.property('credentials', 'include');
  });
});
