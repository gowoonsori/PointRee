import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: null,
});

export const customers = atom({
  key: 'customers',
  default: ['010-2222-5516', '062-961-0204', '010-1234-1234'],
});
