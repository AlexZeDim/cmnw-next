import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { Container, makeStyles } from '@material-ui/core';
import { DOMAINS, HASH_PAGE } from '../../libs/constants';
import { characterResponse } from '../../libs/types/components';
import HashTitle from '../../libs/components/HashTitle';
import CharacterTable from '../../libs/components/CharacterTable';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  }
}));

const Hash = ({ hash, id }) => {
  const classes = useStyles();
  const title = id.toString().toUpperCase();
  return (
    <main className={classes.main}>
      <MetaHead
        title={title}
        description={HASH_PAGE.description}
        wowhead={false}
      />
      <Container maxWidth={false}>
        <HashTitle id={id}/>
      </Container>
      <Container maxWidth={false}>
        <CharacterTable characters={hash} roster={false}/>
      </Container>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(encodeURI(`${DOMAINS.domain}/api/osint/character/hash?hash=${id}`));
  const hash = await res.json() as characterResponse[];
  if (!hash || !hash.length) {
    return {
      notFound: true,
    }
  }
  return {
    props: { hash, id },
  }
}

export default Hash;
