import  { useRouter } from 'next/router'
import React, { FC, Fragment } from 'react';
import { COMMANDS, REALMS, HASH } from '../../constants';
import AtSign from '../AtSign';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { Commands, initialValuesSearch, searchValidation } from '../../types';
import { initialValues } from '../../utils';
import { Formik, Form } from 'formik';
import { SearchInput } from '../../types/data/searchInput';
import { TextField, Autocomplete, Button, Grid, Box, MenuItem } from '@mui/material';

const styleCss = {
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
    justifyContent: 'center',
  }
}

export const SearchForm: FC = () => {
  const router = useRouter();

  return (
    <div>
      <Formik<initialValuesSearch>
        initialValues={initialValues()}
        validationSchema={searchValidation}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={5} alignItems={'center'} justifyContent={"center"}>
                <Grid item xs={12} md={3}>
                  <TextField
                    id="command"
                    select
                    name="command"
                    label="Command"
                    fullWidth
                    value={values.command}
                    onChange={handleChange}
                    sx={styleCss.item}
                  >
                    {COMMANDS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {values.command === Commands.characters && (
                  <Fragment>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="character"
                        name="character"
                        label="Character"
                        variant="outlined"
                        value={values.character}
                        onChange={handleChange}
                        sx={styleCss.item}
                      />
                    </Grid>
                    <AtSign/>
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        id="realm"
                        options={REALMS}
                        autoHighlight
                        value={values.realm}
                        isOptionEqualToValue={(option, value) => String(option.value) === String(value.value)}
                        getOptionLabel={(option: SearchInput) => option.label}
                        sx={styleCss.item}
                        renderInput={(params) => <TextField {...params} label="Realm" />}
                      />
                    </Grid>
                  </Fragment>
                )}
                {values.command === Commands.guilds && (
                  <Fragment>
                    <Grid item xs={12} md={3}>
                      <TextField
                        id="guild"
                        name="guild"
                        label="Guild"
                        variant="outlined"
                        value={values.guild}
                        onChange={handleChange}
                        sx={styleCss.item}
                      />
                    </Grid>
                    <AtSign/>
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        id="realm"
                        options={REALMS}
                        autoHighlight
                        value={values.realm}
                        isOptionEqualToValue={(option, value) => String(option.value) === String(value.value)}
                        getOptionLabel={(option: SearchInput) => option.label}
                        sx={styleCss.item}
                        renderInput={(params) => <TextField {...params} label="Realm" />}
                      />
                    </Grid>
                  </Fragment>
                )}
                {values.command === Commands.hash && (
                  <Fragment></Fragment>
                )}
                {values.command === Commands.commdty && (
                  <Fragment></Fragment>
                )}
                {values.command === Commands.gold && (
                  <Fragment></Fragment>
                )}
                <Grid item xs={12} md={1}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    disabled={isSubmitting}
                    type="submit"
                    sx={styleCss.button}
                  >
                    <ArrowForwardOutlinedIcon/>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}
