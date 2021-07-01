import { itemTitle } from '../../types/components';
import React, { FC, Fragment } from 'react';
import { Avatar, Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { generateItemBackground } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    // FIXME improve style
    margin: theme.spacing(2),
    padding: theme.spacing(2, 8),
    borderRadius: 35,
  },
  itemTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: '6em',
    textAlign: 'left',
  },
  realmTitle: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    textTransform: 'uppercase',
    fontWeight: 400,
    textAlign: 'left',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  divider: {
    background: theme.palette.primary.main,
    marginBottom: '15px',
  },
}));

const ItemTitle: FC<itemTitle> = ({ itemTitle, realmTitle, quality, asset_class, icon}) => {
  const classes = useStyles();
  const background = generateItemBackground(quality, asset_class);

  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <Box alignItems="left" display="flex" justifyContent="left">
          <Avatar alt="Item Icon" variant="rounded" src={icon} className={classes.large}/>
          <Typography variant="h3" component="h3" color="textPrimary" className={classes.itemTitle}>
            {itemTitle}
          </Typography>
        </Box>
        <Divider className={classes.divider}/>
        <Typography variant="h4" component="h3" color="textPrimary" className={classes.realmTitle}>
          {realmTitle}
        </Typography>
      </div>
    </Fragment>
  )
}

export default ItemTitle;
