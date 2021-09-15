import React, { FC, Fragment } from 'react';
import { guildTitle } from '../../types/components';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { generateFactionBackground } from '../../utils';

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
    border: 'solid 15px white',
  },
  name: {
    fontFamily: 'Fira Sans',
    fontWeight: 900,
    fontSize: 'clamp(1.3rem, -2.7500rem + 16.6667vw, 6rem)',
    textTransform: 'uppercase',
    textAlign: 'left',
    overflowWrap: 'break-word',
  },
  divider: {
    background: theme.palette.primary.main
  },
  realm: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'left',
    fontSize: 'clamp(1.3rem, -2.7500rem + 16.6667vw, 4rem)',
    overflowWrap: 'break-word',
  },
  guild: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'left',
    overflowWrap: 'break-word',
  },
}));

const GuildTitle: FC<guildTitle> = ({ name, realm, member_count, created_timestamp, achievement_points, faction }) => {
  const classes = useStyles();
  const background = generateFactionBackground(faction);
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <div className={classes.title} style={background}>
          <Typography variant="h1" component="h1" color="textPrimary" className={classes.name}>
            #{name}
          </Typography>
          <Divider className={classes.divider}/>
          <Typography variant="overline" color="textPrimary">
            Created: {new Date(created_timestamp).toLocaleString('en-GB')} | Members: {member_count} | Achievements: {achievement_points}
          </Typography>
          <Typography variant="h4" component="h4" color="textPrimary" className={classes.realm}>
            @{realm}
          </Typography>
        </div>
      </div>
    </Fragment>
  )
}

export default GuildTitle;
