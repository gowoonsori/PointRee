import { atom } from 'recoil';

export const customers = atom({
  key: 'customers',
  default: [],
  set: ({ get, set }, newCustomer) => {
    const currentCustomer = get(customers);
    console.log(currentCustomer);
    console.log(newCustomer);
    if (currentCustomer.length !== newCustomer.length) {
      if (newCustomer.length === 1) {
        const appendCustomer = [...currentCustomer, newCustomer];
        console.log(appendCustomer);
        set(customers, appendCustomer);
      } else {
        set(customers, newCustomer);
      }
    }
  }
});

// 검색 결과
export const searchCustomer = atom({
  key: 'searchCustomer',
  default: customers
});

// 체크박스로 선택한 고객
export const selectedCustomer = atom({
  key: 'selectedCustomer',
  default: []
});

// Customer페이지에서 추가/삭제등 정보 바뀌었는지 상태값
export const updateCustomer = atom({
  key: 'updateCustomer',
  default: false
});

// 최근에 상세내역 살펴본 고객id
export const currentDetailCustomer = atom({
  key: 'currentDetailCustomer',
  default: -1
});
