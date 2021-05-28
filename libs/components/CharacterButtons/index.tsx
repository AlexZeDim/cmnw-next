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
          <Avatar variant="square" alt="WarcraftLogs" src={'https://i.imgur.com/TUNIb4o.png'} className={classes.large}/>
        </Link>
        <Link href={`${raiderio}/characters/eu/${realm}/${name}`} prefetch={false}>
          <Avatar variant="square" alt="RaiderIO" src={'https://i.imgur.com/lUkiZfy.png'} className={classes.large}/>
        </Link>
        <Link href={`${wowprogress}/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="WoWProgress" src={'https://i.imgur.com/zqecypv.png'} className={classes.large} />
        </Link>
        <Link href={`${battlenet}/en-gb/character/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="BattleNet" src={'https://i.imgur.com/AuXAi2j.png'} className={classes.large}/>
        </Link>
        <Link href={`${check_pvp}/eu/${realm}/${name}`} prefetch={false}>
          <Avatar alt="Check PvP" src={'https://i.imgur.com/2CZslR2.png'} className={classes.large} />
        </Link>
      </Grid>
    </Fragment>
  )
};

export default CharacterButtons;
