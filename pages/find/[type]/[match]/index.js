import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../../../src/Link";
import {
    Container, Typography,
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody, Paper, Grid,
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
    titleBlock: {
        padding: theme.spacing(10, 0, 10),
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
        <main>
            <div className={classes.titleBlock}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                        {_id}
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth={false}>
                <TableContainer>
                    <Table stickyHeader size="small" aria-label="MAtch">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="left">Name@Realm</TableCell>
                                <TableCell align="left">Guild</TableCell>
                                <TableCell align="left">Class</TableCell>
                                <TableCell align="left">Level</TableCell>
                                <TableCell align="left">Faction</TableCell>
                                <TableCell align="left">Race</TableCell>
                                <TableCell align="left">Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {match.map(({_id, avatar, name, realm, guild, character_class, level, faction, race, gender, media}, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">{(media) ? (<img src={media.avatar_url} style={{width: 50, borderRadius: '50%'}} alt="A"/>) : ("")}</TableCell>
                                    <TableCell align="left" style={{textTransform: 'uppercase'}}>{<Link href={encodeURI(`/character/${realm.slug}/${name}`)} color="secondary" underline="hover">{_id}</Link>}</TableCell>
                                    <TableCell align="left">{(guild) ? (<Link href={encodeURI(`/guild/${realm.slug}/${guild.slug}`)} color="secondary" underline="hover">{guild.name}</Link>) : ("")}</TableCell>
                                    <TableCell align="left">{(character_class) ? (character_class) : ("")}</TableCell>
                                    <TableCell align="left">{(level) ? (level) : ("")}</TableCell>
                                    <TableCell align="left">{(faction) ? (faction) : ("")}</TableCell>
                                    <TableCell align="left">{(race) ? (race) : ("")}</TableCell>
                                    <TableCell align="left">{(gender) ? (gender) : ("")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </main>
    )
}

export async function getServerSideProps({query}) {
    const {type, match} = query;
    const res = await fetch(encodeURI(`http://${process.env.api}/find/${type}/${match}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage