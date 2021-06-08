import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fafafa',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#eeeeee',
      main: '#07689f'
    },
    secondary: {
      main: '#a2d5f2'
    },
    pointColor: {
      main: '#ff7e67'
    },
    secondBase: {
      main: '#f3f5f72e'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      ternary: '#fafafa'
    }
  },
  shadows,
  typography
});

export default theme;
