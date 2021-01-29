import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: null,
});

export const customersTelephone = atom({
  key: 'customersTelephone',
  default: ['010-2222-5516', '062-961-0204', '010-1234-1234'],
});

export const customers = atom({
  key: 'customers',
  default: [
    { id: 1, telephone: '010-1111-1111', name: 'hong', total: 1234 },
    { id: 2, telephone: '010-1111-1112', name: 'a', total: 123 },
    { id: 3, telephone: '010-1111-1113', name: 'b', total: 12 },
    { id: 4, telephone: '010-1111-1114', name: 'c', total: 124 },
    { id: 5, telephone: '010-1111-1115', name: 'd', total: 4 },
    { id: 6, telephone: '010-1111-1116', name: 'e', total: 234 },
    { id: 7, telephone: '010-1111-1117', name: 'f', total: 23 },
    { id: 8, telephone: '010-1111-1118', name: 'g', total: 134 },
    { id: 9, telephone: '010-1111-1119', name: 'h', total: 1 },
    { id: 10, telephone: '010-1111-1110', name: 'i', total: 2 },
  ],
});
