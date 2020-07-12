import React from "react";
import { Formik } from 'formik';
import Router from 'next/router'
import Link from './../src/Link'
import {
    Container, Grid,
    MenuItem, TextField, makeStyles,
    FormHelperText, Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: '93vh',
    },
    searchField: {
        margin: theme.spacing(2, 0, 2),
    },
    searchbar: {
        marginRight: "auto",
        marginLeft: "auto",
    },
    search: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dropdown: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
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

function Index ({realms}) {
    const classes = useStyles();
    const greetings = [
        'Viam supervadet vadens',
        'Something from nothing',
        'bb theunderminejournal',
        'goodbye TUJ',
        'you did nothing',
        'RIP wowtoken',
    ];
    return (
        <Container direction="column" justify="center" alignItems="center" className={classes.root}>
            <Typography variant="h1" align="center" style={{textTransform: 'uppercase'}}>
                {greetings[Math.floor(Math.random() * greetings.length)]}
            </Typography>
            <Container className={classes.searchbar}>
                <Formik
                    initialValues={{ command: 'item', arguments: 'Инициатива', realm: 'gordunni'}}
                    onSubmit={async (values, { setSubmitting }) => {
                        const [argOne, argTwo] = values.arguments.split("@")
                        await setSubmitting(false);
                        await Router.push(`/${values.command}/${argTwo}/${argOne}`);
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
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item xs={3}>
                                <TextField
                                    name="command"
                                    select
                                    label="Select command"
                                    className={classes.dropdown}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.command}
                                    variant="outlined"
                                >
                                    {commands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {values.command === "item" && (
                                <React.Fragment>
                                    <Grid item xs={3}>
                                        <TextField
                                            type="text"
                                            name="arguments"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.arguments}
                                            fullWidth id="outlined-basic"
                                            label="Character's Name"
                                            className={classes.search}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="h3" align="center" style={{textTransform: 'uppercase', margin: '0'}}>
                                            @
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            name="realm"
                                            select
                                            label="Select realm"
                                            className={classes.dropdown}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.realm}
                                            variant="outlined"
                                        >
                                            {realms.map((option) => (
                                                <MenuItem key={option.slug} value={option.slug}>
                                                    {option.name_locale}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                    </form>
                )}
                </Formik>
            </Container>
        </Container>
    )
}

export async function getServerSideProps() {
    const res = await fetch(encodeURI(`http://localhost:3030/api/realms/ru_RU`));
    const json = await res.json();
    return { props: {realms: json}}
}

export default Index