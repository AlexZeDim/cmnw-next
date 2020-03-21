import { useRouter } from 'next/router'
import { Container, Grid, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import fetch from 'isomorphic-unfetch'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
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
        minWidth: 300,
    },
    card: {
        minWidth: 275,
        margin: theme.spacing(2),
    },
    card_seller: {
        minWidth: 150,
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
        margin: theme.spacing(2),
    },
}));


const Item = ({price_range, timestamps, chart}) => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;
    const chartOptions = {
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40,
            plotBorderWidth: 1,
        },
        title: {
            text: 'Sales per employee per weekday'
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
            maxColor: '#000000'
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
        series: [{
            name: 'Sales per employee',
            borderWidth: 0,
            data: chart,
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="overline" display="block">
                {id}
            </Typography>
            <Typography variant="h2" gutterBottom>
                "Zinanthid"
            </Typography>
            <Typography variant="caption" display="block">
                "timestamp"
            </Typography>
            <Divider className={classes.pos} />
            {typeof market !== 'undefined' ? (
                <Grid container spacing={1}>
                    {market.map((element, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {element.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {element.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>) : (
                ''
            )}
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={chartOptions}
            />
            <Divider className={classes.pos} />
        </Container>
    )
};


export async function getServerSideProps({query}) {
    const {id} = query;
    //const res = await fetch(encodeURI(`https://us.api.blizzard.com/data/wow/item/${id}?namespace=static-us&locale=en_US&access_token=EUUFsZ2i2A1Lrp2fMWdCO24Sk9q1Hr3cP5`));
    const res = await fetch(encodeURI(`http://localhost:3030/api/items/${id}@1602`));
    const json = await res.json();
    return { props: json}
}


export default Item