import { atom, selector } from 'recoil';

export const alert = atom({
  key: 'alert',
  default: {
    state: false,
    message: ''
  }
});

export const openAlert = selector({
  key: 'openAlert',
  get: ({ get }) => get(alert),
  set: ({ set }, message) => {
    set(alert, {
      state: true,
      message: message
    });
  }
});
