import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../../../src/Link";
import {
    Container, Typography,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper, Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    table: {
        minWidth: 650,
    },
    title: {
        color: theme.palette.background.paper,
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        textTransform: 'uppercase'
    },
    findAllResult: {
        marginTop: theme.spacing(0),
    },
    modal: {
        margin: theme.spacing(30, 60, 30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function CharacterPage({ _id, match }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                            {_id}
                        </Typography>
                    </Container>
                </div>
                {/* End hero unit */}
                <Container className={classes.cardGrid} maxWidth={false}>
                </Container>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {type, match} = query;
    const res = await fetch(encodeURI(`http://${process.env.api}/find/${type}/${match}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage