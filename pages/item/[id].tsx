import { domain } from '../../libs/constants';
import { Container, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { generateItemTitle } from '../../libs/utils';
import ItemTitle from '../../libs/components/ItemTitle';
import ClusterChart from '../../libs/components/ClusterChart';
import ItemQuotes from '../../libs/components/ItemQuotes';
import ItemListing from '../../libs/components/ItemListing';
import ItemValuations from '../../libs/components/ItemValuations';

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
    quality,
    asset_class,
    icon
  } = item;

  const classes = useStyles();
  const {
    itemTitle,
    realmTitle,
    is_xrs,
    is_gold,
    is_commdty,
  } = generateItemTitle(item, realm);

  return (
    <main className={classes.main}>
      <MetaHead
        title={itemTitle}
        description={'Test'}
        wowhead={true}
      />
      <Container maxWidth={false}>
        <ItemTitle
          itemTitle={itemTitle}
          realmTitle={realmTitle}
          quality={quality}
          asset_class={asset_class}
          icon={icon}
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
              is_commdty={is_commdty}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <ItemValuations
              id={id}
            />
          </Grid>
        </Grid>
      </Container>
      <Divider className={classes.divider}/>
      <Container maxWidth={false}>
        <ClusterChart
          id={id}
          is_xrs={is_xrs}
          is_gold={is_gold}
          is_commdty={is_commdty}
        />
      </Container>
      <Container maxWidth={false}>
        <ItemListing
          id={id}
          name={itemTitle}
          is_xrs={is_xrs}
          is_gold={is_gold}
          is_commdty={is_commdty}
        />
      </Container>

    </main>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(encodeURI(`${domain}/api/dma/item?_id=${id}`));
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
