import React from "react";
import fetch from 'isomorphic-unfetch'
import {Container, Grid, Divider, Typography, List, ListItem, ListItemText} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        //backgroundColor: theme.palette.background.paper,
    },
    h2: {
        marginTop: theme.spacing(2),
    },
    media: {
        height: 500,
    },
}));

function HomePage(json) {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const { char_realm, char_name } = router.query;
    return (
        <Container fixed>
            <Typography variant="h2" className={classes.h2} gutterBottom>
                {json.name.toUpperCase()} @ {json.realm.toUpperCase()} // {json.level}
            </Typography>
            <Divider />
            <List className={classes.root}>
                {json.guild ? (
                    <ListItem>
                        <ListItemText primary={`${json.guild} // R${json.guild_rank}`} secondary={json.guild} />
                    </ListItem>
                ) : (
                    ''
                )}
                <Divider />
                <ListItem>
                    <ListItemText primary={`${json.race} // ${json.gender}`} secondary={json.faction} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={json.class} secondary={json.spec} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={`ilvl A:  ${json.ilvl.avg}`} secondary={`ilvl E:  ${json.ilvl.eq}`} />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Preview" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={json.media.render_url}
                                    />
                                </CardActionArea>
                            </Card>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Typography variant="caption" display="block">
                {json.lastOnline}
            </Typography>
        </Container>
    )
}

HomePage.getInitialProps = async ({ req, query }) => {
    const {char_name, char_realm} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/characters/${(char_name)}@${char_realm}`));
    return await res.json();
    /*console.log(json);
    return {
        name: json.name,
        realm: json.realm.name,
        gender: json.gender.name,
        race: json.race.name,
        faction: json.faction.name,
        guild_name: json.guild.name,
        guild_id: json.guild.id,
        guild_rank: 1,
        level: json.level,
        character_class: json.character_class.name,
        active_spec: json.active_spec.name,
        average_item_level: json.average_item_level,
        equipped_item_level: json.equipped_item_level,
        timestamp: new Date(json.last_login_timestamp).toString()
    }*/
};

export default HomePage