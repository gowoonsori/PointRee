import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { customers } from 'src/reducers/customers';

const CustomerList = () => {
  const customerDatas = useRecoilValue(customers);
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
            <CustomerListResults customers={customerDatas} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
