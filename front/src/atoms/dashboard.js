import { atom, selector } from 'recoil';
import { monthDates } from 'src/atoms/date';

export const dashboard = atom({
  key: 'dashboard',
  default: []
});

export const isGetData = atom({
  key: 'isGetData',
  dafulat: true
});

export const price = selector({
  key: 'price',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) return 0;

    let sum = 0;
    data.forEach((order) => {
      sum += order.price;
    });

    return sum;
  }
});

export const savePoint = selector({
  key: 'savePoint',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) return 0;

    let sum = 0;
    data.forEach((order) => {
      sum += order.savePoint;
    });

    return sum;
  }
});

export const salesVolume = selector({
  key: 'salesVolume',
  get: ({ get }) => {
    const data = get(dashboard);
    return data.length;
  }
});

export const usePoint = selector({
  key: 'usePoint',
  get: ({ get }) => 13000
});

export const paymentRatio = selector({
  key: 'paymentRatio',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return {
        cash: 0,
        card: 0,
        cashRatio: 0,
        cardRatio: 0
      };
    }

    let cash = 0;
    let card = 0;
    data.forEach((order) => {
      if (order.paymentType === 'CASH') cash++;
      else card++;
    });

    const cashRatio = (cash / data.length) * 100.0;
    const cardRatio = (card / data.length) * 100.0;
    return { cash: cash, card: card, cashRatio: cashRatio, cardRatio: cardRatio };
  }
});

export const paymentBar = selector({
  key: 'paymentBar',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return [[0], [0]];
    }

    const date = get(monthDates);
    const cash = new Map();
    const card = new Map();
    for (let i = 0; i < date.length; i++) {
      cash.set(date[i], 0);
      card.set(date[i], 0);
    }

    for (let i = 0; i < data.length; i++) {
      const str = data[i].createdTime.substr(5, 2).concat('월 ').concat(data[i].createdTime.substr(8, 2)).concat('일');
      if (data[i].paymentType === 'CASH') cash.set(str, cash.get(str) + 1);
      else card.set(str, card.get(str) + 1);
    }

    const cashArray = Array.from(cash.values());
    const cardArray = Array.from(card.values());
    return [cashArray, cardArray];
  }
});

export const customerKindsRatio = selector({
  key: 'customerKindsRatio',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return {
        newCustomer: 0,
        oldCustomer: 0,
        newCustomerRatio: 0,
        oldCustomerRatio: 0
      };
    }

    let newCustomer = 0;
    let oldCustomer = 0;
    data.forEach((order) => {
      if (order.purchaseCnt === 1) newCustomer++;
      else oldCustomer++;
    });

    const newCustomerRatio = (newCustomer / data.length) * 100.0;
    const oldCustomerRatio = (oldCustomer / data.length) * 100.0;
    return {
      newCustomer: newCustomer,
      oldCustomer: oldCustomer,
      newCustomerRatio: newCustomerRatio,
      oldCustomerRatio: oldCustomerRatio
    };
  }
});

export const customerKindsBar = selector({
  key: 'customerKindsBar',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return [[0], [0]];
    }

    const date = get(monthDates);
    const newCustomer = new Map();
    const oldCustomer = new Map();
    for (let i = 0; i < date.length; i++) {
      newCustomer.set(date[i], 0);
      oldCustomer.set(date[i], 0);
    }

    for (let i = 0; i < data.length; i++) {
      const str = data[i].createdTime.substr(5, 2).concat('월 ').concat(data[i].createdTime.substr(8, 2)).concat('일');
      if (data[i].purchaseCnt === 1) newCustomer.set(str, newCustomer.get(str) + 1);
      else oldCustomer.set(str, oldCustomer.get(str) + 1);
    }

    const newCustomerArray = Array.from(newCustomer.values());
    const oldCustomerArray = Array.from(oldCustomer.values());
    return [newCustomerArray, oldCustomerArray];
  }
});

export const salesVolumeLine = selector({
  key: 'visitedCustomerLine',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return [[0], [0]];
    }

    const date = get(monthDates);
    const saleVolume = new Map();
    for (let i = 0; i < date.length; i++) {
      saleVolume.set(date[i], 0);
    }

    for (let i = 0; i < data.length; i++) {
      const str = data[i].createdTime.substr(5, 2).concat('월 ').concat(data[i].createdTime.substr(8, 2)).concat('일');
      saleVolume.set(str, saleVolume.get(str) + 1);
    }

    return Array.from(saleVolume.values());
  }
});

export const latestOrders = selector({
  key: 'latestOrders',
  get: ({ get }) => {
    const data = get(dashboard);
    if (data.length < 1) {
      return data;
    }

    const reverse = [...data].reverse();
    return reverse.slice(0, 10);
  }
});
