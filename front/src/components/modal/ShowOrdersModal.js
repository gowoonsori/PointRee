import { useCallback } from 'react';
import { Box, TableCell, Typography, TableRow, TableHead, Table, TableBody, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { openAlert } from 'src/atoms/alert';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentDetailCustomer, updateCustomer } from 'src/atoms/customers';
import { orders } from 'src/atoms/orders';

const ShowOrdersModal = ({ closeModal }) => {
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);
  const currentCustomerId = useRecoilValue(currentDetailCustomer);
  const [updateCustomerInfo, setUpdateCustomerInfo] = useRecoilState(updateCustomer);
  const [orderList, setOrderList] = useRecoilState(orders);

  const onClickEvent = useCallback(
    async (e) => {
      const res = await axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/customers/${currentCustomerId}/orders/${e.target.id}`)
        .catch((error) => {
          if (error.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
          else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });

          return null;
        });
      if (res?.data?.response) {
        const refresh = orderList.filter((obj) => obj.id.toString() !== e.target.id.toString());
        setOpenAlert({ message: '구매내역이 삭제되었습니다.', severity: 'success' });
        setUpdateCustomerInfo(true);
        setOrderList(refresh);

        closeModal();
      }
    },
    [setOpenAlert, setUpdateCustomerInfo, closeModal, orderList, setOrderList]
  );

  return (
    <Box
      sx={{
        width: '700px',
        maxHeigth: '530px',
        background: '#E9EBED',
        border: '2px solid #000',
        boxShadow: 5,
        px: 3,
        py: 3
      }}
    >
      <Table>
        <TableHead sx={{ background: '#ff7e67' }}>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', color: '#f3f3f3' }}>날짜</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#f3f3f3' }}>구매 금액</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#f3f3f3' }}>결제 방법</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#f3f3f3' }}>적립 포인트</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#f3f3f3' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order, index) => (
            <TableRow hover key={order.id}>
              <TableCell>{index}</TableCell>
              <TableCell>
                <Typography color="textPrimary" variant="body1" id={order.id}>
                  {order.createdTime
                    .substr(0, 4)
                    .concat('.')
                    .concat(order.createdTime.substr(5, 2))
                    .concat('.')
                    .concat(order.createdTime.substr(8, 2))}
                </Typography>
              </TableCell>
              <TableCell>{order.price} 원</TableCell>
              <TableCell>{order.paymentType}</TableCell>
              <TableCell>{order.savePoint} 원</TableCell>
              <TableCell>
                <Button color="secondary" onClick={onClickEvent}>
                  <span id={order.id}>삭제</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

ShowOrdersModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ShowOrdersModal;
