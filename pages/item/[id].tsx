import { domain } from '../../libs/constants/domains';
import { Container, Divider, makeStyles } from '@material-ui/core';
import React from 'react';
import MetaHead from '../../libs/components/MetaHead';
import { generateItemTitle } from '../../libs/utils/generateItemTitle';
import ItemTitle from '../../libs/components/ItemTitle';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '85px',
  },
  divider: {
    margin: `${theme.spacing(2)}px auto`,
  },
}));

const Item = ({ item, realm }) => {
  const {
    quality,
    asset_class
  } = item;

  const classes = useStyles();
  const { itemTitle, realmTitle } = generateItemTitle(item, realm);

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
    props: { item, realm },
  }
}

export default Item;
