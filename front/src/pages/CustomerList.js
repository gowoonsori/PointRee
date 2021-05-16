import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';
import { Box, Container, Button, Modal } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { customers, searchCustomer } from 'src/reducers/customers';
import AddCustomerModal from 'src/components/modal/AddCustomerModal';
import axios from 'axios';

const CustomerList = () => {
  const [customerList, setCustomerList] = useRecoilState(customers);
  const [isModal, setIsModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchCustomerList, setSearchCustomerList] = useRecoilState(searchCustomer);

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
  }, [phoneNumber]);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, [setIsModal]);
  const closeModal = useCallback(() => {
    setIsModal(false);
  }, [setIsModal]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8999/api/customers/all');
      if (res.data.response) {
        setCustomerList(res.data.response);
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Customers | Point Ree</title>
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
              <Button color="primary" variant="contained" sx={{ mx: 1 }}>
                삭제하기
              </Button>
              <Button color="primary" variant="contained" onClick={openModal}>
                추가하기
              </Button>
            </Box>
            <CustomerListResults customers={searchCustomerList} />
          </Box>
        </Container>
      </Box>
      <Modal
        open={isModal}
        closeAfterTransition
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        Props={{ keepMounted: 'false' }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>
          <AddCustomerModal closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export default CustomerList;
