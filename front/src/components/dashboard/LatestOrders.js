import { useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useNavigate } from 'react-router-dom';

const orders = [
  {
    id: 1,
    phoneNumber: '010-1111-1111',
    date: '2021-05-21',
    price: 24000,
    paymentType: 'CASH',
    savePoint: 600
  },
  {
    id: 3,
    phoneNumber: '010-2222-2222',
    date: '2021-05-21',
    price: 32000,
    paymentType: 'CARD',
    savePoint: 1200
  }
];

const LatestOrders = () => {
  const navigate = useNavigate();
  const navigateCustomers = useCallback(() => {
    navigate('/pointree/customers', { replace: false });
  }, [navigate]);

  return (
    <Card>
      <CardHeader title="최근 적립 내역" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>고객 전화번호</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>결제 금액</TableCell>
                <TableCell>결제 방법</TableCell>
                <TableCell>적립 금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Chip color="primary" label={order.paymentType} size="small" />
                  </TableCell>
                  <TableCell>{order.savePoint}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text" onClick={navigateCustomers}>
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestOrders;
