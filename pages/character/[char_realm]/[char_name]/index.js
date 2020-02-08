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

function HomePage({ name, level, realm, character_class, gender, active_spec, race, faction, guild_name, guild_id, guild_rank, average_item_level, equipped_item_level,timestamp }) {
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
                {name} @ {realm} // {level}
            </Typography>
            <Divider />
            <List className={classes.root}>
                {guild_name ? (
                    <ListItem>
                        <ListItemText primary={`${guild_name} // R${guild_rank}`} secondary={guild_id} />
                    </ListItem>
                ) : (
                    ''
                )}
                <Divider />
                <ListItem>
                    <ListItemText primary={`${race} // ${gender}`} secondary={faction} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={character_class} secondary={active_spec} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={`ilvl A:  ${average_item_level}`} secondary={`ilvl E:  ${equipped_item_level}`} />
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
                                        image="https://render-eu.worldofwarcraft.com/character/gordunni/130/196144770-main.jpg"
                                    />
                                </CardActionArea>
                            </Card>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Typography variant="caption" display="block">
                {timestamp}
            </Typography>
        </Container>
    )
}

HomePage.getInitialProps = async ({ req, query }) => {
    const res = await fetch(encodeURI(`https://eu.api.blizzard.com/profile/wow/character/${query.char_realm}/${query.char_name}?namespace=profile-eu&locale=en_GB&access_token=US5v2aRVkyudk0sFVvcn69x5QcOfJ625BS`))
    const json = await res.json();
    console.log(query);
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
    }
};

export default HomePage