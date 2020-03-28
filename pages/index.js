import React from "react";
import { Formik } from 'formik';
import fetch from 'node-fetch'
import Router from 'next/router'
import {Container, Grid, Divider, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    searchField: {
        margin: theme.spacing(6, 0, 6),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

function Index () {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <span className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Find all
                                    </Button>
                                </Grid>
                            </Grid>
                        </span>
                    </Container>
                </div>
                {/* End hero unit */}
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Formik
                        initialValues={{ searchQuery: ''}}
                        onSubmit={async (values, { setSubmitting }) => {
                            setTimeout(() => {
                                Router.push(`/character/gordunni/${values.searchQuery}`);
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          /* and other goodies */
                      }) => (
                        <form className={classes.searchField} onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                type="text"
                                name="searchQuery"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.searchQuery}
                                fullWidth id="outlined-basic"
                                label="Input Search Query"
                                variant="outlined" />
                            {errors.searchQuery && touched.searchQuery && errors.searchQuery}
                        </form>
                    )}
                    </Formik>
                </Container>
            </main>
        </React.Fragment>
    )
}

/*export async function getServerSideProps({query}) {
    const {realmSlug, nameSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(nameSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json }
}*/

export default Index