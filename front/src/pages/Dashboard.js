import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress } from '@material-ui/core';
import TotalSalesAmount from 'src/components/dashboard/TotalSalesAmount';
import LatestOrders from 'src/components/dashboard/LatestOrders';
import CustomerKindsBar from 'src/components/dashboard/CustomerKindsBar';
import CustomerKindsCircle from 'src/components/dashboard/CustomerKindsCircle';
import TotalSalesVolume from 'src/components/dashboard/TotalSalesVolume';
import TotalPoints from 'src/components/dashboard/TotalPoints';
import TotalUsePoints from 'src/components/dashboard/TotalUsePoints';
import PaymentRatioBar from 'src/components/dashboard/PaymentRatioBar';
import PaymentRatioCircle from 'src/components/dashboard/PaymentRatioCircle';
import PeriodNav from 'src/components/nav/PeriodNav';
import Auth from 'src/hoc/auth';
import { isGetData } from 'src/atoms/dashboard';
import { useRecoilValue } from 'recoil';

const Dashboard = () => {
  const isGet = useRecoilValue(isGetData);
  return (
    <>
      <Helmet>
        <title>대시보드 | PointRee</title>
      </Helmet>
      <PeriodNav />
      {isGet ? (
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalSalesAmount />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalPoints />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalSalesVolume />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalUsePoints sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <PaymentRatioBar sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <PaymentRatioCircle sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <CustomerKindsCircle sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <CustomerKindsBar sx={{ height: '100%' }} />
              </Grid>

              <Grid item lg={12} md={12} xl={9} xs={12}>
                <LatestOrders />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Auth(Dashboard, ['USER', 'ADMIN']);
