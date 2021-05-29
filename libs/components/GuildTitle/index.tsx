import React, { FC, Fragment } from 'react';
import { guildTitle } from '../../types/components';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { generateFactionBackground } from '../../utils';

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
    fontSize: '6em',
    textAlign: 'left',
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
  },
  guild: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textAlign: 'left',
  },
}));

const GuildTitle: FC<guildTitle> = ({ name, realm, member_count, created_timestamp, achievement_points, faction }) => {
  const classes = useStyles();
  const background = generateFactionBackground(faction);
  return (
    <Fragment>
      <div className={classes.root} style={background}>
        <Typography variant="h3" component="h3" color="textPrimary" className={classes.name}>
          #{name}
        </Typography>
        <Divider className={classes.divider}/>
        <Typography variant="h4" component="h4" color="textPrimary" className={classes.realm}>
          @{realm}
        </Typography>
        <Typography variant="overline">
          Created: {new Date(created_timestamp).toLocaleString('en-GB')} Members: {member_count} Achievements: {achievement_points}
        </Typography>
      </div>
    </Fragment>
  )
}

export default GuildTitle;
