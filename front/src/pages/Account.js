import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import Auth from 'src/hoc/auth';

const Account = () => (
  <>
    <Helmet>
      <meta
        name="description"
        content="별도의 앱 설치 없이 웹을 통해 간편하게 포인트적립서비스를 제공하는 pointRee의 내정보 페이지입니다."
      />
      <title>내 정보 | Point Ree</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Auth(Account, ['USER', 'ADMIN']);
