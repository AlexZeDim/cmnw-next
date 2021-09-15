import React, { FC, Fragment } from 'react';
import { Avatar, Box, Divider, makeStyles, Typography } from '@material-ui/core';
import { itemTitle } from '../../types/components';
import { generateItemBackground } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: '15px',
    position: 'relative',
  },
  title: {
    color: 'white',
    padding: '2rem',
    border: 'solid 15px',
  },
  item: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: 'clamp(1.3rem, -2.7500rem + 16.6667vw, 6rem)',
    textAlign: 'left',
    overflowWrap: 'break-word',
  },
  realm: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'left',
    fontSize: 'clamp(1.3rem, -2.7500rem + 16.6667vw, 3rem)',
    overflowWrap: 'break-word',
  },
  large: {
    maxWidth: theme.spacing(7),
    maxHeight: theme.spacing(7),
    marginRight: theme.spacing(2),
  },
  divider: {
    background: theme.palette.primary.main,
    marginBottom: '15px',
  },
}));

const ItemTitle: FC<itemTitle> = ({ itemTitle, realmTitle, quality, asset_class, icon}) => {
  const classes = useStyles();
  const background = generateItemBackground({ quality, asset_class });
  const test = generateItemBackground({ asset_class });
  const borderColor = { borderColor: test.backgroundColor };
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <div className={classes.title} style={{ ...background, ...borderColor}}>
          <Box alignItems="center" display="flex" justifyContent="left">
            <Avatar alt="Item Icon" variant="rounded" src={icon} className={classes.large}/>
            <Typography variant="h1" component="h1" color="textPrimary" className={classes.item}>
              {itemTitle}
            </Typography>
          </Box>
          <Divider className={classes.divider}/>
          <Typography variant="h4" component="h3" color="textPrimary" className={classes.realm}>
            {realmTitle}
          </Typography>
        </div>
      </div>
    </Fragment>
  )
}

export default ItemTitle;
