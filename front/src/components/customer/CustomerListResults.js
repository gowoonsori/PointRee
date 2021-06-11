import { useState, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { selectedCustomer, currentDetailCustomer } from 'src/atoms/customers';
import { orders } from 'src/atoms/orders';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Tooltip,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { openAlert } from 'src/atoms/alert';

const CustomerListResults = ({ customers, openModal }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useRecoilState(selectedCustomer);
  const [currentCustomerId, setCurrentCustomerId] = useRecoilState(currentDetailCustomer);
  const [orderList, setOrderList] = useRecoilState(orders);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);

  const handleSelectAll = useCallback(
    (event) => {
      let newSelectedCustomerIds;
      if (event.target.checked) newSelectedCustomerIds = customers.map((customer) => customer.id);
      else newSelectedCustomerIds = [];
      setSelectedCustomerIds(newSelectedCustomerIds);
    },
    [setSelectedCustomerIds]
  );

  const handleSelectOne = useCallback(
    (event, id) => {
      const selectedIndex = selectedCustomerIds.indexOf(id);
      let newSelectedCustomerIds = [];

      if (selectedIndex === -1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
      } else if (selectedIndex === 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      } else if (selectedIndex === selectedCustomerIds.length - 1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(
          selectedCustomerIds.slice(0, selectedIndex),
          selectedCustomerIds.slice(selectedIndex + 1)
        );
      }

      setSelectedCustomerIds(newSelectedCustomerIds);
    },
    [selectedCustomerIds, setSelectedCustomerIds]
  );

  const handleLimitChange = useCallback(
    (event) => {
      setLimit(event.target.value);
    },
    [setLimit]
  );

  const handlePageChange = useCallback(
    (event, newPage) => {
      setPage(newPage);
      console.log(page);
    },
    [setPage]
  );

  const getOrders = useCallback(
    async (customerId) => {
      const res = await axios.get(`http://localhost:8999/api/customers/${customerId}/orders/all`).catch((error) => {
        if (error?.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
        else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });

        return null;
      });
      if (res?.data?.response) {
        setOrderList(res.data.response);
        setCurrentCustomerId(customerId);
        return true;
      }
      return false;
    },
    [setOrderList, setCurrentCustomerId]
  );

  const showOrders = useCallback(
    (e) => {
      if (e.target.id === '') return;
      if (e.target.id === currentCustomerId) {
        openModal();
      } else if (getOrders(e.target.id)) {
        openModal();
      }
    },
    [openModal, currentCustomerId]
  );

  return (
    <Card sx={{ background: '#f3f5f72e' }}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < customers.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>구매 횟수</TableCell>
                <TableCell>총 적립금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(page * limit, page * limit + limit).map((customer) => (
                <TableRow hover key={customer.id} selected={selectedCustomerIds.indexOf(customer.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        '&:hover': {
                          cursor: 'pointer'
                        }
                      }}
                      id={customer.id}
                      onClick={showOrders}
                    >
                      <Tooltip title="세부 내역보기" placement="right" id={String(customer.id)} arrow>
                        <Typography color="textPrimary" variant="body1" id={customer.id}>
                          {customer.phoneNumber}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.purchaseCnt}</TableCell>
                  <TableCell>{customer.totalPoint} 원</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired
};

export default CustomerListResults;
