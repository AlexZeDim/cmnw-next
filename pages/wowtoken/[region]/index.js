import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../../src/Link";
import Clock from "../../../src/Clock";
import {
    Container, Grid,
    Typography, Divider,
    Avatar, Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 400,
        maxHeight: '760px',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    divider: {
        margin: `${theme.spacing(2)}px auto`,
    },
    title: {
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
    },
    container: {
        maxHeight: 'auto',
        margin: `auto ${theme.spacing(1)}px`,
    },
    cardTitle: {
        fontSize: '1.1em',
        fontWeight: 600
    },
    chip: {
        margin: theme.spacing(1)
    },
    titleBlock: {
        padding: theme.spacing(10, 0, 10),
    },
    totalRow: {
        backgroundColor: '#ebe7ee',
    }
}));


const WoWToken = ({_id, price, lastModified}) => {

    const classes = useStyles();

    return (
        <Container maxWidth={false} alignContent="center">
            {/** TITLE BLOCK */}
            <Container maxWidth={false} className={classes.titleBlock}>
                <Grid container direction="column" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box alignItems="center" display="flex" justifyContent="center">
                            <Avatar alt="Item Icon" variant="rounded" src={`https://render-eu.worldofwarcraft.com/icons/56/wow_token01.jpg`} className={classes.large} />
                            <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
                                WoW Token
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        {(lastModified) ? (
                            <Clock time={lastModified}/>
                        ) : ('')}
                    </Grid>
                </Grid>
            </Container>

            {/** CARD BLOCK */}
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item key={1} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Summary
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            ID: 122284
                        </Typography>
                        <Typography variant="caption" display="block">
                            Name: WoWToken
                        </Typography>
                    </Grid>
                    <Grid item key={2} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Price
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {price.toLocaleString('ru-RU')}
                        </Typography>
                        <Typography variant="caption" display="block">
                            {new Date(lastModified).toLocaleString('en-GB')}
                        </Typography>
                    </Grid>
                    <Grid item key={3} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            RUB Value
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            Pay 1 400 RUB
                        </Typography>
                        <Typography variant="caption" display="block">
                            Receive 550 RUB
                        </Typography>
                    </Grid>
                    <Grid item key={4} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            GOLD/RUB
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            Buy {parseFloat((1400/(price/1000)).toFixed(2))} RUB
                        </Typography>
                        <Typography variant="caption" display="block">
                            Sell {parseFloat((550/(price/1000)).toFixed(2))} RUB
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
};


export async function getServerSideProps({query}) {
    const { region } = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/wowtoken/${region}`));
    const json = await res.json();
    return { props: json}
}


export default WoWToken