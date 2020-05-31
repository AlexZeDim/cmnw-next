import React from "react";
import fetch from 'node-fetch'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Grid, Divider,
    Typography, Avatar, Button,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper, Modal,
    Backdrop, Fade
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        marginTop: theme.spacing(10),
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
        backgroundColor: 'inherit'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardTitle: {
        fontSize: '1.1em',
        fontWeight: 600
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    table: {
        minWidth: 650
    },
    guild_history: {
        marginTop: theme.spacing(4),
        maxHeight: 440,
    },
    modal: {
        margin: theme.spacing(15, 60, 30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        color: theme.palette.primary.main,
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        textTransform: 'uppercase'
    },
    large: {
        width: theme.spacing(36),
        height: theme.spacing(14),
    },
    full: {
        width: 'auto',
        height: 'auto',
    },
}));

function CharacterPage(json) {
    const {
        _id,
        ilvl,
        hash,
        media,
        logs,
        id,
        name,
        gender,
        faction,
        race,
        spec,
        character_class,
        realm,
        level,
        lastOnline,
        lastModified,
        statusCode,
        guild,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt
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
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                        {_id}
                    </Typography>
                    { (statusCode === 200) ? (
                    <span className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => Router.push(`/find/${_id}`)}>
                                    Find all
                                </Button>
                            </Grid>
                            { (guild) ? (
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => Router.push(`/guild/${realm.name}/${guild.name}`)}>
                                        Guild
                                    </Button>
                                </Grid>
                            ) : ('')}
                        </Grid>
                    </span>
                    ) : ('')
                    }
                </Container>
            </div>
            {/* End hero unit */}
            <Container className={classes.cardGrid} maxWidth="lg">
            {/* Cards */}
            { (statusCode === 200) ? (
                <Grid container spacing={4}>
                    <Grid item key={1} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Summary
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            ID: {id}
                        </Typography>
                        <Typography variant="caption" display="block">
                            LVL: {level}
                        </Typography>
                    </Grid>
                    <Grid item key={2} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            {faction}
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {gender} / {race}
                        </Typography>
                        <Typography variant="caption" display="block">
                            {character_class} / {spec}
                        </Typography>
                    </Grid>
                    { (guild) ? (
                        <Grid item key={3} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Guild
                            </Typography>
                            <Divider light />
                            <Typography variant="caption" display="block">
                                {guild.name}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Rank { (guild.rank === 0) ? ('GM') : (guild.rank)}
                            </Typography>
                        </Grid>
                        ) : ('')
                    }
                    { (ilvl) ? (
                        <Grid item key={4} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                ilvl
                            </Typography>
                            <Divider light />
                            {Object.keys(ilvl).map((key, index) => (
                                <Typography variant="caption" display="block">
                                    {`${key[0]}: ${ilvl[key]}`}
                                </Typography>
                            ))}
                        </Grid>
                    ) : ('')
                    }
                    { (hash) ? (
                        <Grid item key={5} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Hash
                            </Typography>
                            <Divider light />
                            {Object.keys(hash).map((key, index) => (
                                <Typography variant="caption" display="block">
                                    {`${key}: ${hash[key]}`}
                                </Typography>
                            ))}
                        </Grid>
                    ) : ('')
                    }
                    <Grid item key={6} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            {updatedBy || 'OSINT-indexCharacters'}
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            C: {new Date(createdAt).toLocaleString('en-GB')}
                        </Typography>
                        <Typography variant="caption" display="block">
                            U: {new Date(updatedAt).toLocaleString('en-GB')}
                        </Typography>
                    </Grid>
                    <Grid item key={7} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Timestamp
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {new Date(lastModified).toLocaleString('en-GB')}
                        </Typography>
                        <Typography variant="caption" display="block">
                            {new Date(lastOnline).toLocaleString('en-GB')}
                        </Typography>
                    </Grid>
                    { (media) ? (
                        <Grid item key={8} xs={12} sm={6} md={3}>
                            <Avatar variant="rounded" alt={_id} src={media.bust_url} className={classes.large} onClick={handleOpen}/>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                            <Fade in={open}>
                                <Avatar variant="rounded" alt={_id} src={media.render_url} className={classes.full}/>
                            </Fade>
                            </Modal>
                        </Grid>
                    ) : ('')
                    }
                </Grid>
            ) : (
                <Grid item key={9} xs={12} sm={6} md={3}>
                    <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                        {updatedBy}
                    </Typography>
                    <Divider light />
                    <Typography variant="caption" display="block">
                        C: {new Date(createdAt).toLocaleString('en-GB')}
                    </Typography>
                    <Typography variant="caption" display="block">
                        U: {new Date(updatedAt).toLocaleString('en-GB')}
                    </Typography>
                </Grid>
                )
            }
            {/* End Cards */}
            { (logs && logs.length > 0) ? (
                <TableContainer className={classes.guild_history} component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Message</TableCell>
                                <TableCell align="center">After</TableCell>
                                <TableCell align="center">Before</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map(({message, after, before}) => (
                                <TableRow key={message}>
                                    <TableCell component="th" scope="row" align="center">
                                        {message}
                                    </TableCell>
                                    <TableCell align="center">{new Date(after).toLocaleString('en-GB')}</TableCell>
                                    <TableCell align="center">{new Date(before).toLocaleString('en-GB')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : ('')
            }
            </Container>
        </main>
    )
}

export async function getServerSideProps({query}) {
    console.log(query);
    const {realmSlug, nameSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(nameSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage