import React, { FC } from 'react';
import { contributionStar } from '../../types/components';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  star: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: 'auto',
    display: 'block'
  },
  card: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: 250,
    border: 'none',
    boxShadow: 'none',
    textAlign: 'center',
  },
  title: {
    textTransform: 'uppercase',
  },
}));

const ContributionStar: FC<contributionStar> = ({ character, name, discord, github, twitter}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <StarBorderIcon
          className={classes.star}
          color="secondary"
        />
        <Typography variant="overline" align="center" className={classes.title} gutterBottom>
          {name}
        </Typography>

        {(twitter) ? (
          <React.Fragment>
            <br/>
            <Typography variant="overline" align="center" className={classes.title}>
              <Link href={`https://www.twitter.com/${twitter}`} prefetch={false}>{twitter}</Link>
            </Typography>
          </React.Fragment>
        ) : (<></>)}

        {(character) ? (
          <React.Fragment>
            <br/>
            <Typography variant="overline" align="center" className={classes.title}>
              <Link href={`/character/${character}`}>{character}</Link>
            </Typography>
          </React.Fragment>
        ) : (<></>)}

        {(discord) ? (
          <React.Fragment>
            <br/>
            <Typography variant="overline" align="center" className={classes.title}>
              {discord}
            </Typography>
          </React.Fragment>
        ) : (<></>)}

        {(github) ? (
          <React.Fragment>
            <br/>
            <Typography variant="overline" align="center" className={classes.title}>
              <Link href={`https://www.github.com/${github}`} prefetch={false}>{github}</Link>
            </Typography>
          </React.Fragment>
        ) : (<></>)}

      </CardContent>
    </Card>
  )
}

export default ContributionStar;
