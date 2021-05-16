import React from 'react';
import MetaHead from '../libs/components/MetaHead';
import { WHO_WE_ARE } from '../libs/constants/pages';
import { Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { CONTRIBUTORS } from '../libs/constants/contributors';
import ContributionStar from '../libs/components/ContributionStar';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '65px',
  },
  memory: {
    margin: theme.spacing(4),
    textTransform: 'uppercase',
  }
}));

const WhoWeAre = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <MetaHead
        title={'The Conglomerat'}
        description={WHO_WE_ARE.description}
        wowhead={false}/>
      <Container maxWidth={false}>
        <Divider/>
        <Typography variant="h2" component="h1" align="center" className={classes.memory} gutterBottom>
          The Conglomerat
        </Typography>
        <Divider/>
        <Grid container>
          {CONTRIBUTORS.map((contributor, i) => (
            <Grid item xs={2} key={i}>
              <ContributionStar
                character={contributor.character}
                name={contributor.name}
                discord={contributor.discord}
                twitter={contributor.twitter}
                github={contributor.github}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}

export default WhoWeAre;
