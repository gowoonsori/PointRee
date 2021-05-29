import { Alert, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

const AlertCard = ({ open, handleClose, message }) => (
  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
    <Alert
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '28%',
        minWidth: '450px',
        width: '50%',
        marginBottom: '15px',
        padding: '30px',
        fontSize: '1.2em',
        height: '100px'
      }}
      onClose={handleClose}
      severity="error"
    >
      {message}
    </Alert>
  </Snackbar>
);

AlertCard.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string
};

export default AlertCard;
