import { atom, selector } from 'recoil';
import axios from 'axios';

export const customers = atom({
  key: 'customers',
  default: []
});

export const customersInfoPagination = atom({
  key: 'customersInfoPagination',
  default: []
});

export const getCustomers = selector({
  key: 'getCustomers',
  get: async () => {
    const res = await axios.get('http://localhost:8999/api/customers/all');
    return res.data;
  }
});
