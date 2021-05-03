import { atom, useRecoilValue } from 'recoil';

export const customers = atom({
  key: 'customers',
  default: [],
  set: ({ get, set }, newCustomer) => {
    if (newCustomer.length > 1) {
      set(customers, newCustomer);
    } else {
      const currentCustomer = get(customers);
      const appendCustomer = [...currentCustomer, newCustomer];
      set(customers, appendCustomer);
    }
  }
});

export const searchCustomer = atom({
  key: 'searchCustomer',
  default: customers
});

export const selectedCustomer = atom({
  key: 'selectedCustomer',
  default: []
});
