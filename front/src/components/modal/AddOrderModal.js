import { useCallback, useState } from 'react';
import { Box, Button, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';

const AddOrderModal = () => {
  const [payment, setPayment] = useState('');

  const selectPayment = useCallback(
    (e) => {
      setPayment(e.target.value);
    },
    [setPayment]
  );

  return (
    <form>
      <Box
        sx={{
          width: '500px',
          background: '#E9EBED',
          border: '2px solid #000',
          boxShadow: 5,
          px: 3,
          py: 3
        }}
      >
        <div>
          <FormControl sx={{ width: '50%', my: 3 }}>
            <InputLabel htmlFor="item-input-label">전화 번호</InputLabel>
            <Input id="item-input-label" type="text" required value={phoneNumber} />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ width: '50%', my: 3 }}>
            <InputLabel htmlFor="item-input-label">판매 물건</InputLabel>
            <Input id="item-input-label" type="text" required />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ width: '50%', my: 3 }}>
            <InputLabel htmlFor="price-inpu-label">가격</InputLabel>
            <Input id="price-input-label" type="text" required />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ width: '50%', my: 3 }}>
            <InputLabel htmlFor="payment-input-label">결제 방법</InputLabel>
            <Select labelId="payment-input-label" id="payment-select" value={payment} onChange={selectPayment}>
              <MenuItem value="card">카드</MenuItem>
              <MenuItem value="money">현금</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button sx={{ width: '50%' }} variant="contained" color="primary">
            적립
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default AddOrderModal;
