import React from 'react';
import { Container, Divider, makeStyles } from '@material-ui/core';
import MetaHead from '../../libs/components/MetaHead';
import { GUILD_PAGE } from '../../libs/constants/pages';
import { domain } from '../../libs/constants/domains';
import { guildResponse, logResponse } from '../../libs/types/components';
import { LogTable } from '../../libs/components/LogTable';
import GuildTitle from '../../libs/components/GuildTitle';
import CharacterTable from '../../libs/components/CharacterTable';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  },
  divider: {
    margin: `${theme.spacing(2)}px auto`,
  },
  left: {
    paddingLeft: theme.spacing(3),
  },
  title: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textTransform: 'uppercase'
  }
}));

const Guild = ({ guild }) => {
  const {
    name,
    realm,
    members,
    faction,
    created_timestamp,
    achievement_points,
    member_count,
    logs,
  } = guild;

  const classes = useStyles();
  return (
    <main className={classes.main}>
      <MetaHead
        title={`${name}@${realm}`}
        description={GUILD_PAGE.description}
        wowhead={false}
      />
      <Container maxWidth={false}>
        <GuildTitle
          name={name}
          realm={realm}
          member_count={member_count}
          created_timestamp={created_timestamp}
          achievement_points={achievement_points}
          faction={faction}
        />
      </Container>
      <Divider className={classes.divider}/>
      <Container maxWidth={false}>
        <CharacterTable characters={members} roster={true}/>
        <Divider className={classes.divider}/>
        <LogTable logs={logs}/>
      </Container>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const [ g, l ] = await Promise.all([
    fetch(encodeURI(`${domain}/api/osint/guild?_id=${id}`)),
    fetch(encodeURI(`${domain}/api/osint/guild/logs?_id=${id}`))
  ]);
  const guild = await g.json() as guildResponse;
  const logs = await l.json() as logResponse[];
  Object.assign(guild, { logs });
  if (!guild) {
    return {
      notFound: true,
    }
  }
  return { props: { guild } }
}

export default Guild;
