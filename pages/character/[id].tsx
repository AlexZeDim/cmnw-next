import { Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { CHARACTER_PAGE } from '../../libs/constants/pages';
import { characterPortrait } from '../../libs/utils/characterPortrait';
import Link from '../../libs/components/Link';
import MetaHead from '../../libs/components/MetaHead';
import CharacterButtons from '../../libs/components/CharacterButtons';
import CharacterProfile from '../../libs/components/CharacterProfile';
import { characterResponse, logResponse } from '../../libs/types/components';
import { domain } from '../../libs/constants/domains';
import { LogTable } from '../../libs/components/LogTable';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '65px',
  },
  root: {
    minHeight: '93vh',
    padding: 0,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '93vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column'
  },
  hr: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textTransform: 'uppercase'
  }
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

  return (
    <main className={classes.main}>
      <MetaHead
        title={`${name}@${realm}`}
        description={CHARACTER_PAGE.description}
        image={portrait}
        wowhead={false}
      />
      <Container maxWidth={false} className={classes.root}>
        <Grid container>
          <Grid key={0} item xs={12} sm={5} md={5} className={classes.image} style={{backgroundImage: `url(${portrait}`}}/>
          <Grid key={1} item xs={12} sm={7} md={7}>
            <div className={classes.paper} style={{alignItems: 'left'}}>
              <Grid>
                <Typography variant="h3" component="h3" color="textPrimary" className={classes.title}>
                  {name}
                </Typography>
                {(guild && guild_id) ? (
                  <Typography variant="h4" component="h4" color="textPrimary" className={classes.title}>
                    #<Link href={`/guild/${guild_id}`} color="textPrimary" underline="hover">{guild}</Link>
                    {(guild_rank && typeof guild_rank === 'number') ? ((guild_rank === 0) ? (` // GM`) : (` // R${guild_rank}`)) : ('')}
                  </Typography>
                ) : ('')}
                <Typography variant="h4" component="h4" color="textPrimary" className={classes.title}>
                  @{realm}
                </Typography>
                <CharacterButtons name={name} realm={realm}/>
              </Grid>
              <Divider light className={classes.hr}/>
              <CharacterProfile character={character}/>
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} className={classes.paper}>
            <LogTable logs={logs}/>
          </Grid>
        </Grid>
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
