import { Helmet } from 'react-helmet';
import { useState, useCallback } from 'react';
import { Grid, Modal } from '@material-ui/core';
import AddOrderModal from 'src/components/modal/AddOrderModal';
import axios from 'axios';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import PhoneNumberButton from 'src/components/buttons/phoneNumberButton';

const Points = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [customer, setCustomer] = useState({});

  const openModal = useCallback(() => {
    setIsModal(true);
  }, [setIsModal]);
  const closeModal = useCallback(() => {
    setIsModal(false);
  }, [setIsModal]);

  const onClickButtonEvent = useCallback(async (e) => {
    const res = await axios.get(`http://localhost:8999/api/customers/phoneNumber/${phoneNumber}`);
    if (res.data.response) {
      openModal();
      setCustomer(res.data.response);
    }
  });

  return (
    <>
      <Helmet>
        <title>Points | Point Ree</title>
      </Helmet>
      <CustomerListToolbar
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        onClickEvent={onClickButtonEvent}
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
        <div>
          <AddOrderModal closeModal={closeModal} customer={customer} />
        </div>
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

export default Points;
