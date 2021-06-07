import { useCallback } from 'react';
import { Box, Button, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import useInput from 'src/hooks/useInput';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfo } from 'src/atoms/user';
import alert from 'src/atoms/alert';

const AddOrderModal = ({ closeModal, customer }) => {
  const info = useRecoilValue(userInfo);
  const [price, onChangePrice] = useInput('');
  const [accumulationRate, onChangeAccumulationRate] = useInput(info.accumulationRate);
  const [payment, selectPayment] = useInput('');
  const [alertInfo, setAlertInfo] = useRecoilState(alert);
  const openAlert = useCallback(
    (message) => {
      setAlertInfo({
        state: true,
        message: `${message}`
      });
    },
    [setAlertInfo]
  );

  const savePointButtonEvent = useCallback(async (e) => {
    const res = await axios
      .post(`http://localhost:8999/api/customers/${customer.id}/orders`, {
        price: price,
        accumulationRate: accumulationRate,
        paymentType: payment
      })
      .catch((error) => {
        openAlert(error.response.data.error.message);
        return error.response;
      });
    if (!res) {
      openAlert('서버로부터 응답이 없습니다.');
    } else if (res.data.response) {
      closeModal();
    }
  });

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
      <div>
        <FormControl sx={{ width: '50%', my: 3, fontSize: '1.4em', fontWeight: 'bold' }}>
          <p>{customer.phoneNumber}</p>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ width: '50%', my: 3 }}>
          <InputLabel htmlFor="price-inpu-label">가격</InputLabel>
          <Input id="price-input-label" type="text" value={price} onChange={onChangePrice} required />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ width: '50%', my: 3 }}>
          <InputLabel htmlFor="price-inpu-label">적립율(%)</InputLabel>
          <Input
            id="price-input-label"
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
  customer: PropTypes.object.isRequired
};

export default AddOrderModal;
