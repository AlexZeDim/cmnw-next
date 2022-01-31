import React from 'react';
import '../i18n';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
import MetaHead from '../libs/components/MetaHead';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { func } from 'prop-types';

const useStyles = makeStyles(() => ({
  main: {
    marginTop: '65px',
  },
  root: {
    overflow: 'hidden',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  image: {
    margin: 'auto',
    left: '50%',
    top: '50%',
  }
}));

const LoginArea = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <main className={classes.main}>
      <MetaHead
        title={'Login Area'}
        description={'Work in progress'}
        wowhead={false}
      />
      <Container maxWidth={false} className={classes.root}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h1" component="h5" align="center" gutterBottom>
              {t('LoginAreaPage.NextThing')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Image
              src={'/static/cmnw-1.svg'}
              alt="CMNW"
              layout="intrinsic"
              className={classes.image}
              width={700}
              height={475}
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default LoginArea;
