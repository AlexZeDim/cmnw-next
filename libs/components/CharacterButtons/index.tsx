import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { characterButtons } from '../../types/components';
import React, { FC, Fragment } from 'react';
import Link from '../Link';
import { battlenet, check_pvp, raiderio, warcraftlogs, wowprogress } from '../../constants';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2)
  }
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
          <Avatar variant="square" alt="WarcraftLogs" src={'/wcl.svg'} className={classes.large}/>
        </Link>
        <Link href={`${raiderio}/characters/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="RaiderIO" src={'/rio.svg'} className={classes.large}/>
        </Link>
        <Link href={`${wowprogress}/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="WoWProgress" src={'/wp.svg'} className={classes.large} />
        </Link>
        <Link href={`${battlenet}/en-gb/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="BattleNet" src={'/armory.svg'} className={classes.large}/>
        </Link>
        <Link href={`${check_pvp}/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="Check PvP" src={'/check_pvp.svg'} className={classes.large} />
        </Link>
      </Grid>
    </Fragment>
  )
};

export default CharacterButtons;
