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
        margin: theme.spacing(6, 0, 6),
    },
    searchbar: {
        marginRight: "auto",
        marginLeft: "auto",
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
    const greetings = [
        'Viam supervadet vadens',
        'Something from nothing',
        'bb theunderminejournal',
        'goodbye TUJ',
        'you did nothing',
        'RIP wowtoken',
    ];
    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
            <Typography variant="h1" align="center" style={{textTransform: 'uppercase'}}>
                {greetings[Math.floor(Math.random() * greetings.length)]}
            </Typography>
            <Container className={classes.searchbar} maxWidth="lg" alignContent="center">
                <Formik
                    initialValues={{ command: 'item', arguments: ''}}
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
                        <TextField
                            type="text"
                            name="arguments"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.arguments}
                            fullWidth id="outlined-basic"
                            label="Input Search Query"
                            className={classes.search}
                            helperText={<FormHelperText>Select command and input your query. More info <Link href={`/help`} color="secondary" underline="hover">@HELP</Link></FormHelperText>}
                        />
                    </form>
                )}
                </Formik>
            </Container>
        </Grid>
    )
}

export default Index