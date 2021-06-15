import { Grid } from '@material-ui/core';
import PhoneNumberButton from 'src/components/buttons/phoneNumberButton';
import PropTypes from 'prop-types';

const KeyPad = ({ phoneNumber, setPhoneNumber }) => (
  <>
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

KeyPad.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired
};

export default KeyPad;
