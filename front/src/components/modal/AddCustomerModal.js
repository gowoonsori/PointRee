import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { updateCustomer } from 'src/atoms/customers';
import alert from 'src/atoms/alert';
import { Box, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import addHyphen from 'src/hooks/chagePhoneNumber';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddCustomerModal = ({ closeModal }) => {
  const [updateCustomerInfo, setUpdateCustomerInfo] = useRecoilState(updateCustomer);
  const [phoneNumber, setPhoneNumber] = useState('');
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
  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e.target.value));
    },
    [setPhoneNumber, addHyphen]
  );

  const addCustomerHandler = useCallback(async () => {
    const res = await axios.post('http://localhost:8999/api/customers', { phoneNumber: phoneNumber }).catch((error) => {
      openAlert(error.response.data.error.message);
      return error.response;
    });
    if (!res) {
      openAlert('서버로부터 응답이 없습니다.');
    } else if (res.data.response) {
      setUpdateCustomerInfo(true);
      closeModal();
    }
  }, [setUpdateCustomerInfo, phoneNumber, closeModal]);

  const onSubmitEvent = useCallback(() => {
    if (phoneNumber.match('^(01\\d{1}|02|0505|0502|0506|0\\d{1,2})-?(\\d{3,4})-?(\\d{4})')) {
      addCustomerHandler();
    } else openAlert('11~14 자리의 전화번호만 입력가능합니다.');
  }, [addCustomerHandler, phoneNumber, openAlert]);

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
          <FormControl sx={{ width: '70%', my: 6 }}>
            <InputLabel htmlFor="item-input-label">전화 번호</InputLabel>
            <Input
              autoFocus
              id="item-input-label"
              type="text"
              value={phoneNumber}
              onChange={onchangePhoneNumber}
              required
            />
          </FormControl>
        </div>
        <div>
          <Button sx={{ width: '70%' }} variant="contained" color="primary" onClick={onSubmitEvent}>
            고객 추가
          </Button>
        </div>
      </Box>
    </form>
  );
};

AddCustomerModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default AddCustomerModal;
