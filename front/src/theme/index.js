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
    second: {
      main: '#a2d5f2'
    },
    point: {
      main: '#ff7e67'
    },
    secondBase: {
      main: '#f3f5f72e'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
