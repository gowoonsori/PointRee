import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import addHyphen from 'src/hooks/chagePhoneNumber';

const PhoneNumberButton = ({ value, phoneNumber, setPhoneNumber }) => {
  const onClickEvent = useCallback(() => {
    setPhoneNumber(addHyphen(phoneNumber + value));
  });
  return (
    <Button
      sx={{ width: '100%', height: '100%', fontSize: '2em' }}
      color="primary"
      variant="contained"
      onClick={onClickEvent}
    >
      {value}
    </Button>
  );
};

PhoneNumberButton.propTypes = {
  value: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired
};
export default PhoneNumberButton;
