import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { CharacterTable } from '../../libs/components/CharacterTable';
import { domain } from '../../libs/constants/domains';
import { characterResponse } from '../../libs/types/components';
import { HASH_PAGE } from '../../libs/constants/pages';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '65px',
  },
  divider: {
    margin: `${theme.spacing(2)}px auto`,
  },
  titleBlock: {
    padding: theme.spacing(10, 0, 5),
  },
  title: {
    fontFamily: 'Fira Sans',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    textTransform: 'uppercase'
  },
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
      <div className={classes.titleBlock}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h2" align="center" color="secondary" className={classes.title} gutterBottom>
            {id}
          </Typography>
        </Container>
      </div>
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
