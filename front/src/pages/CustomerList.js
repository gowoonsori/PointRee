import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { Box, Container, Button } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { getCustomers } from 'src/reducers/customers';

const CustomerList = () => {
  const customerList = useRecoilValue(getCustomers);
  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 1
              }}
            >
              <Button color="primary" variant="contained" sx={{ mx: 1 }}>
                삭제하기
              </Button>
              <Button color="primary" variant="contained">
                추가하기
              </Button>
            </Box>
            <CustomerListResults customers={customerList.response} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
