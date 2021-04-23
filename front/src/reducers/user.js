import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: {
    avatar: '/static/images/avatars/avatar_6.png',
    email: 'pointree@gmail.com',
    name: 'Katarina Smith',
    telephone: '010-1111-1111',
    accumulate: 5
  }
});
export const loginState = atom({
  key: 'loginState',
  default: { loginError: false, loginLoading: false, loginDone: false }
});
export const logOutState = atom({
  key: 'logOutState',
  default: { logOutError: false, logOutLoading: false, logOutDone: false }
});
