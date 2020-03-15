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


const Item = ({name, market}) => {
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
            categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },
        yAxis:{
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            tickLength: 150,
            opposite: true,
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
            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
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
                {name}
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
    const res = await fetch(encodeURI(`https://us.api.blizzard.com/data/wow/item/${id}?namespace=static-us&locale=en_US&access_token=EUUFsZ2i2A1Lrp2fMWdCO24Sk9q1Hr3cP5`));
    const json = await res.json();
    return { props: json}
}


export default Item