import { useCallback } from 'react';
import { Box, Button, FormControl, InputLabel, Input, Select, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import useInput from 'src/hooks/useInput';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfo } from 'src/atoms/user';
import { openAlert } from 'src/atoms/alert';

const AddOrderModal = ({ closeModal, customer, setPhoneNumber }) => {
  const info = useRecoilValue(userInfo);
  const [price, onChangePrice] = useInput('');
  const [accumulationRate, onChangeAccumulationRate] = useInput(info.accumulationRate);
  const [payment, selectPayment] = useInput('');
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);

  const savePointButtonEvent = useCallback(
    async (e) => {
      const res = await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/customers/${customer.id}/orders`, {
          price: price,
          accumulationRate: accumulationRate,
          paymentType: payment
        })
        .catch((error) => {
          if (error?.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
          else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });

          return null;
        });
      if (res?.data?.response) {
        setOpenAlert({ message: '성공적으로 포인트적립이 되었습니다.', severity: 'success' });
        setPhoneNumber('');
        closeModal();
      }
    },
    [setOpenAlert, closeModal, price, accumulationRate, payment]
  );

  return (
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
      <Typography sx={{ my: 2 }} variant="h2">
        {customer?.phoneNumber}
      </Typography>
      <div>
        <FormControl sx={{ width: '50%', my: 3 }}>
          <InputLabel htmlFor="price-input-label">가격</InputLabel>
          <Input id="price-input-label" type="text" value={price} onChange={onChangePrice} required />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ width: '50%', my: 3 }}>
          <InputLabel htmlFor="accumulate-input-label">적립율(%)</InputLabel>
          <Input
            id="accumulate-input-label"
            type="text"
            value={accumulationRate}
            onChange={onChangeAccumulationRate}
            required
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ width: '50%', my: 3 }}>
          <InputLabel htmlFor="payment-input-label">결제 방법</InputLabel>
          <Select labelId="payment-input-label" id="payment-select" required value={payment} onChange={selectPayment}>
            <MenuItem value="CARD">카드</MenuItem>
            <MenuItem value="CASH">현금</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button sx={{ width: '50%' }} variant="contained" color="primary" onClick={savePointButtonEvent}>
          적립
        </Button>
      </div>
    </Box>
  );
};

AddOrderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  setPhoneNumber: PropTypes.func.isRequired
};

export default AddOrderModal;
