import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { RecoilRoot } from 'recoil';
import GlobalThemeProvider from '../css/GlobalThemeProvider';
import AppLayout from '../components/AppLayout';

const PointsWeb = ({ Component }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>포인트 적립</title>
      </Head>
      <GlobalThemeProvider>
        <AppLayout>
          <Component />
        </AppLayout>
      </GlobalThemeProvider>
    </RecoilRoot>
  );
};

PointsWeb.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default PointsWeb;
