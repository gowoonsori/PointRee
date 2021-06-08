import { atom, selector } from 'recoil';

export const alert = atom({
  key: 'alert',
  default: {
    state: false,
    message: '',
    severity: 'error'
  }
});

export const openAlert = selector({
  key: 'openAlert',
  get: ({ get }) => get(alert),
  set: ({ set }, info) => {
    set(alert, {
      state: true,
      message: info.message,
      severity: info.severity
    });
  }
});
