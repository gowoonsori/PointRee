import { Helmet } from 'react-helmet';
import { useState, useCallback } from 'react';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import addHyphen from 'src/hooks/chagePhoneNumber';

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const onchangePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(addHyphen(e));
    },
    [setPhoneNumber]
  );
  return (
    <>
      <Helmet>
        <title>Dashboard | Point Ree</title>
      </Helmet>
      <Card sx={{ m: 4 }}>
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
            <Button color="primary" variant="contained">
              검색
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
