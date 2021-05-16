import React, { FC, Fragment } from 'react';
import { characterTitle } from '../../types/components';
import Link from '../Link';
import { makeStyles, Typography } from '@material-ui/core';
import { generateFactionBackground } from '../../utils/generateFactionBackground';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 8),
    borderRadius: 35,
  },
  name: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: '10em',
    textAlign: 'right',
  },
  realm: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'right',
  },
  guild: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'right',
  },
}));

const CharacterTitle: FC<characterTitle> = ({ name, realm, guild, guild_id, guild_rank, faction }) => {
  const classes = useStyles();
  const background = generateFactionBackground(faction);
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <Typography variant="h4" component="h4" color="textPrimary" className={classes.realm}>
          @{realm}
        </Typography>
        {(guild && guild_id) ? (
          <Typography variant="h4" component="h4" color="textPrimary" className={classes.guild}>
            #<Link href={`/guild/${guild_id}`} color="textPrimary" underline="hover">{guild}</Link>
            {(guild_rank && typeof guild_rank === 'number') ? ((guild_rank === 0) ? (` // GM`) : (` // R${guild_rank}`)) : ('')}
          </Typography>
        ) : ('')}
        <Typography variant="h1" component="h1" color="textPrimary" className={classes.name}>
          {name}
        </Typography>
      </div>
    </Fragment>
  )
}

export default CharacterTitle;
