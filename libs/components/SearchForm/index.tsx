import { object, string, mixed } from 'yup';
import Router from 'next/router'
import MuiTextField from '@material-ui/core/TextField';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import React, { FC } from 'react';
import { Button, Grid, makeStyles, MenuItem } from '@material-ui/core';
import { OSINT } from '../../constants/osint';
import AtSign from '../AtSign/AtSign';
import { REALMS } from '../../constants/realms';
import { HASH } from '../../constants/hash';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { initialValuesSearch } from '../../types/components';
import { Commands, HashType } from '../../types/enums';
import { submitSearchForm } from '../../utils/submitSearchForm';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '20em',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const validation = object().shape({
  character: string()
    .min(3, 'Between 3 and 13 symbols!')
    .max(13, 'Between 3 and 13 symbols!')
    .required('Required'),
  guild: string()
    .min(3, 'Between 3 and 25 symbols!')
    .max(25, 'Between 3 and 25 symbols!')
    .required('Required'),
  hash: string()
    .min(13, 'Between 14 and 20 symbols!')
    .max(20, 'Between 14 and 20 symbols!')
    .required('Required'),
  realm: mixed().required('Required')
});

const initialValues: initialValuesSearch = {
  command: 'character',
  realm: { label: 'Гордунни', value: 'gordunni' },
  character: 'Блюрателла',
  guild: 'Депортация',
  type: HashType.A,
  hash: 'A99BECEC48B29FF',
  id: '0'
}

export const SearchForm: FC = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(false);
        const route = submitSearchForm(values);
        Router.push(route);
      }}
    >
      {({ values, touched, errors}) => (
        <Form>
          <Grid container spacing={5} alignItems={'center'} justify={"center"}>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <Field
                  component={TextField}
                  type="text"
                  name="command"
                  label="Command"
                  select
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {OSINT.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </div>
            </Grid>
            {values.command === Commands.characters && (
              <React.Fragment>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      component={TextField}
                      name="character"
                      type="text"
                      label="Character"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </Grid>
                <AtSign/>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      name="realm"
                      fullWidth
                      component={Autocomplete}
                      options={REALMS}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={touched['realm'] && !!errors['realm']}
                          label="Realm"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Grid>
              </React.Fragment>
            )}
            {values.command === Commands.guilds && (
              <React.Fragment>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      component={TextField}
                      name="guild"
                      type="text"
                      label="Guild"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </Grid>
                <AtSign/>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      name="realm"
                      component={Autocomplete}
                      fullWidth
                      options={REALMS}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          error={touched['realm'] && !!errors['realm']}
                          label="Realm"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Grid>
              </React.Fragment>
            )}
            {values.command === Commands.hash && (
              <React.Fragment>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="type"
                      label="Type"
                      select
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {HASH.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                </Grid>
                <AtSign/>
                <Grid item xs={12} md={3}>
                  <div className={classes.item}>
                    <Field
                      component={TextField}
                      name="hash"
                      type="text"
                      label="Hash"
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={12} md={1}>
              <div className={classes.button}>
                <Button type="submit" variant="outlined" color="secondary" size="large">
                  <ArrowForwardOutlinedIcon/>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
