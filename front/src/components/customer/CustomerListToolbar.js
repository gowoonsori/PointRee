import { useCallback } from 'react';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import addHyphen from 'src/hooks/chagePhoneNumber';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import alert from 'src/atoms/alert';

const CustomerListToolbar = ({ phoneNumber, setPhoneNumber, onClickEvent, minPhoneNumberLength = 0 }) => {
  const [alertInfo, setAlertInfo] = useRecoilState(alert);
  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e.target.value));
    },
    [setPhoneNumber]
  );

  const openAlert = useCallback(
    (message) => {
      setAlertInfo({
        state: true,
        message: `${message}`
      });
    },
    [setAlertInfo]
  );

  const searchPhoneNumberEvent = useCallback(() => {
    if (minPhoneNumberLength === 0) onClickEvent();
    else if (phoneNumber.match('^(01\\d{1}|02|0505|0502|0506|0\\d{1,2})-?(\\d{3,4})-?(\\d{4})')) {
      onClickEvent();
    } else openAlert('11~14 자리의 전화번호만 입력가능합니다.');
  }, [onClickEvent, openAlert, phoneNumber, minPhoneNumberLength]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 1280 }} display="flex">
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon sx={{ mr: 2 }} fontSize="large" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
                sx: { height: 120, fontSize: '1.8em' },
                autoFocus: true
              }}
              placeholder="고객 전화번호 입력"
              variant="outlined"
              sx={{ mx: 2, minWidth: '300px' }}
              value={phoneNumber}
              onChange={onchangePhoneNumber}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ width: 150, fontSize: '1.3em', minWidth: '100px' }}
              onClick={searchPhoneNumberEvent}
            >
              검색
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

CustomerListToolbar.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
  minPhoneNumberLength: PropTypes.number
};
export default CustomerListToolbar;
