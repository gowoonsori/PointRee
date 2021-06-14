import { useCallback, useState } from 'react';
import { Box, Button, FormControl, InputLabel, Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { openAlert } from 'src/atoms/alert';
import validatePointMax from 'src/hooks/priceInput';
import { searchCustomer } from 'src/atoms/customers';

const UsePointsModal = ({ closeModal }) => {
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);
  const [customer, setCustomer] = useRecoilState(searchCustomer);
  const [point, setPoint] = useState('');

  const onChagePoint = useCallback(
    (e) => {
      setPoint(validatePointMax(e.target.value, customer.totalPoint));
    },
    [customer]
  );

  const usePointEvent = useCallback(async () => {
    if (point < 100) {
      setOpenAlert({ message: '100원 미만으로는 사용하실 수 없습니다.', severity: 'error' });
      return;
    }
    const res = await axios
      .patch(`${process.env.REACT_APP_API_BASE_URL}/customers/${customer.id}?point=${point}`)
      .catch((error) => {
        if (error?.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
        else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });

        return null;
      });
    if (res?.data?.response) {
      setOpenAlert({ message: '성공적으로 포인트가 차감되었습니다.', severity: 'success' });
      setCustomer(res?.data?.response);
      closeModal();
    }
  }, [customer, point]);

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
      <Typography sx={{ mb: 4 }} variant="h1">
        {customer?.phoneNumber}
      </Typography>

      <Typography variant="h4">적립 금액 : &nbsp;&nbsp;&nbsp;{customer?.totalPoint} 원</Typography>
      <div>
        <FormControl sx={{ width: '50%', my: 4 }}>
          <InputLabel htmlFor="point-input-label">사용 포인트</InputLabel>
          <Input id="point-input-label" type="text" value={point} onChange={onChagePoint} required />
        </FormControl>
      </div>

      <Button sx={{ width: '50%' }} variant="contained" color="primary" onClick={usePointEvent}>
        사용
      </Button>
    </Box>
  );
};

UsePointsModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default UsePointsModal;
