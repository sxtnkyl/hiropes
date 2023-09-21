import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const defaultPaperBg = '#f9fcff';
const amplifyButtonOverride = {
  backgroundColor: defaultPaperBg,
  borderRadius: '4px',
  margin: '0.25rem 0.5rem',
};

const amplifyAuthOverrides = {
  'div[data-amplify-container]': {
    width: '100%',
    height: '100%',
    'div[data-amplify-router]': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      'div[data-orientation="horizontal"]': {
        height: 'auto',
        alignItems: 'center',
        'div[role="tablist"]': {
          height: 'auto',
          padding: '1rem',
          '.amplify-flex': {
            button: {
              ...amplifyButtonOverride,
            },
          },
        },
        'div[role="tabpanel"] div form': {
          width: '80%',
          fieldset: {
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0',
            border: 'none',
            backgroundColor: defaultPaperBg,
            borderRadius: '4px',
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            'span legend': { margin: '0.5rem 0', fontSize: '2rem' },
            '.amplify-textfield': {
              padding: '0.5rem 0',
              label: { fontWeight: 'bold' },
            },
            '.amplify-passwordfield': {
              label: { fontWeight: 'bold' },
              padding: '0.5rem 0',
              'div .amplify-field-group__outer-end': {
                margin: '0.5rem 0',
                button: {
                  backgroundColor: defaultPaperBg,
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  '.amplify-icon': {
                    height: 'auto !important',
                    width: 'auto !important',
                    display: 'flex',
                    marginLeft: '0.25rem',
                  },
                },
              },
            },
            '.amplify-phonenumberfield': {
              'div .amplify-field-group__outer-start div .amplify-select__wrapper .amplify-select__icon-wrapper':
                {
                  height: '0',
                },
            },
          },
          'button[type="submit"]': {
            ...amplifyButtonOverride,
            marginTop: '1rem',
          },
        },
        '[data-amplify-footer]': {
          button: {
            ...amplifyButtonOverride,
            marginTop: '1rem',
          },
        },
      },
    },
  },
};

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#364c56',
      },
      secondary: {
        main: '#FFC400',
      },
      background: {
        default: '#78909C',
        paper: defaultPaperBg,
      },
      text: {
        primary: '#004339',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            'html, body': {
              height: '100dvh',
            },
            '#__next': {
              height: '100dvh',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              main: {
                flex: '1',
                padding: '3rem 1rem',
                height: 0,
              },
              'div:not([class])': {
                all: 'inherit',
              },
              ...amplifyAuthOverrides,
            },
          },
        },
      },
    },
  })
);

export default theme;
