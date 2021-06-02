import { Box, TableCell, Typography, TableRow, TableHead, Table, TableBody } from '@material-ui/core';
import PropTypes from 'prop-types';

const ShowOrdersModal = ({ orders }) => (
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
      <TableHead sx={{ background: '#5920a95e' }}>
        <TableRow>
          <TableCell />
          <TableCell>날짜</TableCell>
          <TableCell>구매 금액</TableCell>
          <TableCell>결제 방법</TableCell>
          <TableCell>적립 포인트</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order, index) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

ShowOrdersModal.propTypes = {
  orders: PropTypes.array.isRequired
};

export default ShowOrdersModal;
