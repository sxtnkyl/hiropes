import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    // mode: 'dark',
    // primary: {
    //   main: '#06baec',
    //   dark: 'red',
    //   contrastText: '#fafafa',
    // },
    // secondary: {
    //   main: '#f1da00',
    //   contrastText: '#1e3156',
    // },
    // background: {
    //   default: '#06baec',
    //   paper: '#06baec',
    // },
    // text: {
    //   primary: '#1e3156',
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          'html, body': {
            minHeight: '100vh',
          },
          '#__next': {
            height: '100vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            'div:not([class])': {
              all: 'inherit',
              main: {
                flex: '1',
                padding: '3rem 1rem',
              },
            },
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
