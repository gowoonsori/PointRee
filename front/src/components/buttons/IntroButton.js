import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const IntroButton = ({ value, link, ...rest }) => {
  const navigate = useNavigate();
  const onClickEvent = useCallback(() => {
    navigate(`/pointree/${link}`, { replace: true });
  }, [link]);

  return (
    <Button
      sx={{ mx: 3, borderRadius: '0', border: '0.2px solid #eeeeee' }}
      color="primary"
      variant="contained"
      onClick={onClickEvent}
    >
      {value}
    </Button>
  );
};

IntroButton.propTypes = {
  value: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
export default IntroButton;
