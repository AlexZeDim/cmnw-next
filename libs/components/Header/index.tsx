import { makeStyles } from '@material-ui/styles';
import { HEADER } from '../../constants';
import React, { useEffect, useState } from 'react';
import MenuIcon from "@material-ui/icons/Menu";
import Link from '../Link';
import { AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  element: {
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  appBar: {
    alignItems: 'center',
    position: 'relative'
  }
}));

export default function Header() {
  const classes = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const getMenuButtons = () => {
    return HEADER.map(({ label, href }, i) => {
      return (
        <Typography className={classes.element} key={i} variant="overline" color="primary" align="center" noWrap>
          <Link href={href} color="inherit" underline="none">
            {label}
          </Link>
        </Typography>
      );
    });
  };

  const getDrawerChoices = () => {
    return HEADER.map(({ label, href }, i) => {
      return (
        <MenuItem key={i}>
          <Typography variant="overline" color="primary" align="center" noWrap>
            <Link href={href} color="inherit" underline="none">
              {label}
            </Link>
          </Typography>
        </MenuItem>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.root}>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>

      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={classes.appBar} color={'transparent'}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
