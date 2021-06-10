import { atom, selector } from 'recoil';

export const today = atom({
  key: 'today',
  default: new Date()
});

export const period = selector({
  key: 'period',
  get: ({ get }) => {
    const current = get(today);
    let day = current.getDate();
    let month = current.getMonth() + 1;
    day -= 3;
    if (day < 1) {
      day += 30;
      month -= 1;
    }
    const aThird = new Date(current.getFullYear().toString().concat('-').concat(month).concat('-').concat(day));

    day = current.getDate();
    month = current.getMonth() + 1;
    day -= 7;
    if (day < 1) {
      day += 30;
      month -= 1;
    }
    const aWeek = new Date(current.getFullYear().toString().concat('-').concat(month).concat('-').concat(day));

    day = current.getDate();
    month = current.getMonth() + 1;
    day -= 30;
    if (day < 1) {
      day += 30;
      month -= 1;
    }
    const aMonth = new Date(current.getFullYear().toString().concat('-').concat(month).concat('-').concat(day));

    return { current: current, third: aThird, week: aWeek, month: aMonth };
  }
});

export const select = atom({
  key: 'select',
  default: []
});
