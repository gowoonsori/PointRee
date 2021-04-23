import { atom } from 'recoil';

export const customers = atom({
  key: 'customers',
  default: [
    { id: 1, telephone: '010-7543-1421', name: 'hong', totalPoint: 1234 },
    { id: 2, telephone: '02-2345-1112', name: 'a', totalPoint: 123 },
    { id: 3, telephone: '011-1111-3452', name: 'b', totalPoint: 12 },
    { id: 4, telephone: '051-8655-7653', name: 'c', totalPoint: 124 },
    { id: 5, telephone: '062-4455-1115', name: 'd', totalPoint: 4 },
    { id: 6, telephone: '070-7646-1764', name: 'e', totalPoint: 234 },
    { id: 7, telephone: '022-1764-1646', name: 'f', totalPoint: 23 },
    { id: 8, telephone: '031-4322-1118', name: 'g', totalPoint: 134 },
    { id: 9, telephone: '041-1111-1142', name: 'h', totalPoint: 1231 },
    { id: 10, telephone: '022-1123-1231', name: 'i', totalPoint: 2532 },
    { id: 11, telephone: '022-1755-4242', name: 'j', totalPoint: 3522 },
    { id: 12, telephone: '022-1534-0874', name: 'k', totalPoint: 6322 },
    { id: 13, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 },
    { id: 14, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 },
    { id: 1, telephone: '010-7543-1421', name: 'hong', totalPoint: 1234 },
    { id: 2, telephone: '02-2345-1112', name: 'a', totalPoint: 123 },
    { id: 3, telephone: '011-1111-3452', name: 'b', totalPoint: 12 },
    { id: 4, telephone: '051-8655-7653', name: 'c', totalPoint: 124 },
    { id: 5, telephone: '062-4455-1115', name: 'd', totalPoint: 4 },
    { id: 6, telephone: '070-7646-1764', name: 'e', totalPoint: 234 },
    { id: 7, telephone: '022-1764-1646', name: 'f', totalPoint: 23 },
    { id: 8, telephone: '031-4322-1118', name: 'g', totalPoint: 134 },
    { id: 9, telephone: '041-1111-1142', name: 'h', totalPoint: 1231 },
    { id: 10, telephone: '022-1123-1231', name: 'i', totalPoint: 2532 },
    { id: 11, telephone: '022-1755-4242', name: 'j', totalPoint: 3522 },
    { id: 12, telephone: '022-1534-0874', name: 'k', totalPoint: 6322 },
    { id: 13, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 },
    { id: 14, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 },
    { id: 1, telephone: '010-7543-1421', name: 'hong', totalPoint: 1234 },
    { id: 2, telephone: '02-2345-1112', name: 'a', totalPoint: 123 },
    { id: 3, telephone: '011-1111-3452', name: 'b', totalPoint: 12 },
    { id: 4, telephone: '051-8655-7653', name: 'c', totalPoint: 124 },
    { id: 5, telephone: '062-4455-1115', name: 'd', totalPoint: 4 },
    { id: 6, telephone: '070-7646-1764', name: 'e', totalPoint: 234 },
    { id: 7, telephone: '022-1764-1646', name: 'f', totalPoint: 23 },
    { id: 8, telephone: '031-4322-1118', name: 'g', totalPoint: 134 },
    { id: 9, telephone: '041-1111-1142', name: 'h', totalPoint: 1231 },
    { id: 10, telephone: '022-1123-1231', name: 'i', totalPoint: 2532 },
    { id: 11, telephone: '022-1755-4242', name: 'j', totalPoint: 3522 },
    { id: 12, telephone: '022-1534-0874', name: 'k', totalPoint: 6322 },
    { id: 13, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 },
    { id: 14, telephone: '022-1642-1743', name: 'l', totalPoint: 4332 }
  ]
});

export const customersInfoPagination = atom({
  key: 'customersInfoPagination',
  default: []
});
