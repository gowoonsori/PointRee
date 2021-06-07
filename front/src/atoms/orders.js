import { atom } from 'recoil';

export const orders = atom({
  key: 'orders',
  default: []
});

export const select = atom({
  key: 'orderfds',
  default: []
});
