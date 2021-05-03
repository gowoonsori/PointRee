import { useState, useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import addHyphen from 'src/hooks/chagePhoneNumber';
import { customers, searchCustomer } from 'src/reducers/customers';

const CustomerListToolbar = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const customerList = useRecoilValue(customers);
  const [searchCustomerList, setSearchCustomerList] = useRecoilState(searchCustomer);

  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e));
    },
    [setPhoneNumber]
  );

  const searchHandler = useCallback(() => {
    const results = [];
    if (phoneNumber === '') {
      setSearchCustomerList(customerList);
    } else {
      customerList.forEach((customer) => {
        if (customer.phoneNumber.includes(phoneNumber)) {
          results.push(customer);
        }
      });
      setSearchCustomerList(results);
      console.log(results);
    }
  }, [phoneNumber]);

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 1280 }} display="flex">
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
                sx={{ mx: 2 }}
                value={phoneNumber}
                onChange={onchangePhoneNumber}
              />
              <Button color="primary" variant="contained" onClick={searchHandler}>
                검색
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
