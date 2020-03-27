import React from "react";
import fetch from 'node-fetch'
import {Container, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
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
    findAllResult: {
        marginTop: theme.spacing(4),
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

function CharacterPage(json) {
    const {
        _id,
        match
    } = json;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {_id}
                        </Typography>
                    </Container>
                </div>
                {/* End hero unit */}
                <Container className={classes.cardGrid} maxWidth="lg">
                    { (match && match.length > 0) ? (
                        <TableContainer className={classes.findAllResult} component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Realm</TableCell>
                                        <TableCell align="center">Hash A</TableCell>
                                        <TableCell align="center">Hash B</TableCell>
                                        <TableCell align="center">Guild</TableCell>
                                        <TableCell align="center">Rank</TableCell>
                                        <TableCell align="center">Class</TableCell>
                                        <TableCell align="center">Faction</TableCell>
                                        <TableCell align="center">Race</TableCell>
                                        <TableCell align="center">Gender</TableCell>
                                        <TableCell align="center">Last Online</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {match.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.realm}</TableCell>
                                            <TableCell align="left">{row.checksum.pets}</TableCell>
                                            <TableCell align="left">{row.checksum.mounts}</TableCell>
                                            <TableCell align="left">{row.guild}</TableCell>
                                            <TableCell align="left">{row.guild_rank}</TableCell>
                                            <TableCell align="left">{row.class}</TableCell>
                                            <TableCell align="left">{row.faction}</TableCell>
                                            <TableCell align="left">{row.race}</TableCell>
                                            <TableCell align="left">{row.gender}</TableCell>
                                            <TableCell align="left">{new Date(row.lastOnline).toLocaleString('en-GB')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : ('')
                    }
                </Container>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {queryFind} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/findAll/${queryFind}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage