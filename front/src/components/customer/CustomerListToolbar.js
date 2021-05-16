import { useCallback } from 'react';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import addHyphen from 'src/hooks/chagePhoneNumber';
import PropTypes from 'prop-types';

const CustomerListToolbar = ({ phoneNumber, setPhoneNumber, onClickEvent }) => {
  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e.target.value));
    },
    [setPhoneNumber]
  );

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
                sx: { height: 120, fontSize: '1.8em' }
              }}
              placeholder="고객 전화번호 입력"
              variant="outlined"
              sx={{ mx: 2 }}
              value={phoneNumber}
              onChange={onchangePhoneNumber}
            />
            <Button color="primary" variant="contained" sx={{ width: 150, fontSize: '1.3em' }} onClick={onClickEvent}>
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
