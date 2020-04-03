import React from "react";
import fetch from 'node-fetch'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {
    Container, Typography,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper, Button
} from "@material-ui/core";

const ButtonLink = ({ className, href, hrefAs, children }) => (
    <Link href={href} as={hrefAs}>
        <a className={className}>
            {children}
        </a>
    </Link>
);

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundImage: `url(${require(`../../../src/img/N${~~(Math.random() * 2) + 1}.jpg`)})`,
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

function CharacterPage(json) {
    const {
        _id,
        match
    } = json;
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
                <Container className={classes.cardGrid} maxWidth="false">
                    { (match && match.length > 0) ? (
                        <TableContainer className={classes.findAllResult} component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="center">NAME</TableCell>
                                        <TableCell align="center">REALM</TableCell>
                                        <TableCell align="center">HASH A</TableCell>
                                        <TableCell align="center">HASH B</TableCell>
                                        <TableCell align="center">GUILD</TableCell>
                                        <TableCell align="center">RANK</TableCell>
                                        <TableCell align="center">LEVEL</TableCell>
                                        <TableCell align="center">CLASS</TableCell>
                                        <TableCell align="center">FACTION</TableCell>
                                        <TableCell align="center">RACE</TableCell>
                                        <TableCell align="center">GENDER</TableCell>
                                        <TableCell align="center">LAST ONLINE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {match.map(({id, name, realm, checksum, guild, guild_rank, faction, race, character_class, gender, level, lastOnline}) => (
                                        <TableRow key={id}>
                                            <TableCell component="th" scope="row">
                                                {id}
                                            </TableCell>
                                            <TableCell align="left"><Button component={ButtonLink} href={`/character/${realm}/${name}`} color={'primary'}>{name}</Button></TableCell>
                                            <TableCell align="center">{realm}</TableCell>
                                            <TableCell align="center">{checksum.pets}</TableCell>
                                            <TableCell align="center">{checksum.mounts}</TableCell>
                                            <TableCell align="left"><Button component={ButtonLink} href={`/guild/${realm}/${guild}`} color={'primary'}>{guild}</Button></TableCell>
                                            <TableCell align="center">{(guild_rank === 99) ? ('') : ((guild_rank === 0) ? ('GM') : (guild_rank))}</TableCell>
                                            <TableCell align="center">{level}</TableCell>
                                            <TableCell align="left">{character_class}</TableCell>
                                            <TableCell align="center">{faction}</TableCell>
                                            <TableCell align="left">{race}</TableCell>
                                            <TableCell align="center">{gender}</TableCell>
                                            <TableCell align="left">{new Date(lastOnline).toLocaleString('en-GB')}</TableCell>
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