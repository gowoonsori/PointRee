import { useState, useCallback } from 'react';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Alert, Snackbar } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import addHyphen from 'src/hooks/chagePhoneNumber';
import PropTypes from 'prop-types';
import AlertCard from '../alert/AlertCard';

const CustomerListToolbar = ({ phoneNumber, setPhoneNumber, onClickEvent }) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(
    (e) => {
      setOpen(false);
    },
    [setOpen]
  );

  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e.target.value));
    },
    [setPhoneNumber]
  );

  const searchPhoneNumberEvent = useCallback(
    (e) => {
      if (phoneNumber.length < 11 || phoneNumber.length > 14) setOpen(true);
      else onClickEvent();
    },
    [onClickEvent, setOpen]
  );

  return (
    <Box>
      <AlertCard open={open} handleClose={handleClose} message="전화번호를 잘못입력하셨습니다." />
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
                sx: { height: 120, fontSize: '1.8em' }
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
  onClickEvent: PropTypes.func.isRequired
};
export default CustomerListToolbar;
