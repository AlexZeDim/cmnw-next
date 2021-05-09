import { createMuiTheme } from '@material-ui/core/styles';
import { randomInt } from '../utils/randomInt';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#242424',
      light: '#ebe7ee',
      dark: '#89858c',
    },
    secondary: {
      main: '#241c18',
      light: '#4c433e',
      dark: '#000000',
    },
    error: {
      main: '#960000',
    },
    warning: {
      main: '#c1aa82',
    },
  },
  typography: {
    caption: {
      fontSize: '0.9rem',
      textTransform: 'uppercase'
    }
  },
  overrides: {
    MuiTableHead: {
      root: {
        textTransform: 'uppercase'
      },
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(/bg${randomInt(0,5)}.png)`,
          backgroundSize: 'cover'
        }
      }
    }
  },
});
