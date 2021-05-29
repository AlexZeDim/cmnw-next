import { itemTitle } from '../../types/components';
import React, { FC, Fragment } from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { generateItemBackground } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
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
    fontWeight: 400,
    textAlign: 'left',
  },
  divider: {
    background: theme.palette.primary.main
  },
}));

const ItemTitle: FC<itemTitle> = ({ itemTitle, realmTitle, quality, asset_class}) => {
  const classes = useStyles();
  const background = generateItemBackground(quality, asset_class);

  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <Typography variant="h3" component="h3" color="textPrimary" className={classes.itemTitle}>
          {itemTitle}
        </Typography>
        <Divider className={classes.divider}/>
        <Typography variant="h4" component="h4" color="textPrimary" className={classes.realmTitle}>
          Realms: {realmTitle}
        </Typography>
      </div>
    </Fragment>
  )
}

export default ItemTitle;
