import React from "react";
import { Formik } from 'formik';
import fetch from 'node-fetch'
import Router from 'next/router'
import {Container, Grid, Divider, Typography, Select, MenuItem } from "@material-ui/core";
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
    searchbar: {
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "20%"
    },
    search: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100ch',
    },
    dropdown: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

const commands = [
    {
        value: 'character',
        label: 'CHAR',
    },
    {
        value: 'guild',
        label: 'GUILD',
    },
    {
        value: 'contract',
        label: 'CONTRACT',
    },
    {
        value: 'find',
        label: 'FIND',
    },
    {
        value: 'item',
        label: 'ITEM',
    },
];

function Index () {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <Container className={classes.searchbar} maxWidth="lg">
                <Formik
                    initialValues={{ command: 'item', arguments: ''}}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values)
                        await setSubmitting(false);
/*                        if (['CHAR', 'C'].includes(command.toUpperCase())) {
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
                        }*/
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
                            name="command"
                            select
                            label="Select"
                            className={classes.dropdown}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.command}
                            helperText="Please select your currency"
                        >
                            {commands.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            type="text"
                            name="arguments"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.arguments}
                            fullWidth id="outlined-basic"
                            label="Input Search Query"
                            className={classes.search}
                            variant="outlined" />
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