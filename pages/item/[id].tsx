import { domain } from '../../libs/constants/domains';
import { Container, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { generateItemTitle } from '../../libs/utils/generateItemTitle';
import ItemTitle from '../../libs/components/ItemTitle';
import ClusterChart from '../../libs/components/ClusterChart';
import ItemQuotes from '../../libs/components/ItemQuotes';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  },
  divider: {
    margin: `${theme.spacing(2)}px auto`,
  },
}));

const Item = ({ id, item, realm }) => {
  const {
    _id,
    quality,
    asset_class
  } = item;

  const classes = useStyles();
  const { itemTitle, realmTitle, is_xrs, is_gold } = generateItemTitle(item, realm);

  return (
    <main className={classes.main}>
      <MetaHead
        title={itemTitle}
        description={'Test'}
        wowhead={false}
      />
      <Container maxWidth={false}>
        <ItemTitle
          itemTitle={itemTitle}
          realmTitle={realmTitle}
          quality={quality}
          asset_class={asset_class}
        />
      </Container>
      <Divider className={classes.divider}/>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <ItemQuotes
              id={id}
              is_xrs={is_xrs}
              is_gold={is_gold}
            />
          </Grid>
        </Grid>
      </Container>
      <Divider className={classes.divider}/>
      <ClusterChart _id={id}/>
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(encodeURI(`http://localhost:8000/api/dma/item?_id=${id}`));
  const { item, realm } = await res.json();
  if (!item) {
    return {
      notFound: true,
    }
  }
  return {
    props: { id, item, realm },
  }
}

export default Item;
