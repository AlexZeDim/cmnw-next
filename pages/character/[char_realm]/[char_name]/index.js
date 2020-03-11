import React from "react";
import fetch from 'node-fetch'
import {Container, Grid, Divider, Typography, List, ListItem, ListItemText} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

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
}));

function CharacterPage({json}) {
    const classes = useStyles();
    const router = useRouter();
    const { char_realm, char_name } = router.query;
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <style jsx>{`
                    div {
                      background-image:  url(${json.media.render_url});
                      background-attachment: fixed;
                      background-position: -25% 50%;
                    }
                  `}</style>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                           {json._id}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            {json.level} // {json.id}
                        </Typography>
                        <span className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </span>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        { (json.guild) ? (
                            <Grid item key={1} xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {json.guild}
                                        </Typography>
                                        <Divider light />
                                        <Typography>
                                            Rank: {json.guild_rank}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            ) : ('')
                        }
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        ilvl
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        A: {json.ilvl.eq}
                                    </Typography>
                                    <Typography>
                                        E: {json.ilvl.avg}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Checksum
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        {json.checksum.pets}
                                    </Typography>
                                    <Typography>
                                        {json.checksum.mounts}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {json.updatedBy}
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        C: {new Date(json.createdAt).toLocaleString('en-GB')}
                                    </Typography>
                                    <Typography>
                                        U: {new Date(json.updatedAt).toLocaleString('en-GB')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {json.faction}
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        {json.gender} / {json.race}
                                    </Typography>
                                    <Typography>
                                        {json.class} / {json.spec}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Timestamps
                                    </Typography>
                                    <Divider light />
                                    <Typography>
                                        {new Date(json.lastModified).toLocaleString('en-GB')}
                                    </Typography>
                                    <Typography>
                                        {new Date(json.lastOnline).toLocaleString('en-GB')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={json.media.bust_url}
                                    title="Paella dish"
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {char_name, char_realm} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(char_name)}@${char_realm}`));
    const json = await res.json();
    return { props: {json} }
}

export default CharacterPage