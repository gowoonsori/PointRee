import { atom, selector } from 'recoil';
import axios from 'axios';

export const userInfo = atom({
  key: 'userInfo',
  default: {}
});

export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: async ({ get }) => {
    const token = window.sessionStorage.getItem('userToken');
    if (get(userInfo).name) return get(userInfo);
    if (token === '' || token === null || token === undefined) {
      return {};
    }
    axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('userToken');
    const res = await axios.get('http://localhost:8999/api/users/me');
    if (res.data.response) {
      return res.data.response;
    }
  },
  set: ({ set }, newInfo) => {
    set(userInfo, newInfo);
  }
});

export const userToken = selector({
  key: 'userToken',
  get: () => {
    const token = window.sessionStorage.getItem('userToken');
    return token;
  },
  set: ({ set }, newToken) => {
    window.sessionStorage.setItem('userToken', newToken);
  }
});
