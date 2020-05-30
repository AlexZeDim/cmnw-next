import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from "../src/Link";
import { palette } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    root: {

    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column'
    }
}));

const ListItemLink = props => <ListItem button component="a" {...props} />;

export default function SignInSide() {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={5} md={5} className={classes.image} style={{backgroundImage: `url(https://render-eu.worldofwarcraft.com/character/gordunni/38/188747814-main.jpg)`}}/>
            <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper} style={{alignItems: 'left'}}>
                    <Grid>
                        <Typography variant="h1" component="h2" gutterBottom>
                            Initiative
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            I started to play this game since WotLK release (ru_RU). My very first character was a druid on a god-forgotten realm like Ashenvale.
                            Then I created this rogue, that outlived all inactive periods and deletion. I have been played on EU-Outland during WoD, and pre-LGN.
                            Some moment after I was invited to russian #2 PvE guild: <Link href={`/guild/soulflayer/фьюжн`} color="secondary" underline="hover">Фьюжн@Свежеватель-Душ</Link> (<Link href="https://www.wowprogress.com/pve/ru/rating.tier19" prefetch={false} color="primary" underline="hover">WoWProgress</Link>) as a treasurer.
                            Thanks to <Link href={`/character/gordunni/йошх`} color="secondary" underline="hover">Йош</Link> (founder of RU druid-class discord) and <Link href={`/character/gordunni/лапочка`} color="secondary" underline="hover">Лапочка</Link> (<Link href="https://www.twitch.tv/holy_moley" prefetch={false} color="primary" underline="hover">HolyMoley</Link>, co-founder of RU Pala Discord).
                            As for now, I represent <Link href={`/guild/gordunni/депортация`} color="secondary" underline="hover">Депортация@Гордунни</Link> as Head of Treasury.
                        </Typography>
                        <Divider />
                        <List component="nav" aria-label="initiative">
                            <ListItemLink href="/character/gordunni/инициатива">
                                <ListItemText primary="Main Character: инициатива@гордунни" />
                            </ListItemLink>
                            <ListItemLink href="https://twitter.com/alexzedim2812">
                                <ListItemText primary="Twitter: @alexzedim2812" />
                            </ListItemLink>
                            <ListItem>
                                <ListItemText primary="Discord: AlexZeDim#2645" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="BNet: AlexZeDim#2812" />
                            </ListItem>
                        </List>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper} style={{alignItems: 'right'}}>
                    <Grid>
                        <Typography variant="h1" component="h2" gutterBottom>
                            Bluratella
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            «Всё что вам надо знать о ней: она как я, только женщина»<br />
                            <br />
                            Playing World of Mountcraft since Cataclysm. Author of various algo patterns across many functions inside Conglomerat. Been here all along. Remembers OSINT as VOLUSPA...
                        </Typography>
                        <Divider />
                        <List component="nav" aria-label="initiative">
                            <ListItemLink href="/character/gordunni/блюрателла">
                                <ListItemText primary="Main Character: блюрателла@гордунни" />
                            </ListItemLink>
                            <ListItem>
                                <ListItemText primary="Someother" />
                            </ListItem>
                        </List>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={false} sm={5} md={5} className={classes.image} style={{backgroundImage: `url(https://render-eu.worldofwarcraft.com/character/gordunni/117/188608885-main.jpg)`}} />
        </Grid>
    );
}