import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { CharacterTable } from '../../libs/components/CharacterTable';
import { domain } from '../../libs/constants/domains';
import { characterResponse } from '../../libs/types/components';
import { HASH_PAGE } from '../../libs/constants/pages';
import HashTitle from '../../libs/components/HashTitle';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  }
}));

const Hash = ({ hash, id }) => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <MetaHead
        title={id}
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
  const res = await fetch(encodeURI(`${domain}/api/osint/character/hash?hash=${id}`));
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
