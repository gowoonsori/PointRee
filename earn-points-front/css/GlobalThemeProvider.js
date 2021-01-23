import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const GlobalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#284D7A',
    },
    secondary: {
      main: '#20B8AA',
    },
    tertiary: {
      main: '#56F0B9',
    },
    quad: {
      main: '#E9EBED',
    },
  },
});

const GlobalThemeProvider = ({ children }) => <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>;

export default GlobalThemeProvider;
