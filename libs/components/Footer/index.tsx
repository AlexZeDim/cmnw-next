import React, { FC } from 'react';
import { AppBar, Container, Divider, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    top: 'auto',
    bottom: 0,
  }
}));

const Footer: FC = () => {
  const classes = useStyles();
  const year = new Date().getFullYear();
  return (
    <AppBar  id="footer-bar" className={classes.root} position="relative" color={'transparent'}>
      <Container maxWidth="md">
        <Toolbar>
          <Divider variant="middle" />
          <Typography variant="overline" color="inherit">
            &copy; {year} Commonwealth | We don't use cookies or track your behavior
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Footer;
