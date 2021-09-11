import { Container, Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { CHARACTER_PAGE } from '../../libs/constants';
import { characterPortrait } from '../../libs/utils';
import MetaHead from '../../libs/components/MetaHead';
import CharacterButtons from '../../libs/components/CharacterButtons';
import CharacterProfile from '../../libs/components/CharacterProfile';
import { characterResponse, logResponse } from '../../libs/types/components';
import { domain } from '../../libs/constants';
import { LogTable } from '../../libs/components/LogTable';
import CharacterTitle from '../../libs/components/CharacterTitle';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  },
  root: {
    minHeight: '90vh',
    padding: 0,
  },
  left: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '100%',
  },
  image: {
    margin: theme.spacing(2),
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '70vh',
    borderRadius: 10,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column'
  },
}));

const Character = ({ character }) => {
  const {
    main,
    name,
    realm,
    guild,
    guild_id,
    guild_rank,
    faction,
    logs,
  } = character;

  const portrait = characterPortrait(faction, main);
  const classes = useStyles();
  const title = `CMNW: ${name.toLowerCase()}@${realm.toLowerCase()}`;

  return (
    <main className={classes.main}>
      <MetaHead
        title={title}
        description={CHARACTER_PAGE.description}
        image={portrait}
        wowhead={false}
      />
      <Container maxWidth={false} className={classes.root}>
        <Grid container>
          <Grid key={0} item xs={12} sm={12} md={4}>
            <Grid item xs={12} sm={10} className={classes.left}>
              <Paper
                elevation={6}
                className={classes.image}
                style={{backgroundImage: `url(${portrait}`}}
              />
              <CharacterTitle
                name={name}
                realm={realm}
                guild={guild}
                guild_id={guild_id}
                guild_rank={guild_rank}
                faction={faction}
              />
            </Grid>
          </Grid>
          <Grid key={1} item xs={12} sm={12} md={1}>
            <CharacterButtons name={name} realm={realm}/>
          </Grid>
          <Grid key={2} item xs={12} sm={12} md={7}>
            <div className={classes.paper} style={{alignItems: 'left'}}>
              <CharacterProfile character={character}/>
            </div>
          </Grid>
        </Grid>
        {(logs && logs.length) ? (
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} className={classes.paper}>
              <LogTable logs={logs}/>
            </Grid>
          </Grid>
        ) : ('')}
      </Container>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const [ c, l ] = await Promise.all([
    fetch(encodeURI(`${domain}/api/osint/character?_id=${id}`)),
    fetch(encodeURI(`${domain}/api/osint/character/logs?_id=${id}`))
  ]);
  const character = await c.json() as characterResponse;
  const logs = await l.json() as logResponse[];
  Object.assign(character, { logs });
  if (!character) {
    return {
      notFound: true,
    }
  }
  return {
    props: { character },
  }
}

export default Character;
