import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { characterButtons } from '../../types/components';
import React, { FC, Fragment } from 'react';
import Link from '../Link';
import { battlenet, check_pvp, raiderio, warcraftlogs, wowprogress } from '../../constants/domains';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2)
  },
  wp: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),
    color: '#fff',
    backgroundColor: '#313131',
  },
  v_large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(1),
  },
  pvp: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),
    color: '#80c7f6',
    backgroundColor: '#8a0d0d',
  },
}));

const CharacterButtons: FC<characterButtons> = ({ name, realm }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Link href={`${warcraftlogs}/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="WarcraftLogs" src="https://assets.rpglogs.com/img/warcraft/favicon.png?v=2" className={classes.large}/>
        </Link>
        <Link href={`${raiderio}/characters/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="RaiderIO" src="https://cdnassets.raider.io/images/brand/Icon_FullColor.png" className={classes.large}/>
        </Link>
        <Link href={`${wowprogress}/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="WoWProgress" className={classes.wp}>WP</Avatar>
        </Link>
        <Link href={`${battlenet}en-gb/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="BattleNet" src="./public/wow.svg" className={classes.v_large}/>
        </Link>
        <Link href={`${check_pvp}/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="Check PvP" className={classes.pvp}>
            PvP
          </Avatar>
        </Link>
      </Grid>
    </Fragment>
  )
};

export default CharacterButtons;
