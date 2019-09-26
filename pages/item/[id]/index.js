import { useRouter } from 'next/router'
import { Container, Table, TableBody, TableCell, TableRow, Paper, Grid, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import fetch from 'isomorphic-unfetch'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(2),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    card: {
        minWidth: 275,
        margin: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function createData(name, calories) {
    return { name, calories};
}

const rows = [
    createData('Ticker', 305),
    createData('Type', 356),
    createData('Asset Class', 159),
    createData('Expansion', 356),
    createData('Stack Size', 'x237'),
    createData('Vendor Price', 262),
    {'name': 'trtr', 'calories':3423}
];

const Item = ({ name }) => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;
    const { asset_class, ticker } = {'asset_class':'COMMDTY', 'ticker':'ZNTD'};

    const test = {
        'min': 1,
        'min_size': 2,
        'avg': 3,
        'max': 4,
        'max_size': 5,
        'oi': 3543,
        'quantity': 3453,
        'cp': 6
    };

    return (
        <Container fixed>
            <Typography variant="overline" display="block">
                {asset_class}:{ticker}
            </Typography>
            <Typography variant="h2" gutterBottom>
                h5. {name} {id}
            </Typography>
            <Typography variant="caption" display="block">
                timestamp
            </Typography>
            <Divider />
                <Grid container spacing={1}>
                    {Object.keys(test).map(card => (
                        <Grid item key={card} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {card}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {test[card]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            <Divider />
            <Divider />
            <Grid item xs={3}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Table className={classes.table} size="small">
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </Grid>
        </Container>
    )
};

Item.getInitialProps = async ({ req }) => {
    const res = await fetch(`https://directmarketaccess.ru/api/items/168487`);
    const json = await res.json();
    return { name: json.name };
};

export default Item