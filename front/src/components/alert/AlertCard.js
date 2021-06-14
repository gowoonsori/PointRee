import { useCallback } from 'react';
import { Alert, Snackbar, Typography } from '@material-ui/core';
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
          bottom: 0,
          minWidth: '340px',
          width: '50%',
          margin: '0 auto',
          marginBottom: '15px',
          fontSize: '1.2em',
          height: '100px'
        }}
        onClose={closeAlert}
        severity={alertInfo.severity}
      >
        <Typography sx={{ pt: 3 }}>{alertInfo.message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default AlertCard;
