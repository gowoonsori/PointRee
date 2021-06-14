import { Helmet } from 'react-helmet';
import { useState, useCallback } from 'react';
import { Grid, Modal } from '@material-ui/core';
import AddOrderModal from 'src/components/modal/AddOrderModal';
import SelectModal from 'src/components/modal/SelectModal';
import UsePointsModal from 'src/components/modal/UsePointsModal';
import axios from 'axios';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import PhoneNumberButton from 'src/components/buttons/phoneNumberButton';
import Auth from 'src/hoc/auth';
import { openAlert } from 'src/atoms/alert';
import { useRecoilState } from 'recoil';
import { searchCustomer } from 'src/atoms/customers';

const Points = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [setAlert, setOpenAlert] = useRecoilState(openAlert);
  const [customer, setCustomer] = useRecoilState(searchCustomer);
  const [modalState, setModalState] = useState('');

  const openModal = useCallback(() => {
    setIsModal(true);
  }, [setIsModal]);

  const closeModal = useCallback(() => {
    setModalState('');
    setIsModal(false);
  }, [setIsModal, setModalState]);

  const onClickButtonEvent = useCallback(async () => {
    if (customer?.phoneNumber === phoneNumber) {
      openModal();
      return;
    }
    const res = await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/customers/phoneNumber/${phoneNumber}`)
      .catch((error) => {
        if (error.response) setOpenAlert({ message: error.response.data.error.message, severity: 'error' });
        else setOpenAlert({ message: '서버로부터 응답이 없습니다.', severity: 'error' });
        return null;
      });
    if (res?.data?.response) {
      openModal();
      setCustomer(res.data.response);
    }
  }, [setOpenAlert, openModal, customer, setCustomer, phoneNumber]);

  const renderModal = useCallback(() => {
    switch (modalState) {
      case 'use':
        return <UsePointsModal closeModal={closeModal} />;
      case 'save':
        return <AddOrderModal closeModal={closeModal} customer={customer} />;
      default:
        return <SelectModal setModalState={setModalState} />;
    }
  }, [modalState, customer, setModalState]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="별도의 앱 설치 없이 웹을 통해 간편하게 포인트적립서비스를 제공하는 pointRee의 포인트 적립페이지입니다."
        />
        <title>포인트 적립 | Point Ree</title>
      </Helmet>
      <CustomerListToolbar
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onClickEvent={onClickButtonEvent}
        minPhoneNumberLength={11}
      />

      <Modal
        open={isModal}
        closeAfterTransition
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        Props={{ keepMounted: 'false' }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>{renderModal()}</div>
      </Modal>
      <Grid container sapcing={3} sx={{ p: 4, height: '80%' }}>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={1} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={2} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={3} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={4} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={5} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={6} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={7} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={8} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={4} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={9} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2, px: 1 }}>
          <PhoneNumberButton value={0} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </Grid>
      </Grid>
    </>
  );
};

export default Auth(Points, ['USER', 'ADMIN']);
