import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import Clock from "../../../../src/Clock";
import Link from "../../../../src/Link";
import {
    Container, Grid, Chip,
    Typography, Divider,
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody
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
        minWidth: 300,
        textTransform: 'uppercase'
    },
    divider: {
        margin: theme.spacing(2),
    },
    title: {
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
    titleBlock: {
        padding: theme.spacing(10, 0, 10),
    },
}));

const Contract = ({_id, code, item_id, realm, open_interest, price, price_size, quantity, risk, sellers, orders, type, createdAt, data, updatedAt}) => {
    const classes = useStyles();
    let tableSet = new Set();

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).replace (/_/g, " ");
    }

    let chartOptions = {};
    if (type === "D") {
        data.map(({orders}) => {if (orders) orders.map(({id}) => tableSet.add(id))})
        chartOptions = {
            chart: {
                type: 'line',
                marginTop: 40,
                marginBottom: 120,
                height: (9 / 16 * 50) + '%',
                backgroundColor: 'transparent',
            },
            yAxis: [
                {
                    labels: {
                        format: '{value}g',
                    },
                    title: {
                        text: 'Price',
                    }
                },
                {
                    title: {
                        text: 'Quantity',
                    },
                    labels: {
                        format: 'x{value}',
                    },
                    opposite: true
                },
                {
                    title: {
                        text: 'Open Interest',
                    },
                    labels: {
                        format: '{value} g',
                    },
                    opposite: true
                }
            ],
            title: {
                text: ''
            },
            series: [
                { name: 'Open Interest', type: 'column', data: data.map(({open_interest}) => open_interest), yAxis: 2, opacity: 0.75, color: '#89858c' },
                { name: 'Quantity', type: 'column', data: data.map(({quantity}) => quantity), yAxis: 1, opacity: 0.75, color: '#c1aa82' },
                { name: 'Price', data: data.map(({price}) => price), color: '#241c18' }
            ],
            xAxis: {
                categories: data.map(({_id}) => (`${new Date(_id).toLocaleString('en-GB')}`))
            },
        };
    } else {
        data.forEach((day_week) => Object.keys(day_week).map(key => {
            if (key === 'price' || key === 'quantity' || key === 'open_interest' || key === 'orders') {
                chartOptions[key] = {
                    chart: {
                        type: 'line',
                        marginTop: 40,
                        marginBottom: 120,
                        height: (9 / 16 * 50) + '%',
                        backgroundColor: 'transparent',
                    },
                    yAxis: [
                        {
                            labels: {
                                format: '{value}',
                            },
                            title: {
                                text: key.capitalize(),
                            }
                        },
                        {
                            title: {
                                text: 'Change',
                            },
                            labels: {
                                format: '{value} %',
                            },
                            opposite: true
                        }
                    ],
                    title: {
                        text: ''
                    },
                    series: [
                        { name: `${key.capitalize()} Low`, data: data.map((t) => t[key].low), color: '#241c18' },
                        { name: `${key.capitalize()} High`, data: data.map((t) => t[key].high), color: '#241c18' },
                        { name: `${key.capitalize()} Change`, type: 'column', data: data.map((t) => parseFloat(((t[key].change/t[key].close)*100).toFixed(2))), yAxis: 1, opacity: 0.75, color: '#c1aa82' },
                    ],
                    xAxis: {
                        categories: data.map(({_id}) => (`${new Date(_id).toLocaleDateString('en-GB')}`))
                    },
                }
            }
        }))
    }

    return (
        <Container maxWidth={false}>
            <Container maxWidth={false} className={classes.titleBlock}>
                <Grid container direction="column" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item xs>
                        {(realm.ticker) ? (
                            <Typography variant="h2" className={classes.title} style={{textTransform: 'uppercase'}}>
                                {code}@{realm.ticker}
                            </Typography>
                        ) : (
                            <Typography variant="h2" className={classes.title} style={{textTransform: 'uppercase'}}>
                                {code}@{realm.name}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs>
                        <Clock time={updatedAt}/>
                    </Grid>
                    <Grid item xs>
                        <Chip clickable color="default" variant="default" className={classes.chip} label={<Link href={`/item/${realm.connected_realm_id}/${item_id}`} color="inherit" underline="none">UNDERLYING ASSET</Link>}/>
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={1}>
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
                                        <TableCell align="right">{Math.round(value).toLocaleString('ru-RU')}</TableCell>
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
                                    <TableCell>{(orders) ? ('Orders') : ('Sellers')}</TableCell>
                                </TableRow>
                            </TableHead>
                            {(orders) ? (
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
                                    <TableCell>{(orders) ? ('Order Log') : ('Sellers Log')}</TableCell>
                                </TableRow>
                            </TableHead>
                            {(orders) ? (
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
                                                {value}f
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {(type === 'D') ? (
                <Grid container>
                    <Divider className={classes.divider} />
                    <Grid item xs={12}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    {Object.keys(chartOptions).map(key => (
                        <React.Fragment>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={chartOptions[key]}
                                />
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            )}
            <Divider className={classes.divider} />
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