import Sinon from 'sinon';
import { expect } from 'chai';
import Avatar from './Avatar';
import { UserController } from '../../controllers/UserController';

describe('Avatar', () => {
  it('should render', () => {
    // eslint-disable-next-line no-new
    new Avatar('div', {});
  });
  it('should call fetch getAvatar', () => {
    const spy = Sinon.spy(UserController, 'getAvatar');
    const avatar = new Avatar('div', {});

    avatar.setProps({
      avatar: '/avatar.png',
    });

    expect(spy.calledOnce).to.eq(true);
  });
});
