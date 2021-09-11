import React, { FC, Fragment } from 'react';
import { characterTitle } from '../../types/components';
import Link from '../Link';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { generateFactionBackground } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: '1080px',
    borderRadius: '15px',
    position: 'relative',
  },
  title: {
    color: 'white',
    padding: '1rem',
    border: 'solid 5px white',
  },
  divider: {
    background: theme.palette.primary.main
  },
  name: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: '4em',
    textAlign: 'left',
  },
  realm: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontSize: '2em',
    fontWeight: 400,
    textAlign: 'left',
  },
  guild: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontSize: '2em',
    fontWeight: 400,
    textAlign: 'left',
  },
}));

const CharacterTitle: FC<characterTitle> = ({ name, realm, guild, guild_id, guild_rank, faction }) => {
  const classes = useStyles();
  const background = generateFactionBackground(faction);
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <div className={classes.title} style={background}>
          <Typography variant="h1" component="h1" color="textPrimary" className={classes.name}>
            {name}
          </Typography>
          {(guild && guild_id) ? (
            <Typography variant="h4" component="h4" color="textPrimary" className={classes.guild}>
              #<Link href={`/guild/${guild_id}`} color="textPrimary" underline="hover">{guild}</Link>
              {(guild_rank && typeof guild_rank === 'number') ? ((guild_rank === 0) ? (` // GM`) : (` // R${guild_rank}`)) : ('')}
            </Typography>
          ) : ('')}
          <Divider className={classes.divider}/>
          <Typography variant="h4" component="h4" color="textPrimary" className={classes.realm}>
            @{realm}
          </Typography>
        </div>
      </div>
    </Fragment>
  )
}

export default CharacterTitle;
