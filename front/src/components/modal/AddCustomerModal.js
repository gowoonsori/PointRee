import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { updateCustomer } from 'src/reducers/customers';
import { Box, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import addHyphen from 'src/hooks/chagePhoneNumber';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddCustomerModal = ({ closeModal, setOpen }) => {
  const [updateCustomerInfo, setUpdateCustomerInfo] = useRecoilState(updateCustomer);
  const [phoneNumber, setPhoneNumber] = useState('');
  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e.target.value));
    },
    [setPhoneNumber, addHyphen]
  );

  const addCustomerHandler = useCallback(async () => {
    const res = await axios.post('http://localhost:8999/api/customers', { phoneNumber: phoneNumber });
    if (res.data.response) {
      setUpdateCustomerInfo(true);
    }
    closeModal();
  }, [setUpdateCustomerInfo, phoneNumber, closeModal]);

  const onSubmitEvent = useCallback(() => {
    if (phoneNumber.length < 11 || phoneNumber.length > 14) setOpen(true);
    else addCustomerHandler();
  }, [setOpen, addCustomerHandler, phoneNumber]);

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
  closeModal: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default AddCustomerModal;
