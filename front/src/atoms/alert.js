import { atom } from 'recoil';

const alert = atom({
  key: 'alert',
  default: {
    state: false,
    message: ''
  }
});

export default alert;
