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
import { latestOrders } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';
import { dateTimeToPreetyFormat } from 'src/hooks/dateFormatting';

const LatestOrders = () => {
  const navigate = useNavigate();
  const orders = useRecoilValue(latestOrders);

  const navigateCustomers = useCallback(() => {
    navigate('/pointree/customers', { replace: false });
  }, [navigate]);

  return (
    <Card>
      <CardHeader title="최근 적립 내역" sx={{ background: '#fcfcfc' }} />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>고객 전화번호</TableCell>
                <TableCell>날짜</TableCell>
                <TableCell>결제 금액</TableCell>
                <TableCell>결제 방법</TableCell>
                <TableCell>적립 금액</TableCell>
                <TableCell>방문 횟수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{dateTimeToPreetyFormat(order.createdTime)}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    {order.paymentType === 'CASH' ? (
                      <Chip color="primary" label="현금" size="medium" />
                    ) : (
                      <Chip color="secondary" label="카드" size="medium" />
                    )}
                  </TableCell>
                  <TableCell>{order.savePoint}</TableCell>
                  <TableCell>{order.purchaseCnt}</TableCell>
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
