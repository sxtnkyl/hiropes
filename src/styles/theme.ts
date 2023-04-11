import { createTheme, responsiveFontSizes } from '@mui/material';
import { red } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: '#06baec',
      dark: '#1e3156',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#f1da00',
      contrastText: '#1e3156',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#06baec',
      paper: '#06baec',
    },
    text: {
      primary: '#1e3156',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
