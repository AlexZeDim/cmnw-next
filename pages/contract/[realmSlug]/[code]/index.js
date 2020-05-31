import React from "react";
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import Clock from "../../../../src/Clock";
import {
    Container, Grid,
    Typography, Divider,
    Card, CardContent,
    Avatar, Table,
    TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Paper, Box, Button
} from '@material-ui/core';

if (typeof Highcharts === 'object') {
    HC_heatmap(Highcharts);
    HighchartsExporting(Highcharts)
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
        margin: `${theme.spacing(1)}px auto`,
        padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
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
    table: {
        minWidth: 300
    },
    title: {
        fontSize: 14,
    },
    pos: {
        margin: theme.spacing(2),
    },
    en_title: {
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    container: {
        maxHeight: 500,
    },
    cardTitle: {
        fontSize: '0.9em',
        fontWeight: 600
    },
}));

const Contract = ({_id, code, realmName, open_interest, price, price_size, quantity, risk, sellers, orders, type, createdAt, data, updatedAt}) => {
    const classes = useStyles();
    let tableSet = new Set();
    data.map(({orders}) => {if (orders) orders.map(({id}) => tableSet.add(id))});
    const chartOptions = {
        chart: {
            type: 'line',
            marginTop: 40,
            marginBottom: 120,
            height: (9 / 16 * 50) + '%',
            backgroundColor: 'transparent',
        },
        title: {
            text: ''
        },
        series: [{
            data: data.map(({price}) => price),
        }],
        xAxis: {
            categories: data.map(({_id}) => (`${new Date(_id).toLocaleString('en-GB')} || ${new Date(_id).getDate()} `))
        },
    };
    return (
        <Container maxWidth={false}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs>
                    <Typography variant="h2" className={classes.en_title} style={{textTransform: 'uppercase'}}>
                        {code}@{realmName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs>
                <Clock time={updatedAt}/>
            </Grid>
            <Grid container spacing={1} className={classes.paper}>
                <Grid item xs={3}>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="Price">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(price).map(([key, value],i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {key.replace(/_/g, ' ')}
                                        </TableCell>
                                        <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="Quantity">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(quantity).map(([key, value],i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {key.replace(/_/g, ' ')}
                                        </TableCell>
                                        <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={3}>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="PriceSize">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Price Size</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(price_size).map(([key, value],i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {key.replace(/_/g, ' ')}
                                        </TableCell>
                                        <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="OI">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Open Interest</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(open_interest).map(([key, value],i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {key.replace(/_/g, ' ')}
                                        </TableCell>
                                        <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={3}>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="OrdersSellers">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{(tableSet.size > 0) ? ('Orders') : ('Sellers')}</TableCell>
                                </TableRow>
                            </TableHead>
                            {(tableSet.size > 0) ? (
                                <TableBody>
                                    {Object.entries(orders).map(([key, value],i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {key.replace(/_/g, ' ')}
                                            </TableCell>
                                            <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {Object.entries(sellers).map(([key, value],i) => (
                                        (key !== 'sellers') ? (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">
                                                    {key.replace(/_/g, ' ')}
                                                </TableCell>
                                                <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                            </TableRow>
                                        ) : ('')
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={3}>
                    <TableContainer container spacing={1} className={classes.paper}>
                        <Table className={classes.table} size="small" aria-label="Risk">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Risk</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(risk).map(([key, value],i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {key.replace(/_/g, ' ')}
                                        </TableCell>
                                        <TableCell align="right">{value.toLocaleString('ru-RU')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer container spacing={1} className={classes.paper} style={{maxHeight: 250}}>
                        <Table stickyHeader className={classes.table} size="small" aria-label="TableO&S">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{(tableSet.size > 0) ? ('Order Log') : ('Sellers Log')}</TableCell>
                                </TableRow>
                            </TableHead>
                            {(tableSet.size > 0) ? (
                                <TableBody>
                                    {Array.from(tableSet).map((value, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {sellers.sellers.map((value, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Divider className={classes.pos} />
            <Grid container>
                <Grid item xs={12}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
                </Grid>
            </Grid>
            <Divider className={classes.pos} />
        </Container>
    )
};

export async function getServerSideProps({query}) {
    const {realmSlug, code} = query;
    const res = await fetch(encodeURI(`http://${process.env.api}/contracts/${code}@${realmSlug}`));
    const json = await res.json();
    return { props: json}
}

export default Contract