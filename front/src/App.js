import 'react-perfect-scrollbar/dist/css/styles.css';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, CircularProgress } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import AlertCard from 'src/components/alert/AlertCard';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<CircularProgress />}>
          {routing}
          <AlertCard />
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
