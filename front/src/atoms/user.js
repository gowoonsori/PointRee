import { atom, selector } from 'recoil';
import axios from 'axios';

export const userInfo = atom({
  key: 'userInfo',
  default: {}
});

export const userInfoSelector = selector({
  key: 'userInfoSelector',
  get: async ({ get }) => {
    if (get(userInfo).name) return get(userInfo);
    const token = window.sessionStorage.getItem('userToken');
    if (token === '' || token === null || token === undefined) {
      return null;
    }

    axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('userToken');
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/me`).catch((error) => {
      if (error.response) return error.response.data.error.message;
      return '서버로부터 응답이 없습니다.';
    });
    if (res?.data?.response) return res.data.response;
    return res;
  },
  set: ({ set }, newInfo) => {
    set(userInfo, newInfo);
  }
});

export const userToken = selector({
  key: 'userToken',
  get: () => window.sessionStorage.getItem('userToken'),
  set: ({ set }, newToken) => {
    if (!newToken) window.sessionStorage.removeItem('userToken');
    else window.sessionStorage.setItem('userToken', newToken);
  }
});
