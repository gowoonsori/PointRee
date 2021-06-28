import { Helmet } from 'react-helmet';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import { Modal } from '@material-ui/core';
import AddOrderModal from 'src/components/modal/AddOrderModal';
import SelectModal from 'src/components/modal/SelectModal';
import UsePointsModal from 'src/components/modal/UsePointsModal';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import KeyPad from 'src/components/buttons/KeyPad';

import Auth from 'src/hoc/auth';
import { openAlert } from 'src/atoms/alert';
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
        return <AddOrderModal closeModal={closeModal} customer={customer} setPhoneNumber={setPhoneNumber} />;
      default:
        return <SelectModal setModal={setModalState} />;
    }
  }, [modalState, customer]);

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
        aria-labelledby="points-modal"
        props={{ keepMounted: 'false' }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        <div>{renderModal()}</div>
      </Modal>
      <KeyPad phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
    </>
  );
};
export default Auth(Points, ['USER', 'ADMIN']);
