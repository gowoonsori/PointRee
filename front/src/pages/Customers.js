import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Container, Button, Modal } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { customers, searchCustomer, selectedCustomer, updateCustomer } from 'src/atoms/customers';
import { orders } from 'src/atoms/orders';
import AddCustomerModal from 'src/components/modal/AddCustomerModal';
import ShowOrdersModal from 'src/components/modal/ShowOrdersModal';
import axios from 'axios';
import Auth from 'src/hoc/auth';
import { openAlert } from 'src/atoms/alert';

const Customers = () => {
  const [customerList, setCustomerList] = useRecoilState(customers);
  const [searchCustomerList, setSearchCustomerList] = useRecoilState(searchCustomer);
  const [selectedCustomerIds, setSelectedCustomerIds] = useRecoilState(selectedCustomer);
  const [updateCustomerInfo, setUpdateCustomerInfo] = useRecoilState(updateCustomer);
  const orderList = useRecoilValue(orders);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [ordersModal, setOrdersModal] = useState(false);
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);

  const searchHandler = useCallback(() => {
    const results = [];
    if (phoneNumber === '') {
      setSearchCustomerList(customerList);
    } else {
      customerList.forEach((customer) => {
        if (customer.phoneNumber.includes(phoneNumber)) {
          results.push(customer);
        }
      });
      setSearchCustomerList(results);
      console.log(results);
    }
  }, [phoneNumber, setSearchCustomerList, customerList]);

  const openAddCustomerModal = useCallback(() => {
    setAddCustomerModal(true);
  }, [setAddCustomerModal]);

  const closeAddCustomerModal = useCallback(() => {
    setAddCustomerModal(false);
  }, [setAddCustomerModal]);

  const openOrdersModal = useCallback(() => {
    setOrdersModal(true);
  }, [setOrdersModal]);

  const closeOrdersModal = useCallback(() => {
    setOrdersModal(false);
  }, [setOrdersModal]);

  const deleteCustomers = useCallback(async () => {
    if (selectedCustomerIds.length === 0) {
      setOpenAlert('삭제하실 고객을 선택하세요.');
      return null;
    }
    console.log(selectedCustomerIds);
    const res = await axios
      .delete('http://localhost:8999/api/customers', { data: selectedCustomerIds })
      .catch((error) => {
        if (error?.response) setOpenAlert(error.response.data.error.message);
        else setOpenAlert('서버로부터 응답이 없습니다.');
        return null;
      });
    if (res?.data?.response) {
      setSelectedCustomerIds([]);
      setUpdateCustomerInfo(true);
    }
  }, [selectedCustomerIds, setOpenAlert, setSelectedCustomerIds, setUpdateCustomerInfo]);

  const getCustomerList = useCallback(async () => {
    const res = await axios.get('http://localhost:8999/api/customers/all').catch((error) => {
      if (error?.response) setOpenAlert(error.response.data.error.message);
      else setOpenAlert('서버로부터 응답이 없습니다.');
      return null;
    });
    if (res?.data?.response) {
      setCustomerList(res.data.response);
    }
  }, [setOpenAlert, setCustomerList]);

  useEffect(() => {
    getCustomerList();
  }, []);

  useEffect(() => {
    if (updateCustomerInfo) {
      getCustomerList();
      setUpdateCustomerInfo(false);
    }
  }, [updateCustomerInfo]);

  return (
    <>
      <Helmet>
        <title>고객정보 | Point Ree</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} onClickEvent={searchHandler} />
          <Box sx={{ pt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 1
              }}
            >
              <Button color="primary" variant="contained" sx={{ mx: 1 }} onClick={deleteCustomers}>
                삭제하기
              </Button>
              <Button color="primary" variant="contained" onClick={openAddCustomerModal}>
                추가하기
              </Button>
            </Box>
            <CustomerListResults
              customers={searchCustomerList}
              openModal={openOrdersModal}
              closeModal={closeOrdersModal}
            />
          </Box>
        </Container>
      </Box>
      <Modal
        open={addCustomerModal}
        closeAfterTransition
        onClose={closeAddCustomerModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        keepMounted={false}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>
          <AddCustomerModal closeModal={closeAddCustomerModal} />
        </div>
      </Modal>

      <Modal
        open={ordersModal}
        closeAfterTransition
        onClose={closeOrdersModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        keepMounted={false}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>
          <ShowOrdersModal orders={orderList} closeModal={closeOrdersModal} />
        </div>
      </Modal>
    </>
  );
};

export default Auth(Customers, ['USER', 'ADMIN']);
