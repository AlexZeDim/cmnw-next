import React from "react";
import fetch from 'node-fetch'
import {Container, Grid, Divider, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import image from '../../../../src/img/a.jpg';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundImage: `url(${image})`,
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
        color: theme.palette.background.paper,
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400
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
        checksum,
        media,
        guild_history,
        id,
        //name,
        gender,
        faction,
        race,
        spec,
        //realm,
        //realm_slug,
        level,
        lastOnline,
        lastModified,
        statusCode,
        guild,
        guild_rank,
        //createdBy,
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
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                            {_id.toUpperCase()}
                        </Typography>
                        { (statusCode === 200) ? (
                        <span className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Find all
                                    </Button>
                                </Grid>
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
                        <Grid item key={2} xs={12} sm={6} md={3}>
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
                                {json.class} / {spec}
                            </Typography>
                        </Grid>
                        { (guild) ? (
                            <Grid item key={1} xs={12} sm={6} md={3}>
                                <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                    Guild
                                </Typography>
                                <Divider light />
                                <Typography variant="caption" display="block">
                                    {guild}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Rank: { (guild_rank === 0) ? ('GM') : ({guild_rank})}
                                </Typography>
                            </Grid>
                            ) : ('')
                        }
                        { (ilvl) ? (
                            <Grid item key={2} xs={12} sm={6} md={3}>
                                <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                    ilvl
                                </Typography>
                                <Divider light />
                                <Typography variant="caption" display="block">
                                    A: {ilvl.eq}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    E: {ilvl.avg}
                                </Typography>
                            </Grid>
                        ) : ('')
                        }
                        { (checksum) ? (
                            <Grid item key={2} xs={12} sm={6} md={3}>
                                <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                    Hash
                                </Typography>
                                <Divider light />
                                { (checksum.pets) ? (
                                    <Typography variant="caption" display="block">
                                        A: {checksum.pets}
                                    </Typography>
                                ) : ('')}
                                { (checksum.mounts) ? (
                                    <Typography variant="caption" display="block">
                                        B: {checksum.mounts}
                                    </Typography>
                                ) : ('')}
                            </Grid>
                        ) : ('')
                        }
                        <Grid item key={2} xs={12} sm={6} md={3}>
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
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Timestamps
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
                            <Grid item key={2} xs={12} sm={6} md={3}>
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
                                        <div className={classes.paper}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Preview
                                            </Typography>
                                            <Avatar variant="rounded" alt={_id} src={media.render_url} className={classes.full}/>
                                        </div>
                                    </Fade>
                                </Modal>
                            </Grid>
                        ) : ('')
                        }
                    </Grid>
                ) : (
                    <Grid item key={2} xs={12} sm={6} md={3}>
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
                { (guild_history && guild_history.length > 0) ? (
                    <TableContainer className={classes.guild_history} component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">NAME</TableCell>
                                    <TableCell align="right">RANK</TableCell>
                                    <TableCell align="right">ACTION</TableCell>
                                    <TableCell align="right">DATE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {guild_history.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{ (row.rank === 0) ? ('GM') : (row.rank)} </TableCell>
                                        <TableCell align="right">{row.action}</TableCell>
                                        <TableCell align="right">{new Date(row.date).toLocaleString('en-GB')}</TableCell>
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
    const {realmSlug, nameSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(nameSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage