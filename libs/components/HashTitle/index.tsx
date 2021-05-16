import React, { FC, Fragment, useState } from 'react';
import { hashTitle } from '../../types/components/hashTitle';
import { Divider, makeStyles, Popover, Typography } from '@material-ui/core';
import { generateFactionBackground } from '../../utils/generateFactionBackground';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10),
    padding: theme.spacing(6, 8),
    backgroundImage:`url(https://i.imgur.com/o5eTd5L.png)`, // FIXME
    backgroundSize: 'cover',
    borderRadius: 35,
  },
  hash: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: '6em',
    textAlign: 'left',
  },
  type: {
    fontFamily: 'Fira Sans',
    fontWeight: 400,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  divider: {
    background: theme.palette.primary.main
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    color: '#f5f2f2',
  },
}));

const HashTitle: FC<hashTitle> = ({ id }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const [type, query] = id.split('@');
  const hash = query.replace(/(.{4})/g, '$1 ');

  const handleClick = async (textBuffer: string, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      await navigator.clipboard.writeText(textBuffer);
      setCopyStatus(`Hash ${id} has been coped!`);
      setAnchorEl(event.target);
    } catch (err) {
      setCopyStatus('Failed to copy!');
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pid = open ? 'text-buffer' : undefined;

  const classes = useStyles();
  const background = generateFactionBackground();
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <Typography
          onClick={(e) => handleClick(id, e)}
          onMouseLeave={handlePopoverClose}
          variant="h3"
          component="h3"
          color="textPrimary"
          className={classes.hash}
        >
          {hash}
        </Typography>
        <Popover
          id={pid}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>{copyStatus}</Typography>
        </Popover>
        <Divider className={classes.divider}/>
        <Typography variant="h4" component="h4" color="textPrimary" className={classes.type}>
          Type: {type}
        </Typography>
      </div>
    </Fragment>
  )
}

export default HashTitle;
