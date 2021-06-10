import { useCallback } from 'react';
import { Alert, Snackbar } from '@material-ui/core';
import { alert } from 'src/atoms/alert';
import { useRecoilState } from 'recoil';

const AlertCard = () => {
  const [alertInfo, setAlert] = useRecoilState(alert);

  const closeAlert = useCallback(() => {
    setAlert({
      state: false,
      message: '',
      severity: 'error'
    });
  }, [setAlert]);

  return (
    <Snackbar open={alertInfo.state} autoHideDuration={2000} onClose={closeAlert}>
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
        onClose={closeAlert}
        severity={alertInfo.severity}
      >
        {alertInfo.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertCard;
