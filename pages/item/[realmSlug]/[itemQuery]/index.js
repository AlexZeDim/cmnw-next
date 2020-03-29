import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import { Container, Grid, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import fetch from 'isomorphic-unfetch'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from '@material-ui/core/Paper';
if (typeof Highcharts === 'object') {
    HC_heatmap(Highcharts);
    HighchartsExporting(Highcharts)
}


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
        minWidth: 500,
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
}));


const Item = ({_id, name, item, market, chart, lvl2}) => {
    let {quantity, open_interest, min, avg, min_size, orders} = market;
    let {price_range, timestamps, dataset} = chart;
    const classes = useStyles();
    const chartOptions = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40,
            plotBorderWidth: 1,
            height: (9 / 16 * 100) + '%',
            backgroundColor: 'transparent',
            style: {
                letterSpacing: 'unset',
            }
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: timestamps
        },
        yAxis:{
            categories: price_range,
            tickLength: 150,
            opposite: false ,
            title: null,
        },
        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#D50000'
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'middle',
            y: 25,
            symbolHeight: 350
        },
        tooltip: {
            formatter: function () {
                return `T: ${this.series.xAxis.categories[this.point.x]}<br>
                        Q: ${(this.point.value).toLocaleString('ru-RU')}<br>
                        P: ${this.series.yAxis.categories[this.point.y]}+<br>
                        O: ${this.point.orders}<br>
                        OI: ${(this.point.oi).toLocaleString('ru-RU')}g`
            }
        },
        series: [{
            borderWidth: 0,
            clip: false,
            data: dataset,
            dataLabels: {
                enabled: true,
                crop: true,
                shadow: false,
                formatter: function(){
                    if (this.point.value !== 0) {
                        return this.point.value.toLocaleString('ru-RU');
                    }
                },
                style: {
                    fontFamily: 'Roboto',
                    color: 'contrast',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    textOutline: '0px',
                }
            }
        }]
    };

    return (
        <Container maxWidth="false">
            <Grid container spacing={1} className={classes.paper}>
                <Grid item xs={4}>
                    <Typography variant="overline" display="block">
                        {_id}
                    </Typography>
                    <Avatar alt="Remy Sharp" variant="rounded" src={item.icon} className={classes.large} />
                    <Typography variant="h2" gutterBottom className={classes.en_title}>
                        {name["en_GB"]}
                    </Typography>
                    <Typography variant="caption" display="block">
                        {new Date(market._id).toLocaleString('en-GB')} :: {new Date().toLocaleString('en-GB')}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>P</TableCell>
                                    <TableCell align="left">Q</TableCell>
                                    <TableCell align="right">OI</TableCell>
                                    <TableCell align="right">Orders</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lvl2.map(({_id, quantity, open_interest, orders}) => (
                                    <TableRow key={_id}>
                                        <TableCell component="th" scope="row">
                                            {_id.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="left">{quantity.toLocaleString('ru-RU')}</TableCell>
                                        <TableCell align="right">{open_interest.toLocaleString('ru-RU')}</TableCell>
                                        <TableCell align="right">{orders.length}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item key={1} xs={6} sm={3} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="overline" display="block" color="textSecondary">
                                            Quantity
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.quantity}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item key={2} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="overline" display="block" color="textSecondary">
                                            Open Interest
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.open_interest}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item key={3} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="overline" display="block" color="textSecondary">
                                            Min Price
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.min}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item key={4} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="overline" display="block" color="textSecondary">
                                            Min Size Price
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.min_size}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item key={5} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Avg Price
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.avg}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item key={6} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="overline" display="block" color="textSecondary">
                                            Orders
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {market.orders.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <Divider className={classes.pos} />
            {typeof market !== 'undefined' ? (
                <Grid container>
                    <Grid item xs={12}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={chartOptions}
                        />
                    </Grid>
                </Grid>) : (
                ''
            )}
            <Divider className={classes.pos} />
        </Container>
    )
};


export async function getServerSideProps({query}) {
    const {realmSlug, itemQuery} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/items/${itemQuery}@${realmSlug}`));
    const json = await res.json();
    return { props: json}
}


export default Item