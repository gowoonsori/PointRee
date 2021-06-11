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
    day -= 2;
    if (day < 1) {
      day += new Date(current.getFullYear(), month, 0).getDate();
      month -= 1;
    }
    const aThird = new Date(current.getFullYear().toString().concat('-').concat(month).concat('-').concat(day));

    day = current.getDate();
    month = current.getMonth() + 1;
    day -= 6;
    if (day < 1) {
      day += new Date(current.getFullYear(), month, 0).getDate();
      month -= 1;
    }
    const aWeek = new Date(current.getFullYear().toString().concat('-').concat(month).concat('-').concat(day));

    day = current.getDate();
    month = current.getMonth() + 1;
    day -= 29;
    if (day < 1) {
      day += new Date(current.getFullYear(), month, 0).getDate();
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

export const monthDates = selector({
  key: 'monthDates',
  get: ({ get }) => {
    const dateRange = get(select);
    const currentDate = get(today);
    const monthAndDate = [];

    if (dateRange.length === 2) {
      const diff = Math.ceil((dateRange[1].getTime() - dateRange[0].getTime()) / 1000 / 60 / 60 / 24);

      let month = dateRange[0].getMonth() + 1;
      let date = dateRange[0].getDate();
      for (let i = 0; i < diff; i++) {
        if (month < 10) month = '0'.concat(month);
        if (date < 10) date = '0'.concat(date);
        monthAndDate.push(month.toString().concat('월 ').concat(date).concat('일'));
        month = parseInt(month, 10);
        date = parseInt(date, 10);
        date++;
        if (new Date(dateRange[0].getFullYear(), month, 0).getDate() < date) {
          month++;
          date = 1;
          if (month === 13) month = 1;
        }
      }

      month = dateRange[1].getMonth() + 1;
      date = dateRange[1].getDate();
      if (month < 10) month = '0'.concat(month);
      if (date < 10) date = '0'.concat(date);
      const str = month.toString().concat('월 ').concat(date).concat('일');
      if (!monthAndDate.includes(str)) monthAndDate.push(str);
    } else {
      let m = currentDate.getMonth() + 1;
      let d = currentDate.getDate();
      if (m < 10) m = '0'.concat(m);
      if (d < 10) d = '0'.concat(d);
      const str = m.toString().concat('월 ').concat(d).concat('일');
      monthAndDate.push(str);
    }

    return monthAndDate;
  }
});
