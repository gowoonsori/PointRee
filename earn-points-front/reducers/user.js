import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: null,
});

export const loginState = atom({
  key: 'loginState',
  default: {
    loginError: false,
    loginLoading: false,
    loginDone: false,
  },
});

export const logOutState = atom({
  key: 'logOutState',
  default: {
    logOutError: false,
    logOutLoading: false,
    logOutDone: false,
  },
});

