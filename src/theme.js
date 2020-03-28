import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#eee',
    },
  },
  typography: {
    caption: {
      fontSize: '0.9rem',
      textTransform: 'uppercase'
    }
  }
});

export default theme;
