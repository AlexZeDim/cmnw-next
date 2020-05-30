import React from "react";
import { Formik } from 'formik';
import fetch from 'node-fetch'
import Router from 'next/router'
import {Container, Grid, Divider, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        height: '93vh',
    },
    searchField: {
        margin: theme.spacing(6, 0, 6),
    },
    search: {
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
        height: '100%'
    },
}));

function Index () {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <Container className={classes.search} maxWidth="lg">
                <Formik
                    initialValues={{ searchQuery: ''}}
                    onSubmit={async (values, { setSubmitting }) => {
                        const [command, query] = values.searchQuery.split(/[ ]+/);
                        await setSubmitting(false);
                        if (['CHAR', 'C'].includes(command.toUpperCase())) {
                            let [nameSlug, realmSlug] = query.split('@');
                            await Router.push(`/character/${realmSlug}/${nameSlug}`);
                        } else if (['ALTS', 'ALT', 'A'].includes(command.toUpperCase())) {
                            await Router.push(`/find/${query}`);
                        } else if (['GUILD', 'G'].includes(command.toUpperCase())) {
                            let [guildSlug, realmSlug] = query.split('@');
                            await Router.push(`/guild/${realmSlug}/${guildSlug}`);
                        } else if (['MARKET', 'M'].includes(command.toUpperCase())) {
                            let [itemSlug, realmSlug] = query.split('@');
                            await Router.push(`/item/${realmSlug}/${itemSlug}`);
                        } else if (['HELP', 'H'].includes(command.toUpperCase())) {
                            await Router.push(`/help`);
                        } else if (['CONTRACT', 'CON'].includes(command.toUpperCase())) {
                            let [codeSlug, realmSlug] = query.split('@');
                            await Router.push(`/contract/${realmSlug}/${codeSlug}`);
                        }
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
        </Grid>
    )
}

/*export async function getServerSideProps({query}) {
    const {realmSlug, nameSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(nameSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json }
}*/

export default Index