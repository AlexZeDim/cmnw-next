import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Link from "../src/Link";

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
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const ListItemLink = props => <ListItem button component="a" {...props} />;

function SignInSide({media}) {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={5} md={5} className={classes.image} style={{backgroundImage: `url(${media.render_url})`}}/>
            <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Grid>
                        <Typography variant="h1" component="h2" gutterBottom>
                            h1. Heading
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        </Typography>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemText primary={`Twitter:`}/><Link href={`/`} color="inherit" underline="none">TEST</Link>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Discord:" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="BNet:" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Main Character:" />
                            </ListItem>
                        </List>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={12} sm={7} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Grid container>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={false} sm={5} md={5} className={classes.image} />
        </Grid>
    );
}

export async function getServerSideProps() {
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/инициатива@gordunni`));
    //const res1 = await fetch(encodeURI(`http://localhost:3030/api/characters/блюрателла@gordunni`));
    //console.log(res,res1)
    const json = await res.json();
    return { props: json }
}

export default SignInSide