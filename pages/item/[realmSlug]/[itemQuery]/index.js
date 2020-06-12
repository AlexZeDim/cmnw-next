import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import HC_column from "highcharts/modules/drilldown";
import HC_treemap from "highcharts/modules/treemap";
import Link from "../../../../src/Link";
import Clock from "../../../../src/Clock";
import PropTypes from "prop-types";
import {
    Container, Grid,
    Typography, Divider,
    Avatar, Table,
    TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Paper, Chip, AppBar,
    Tabs, Tab, Box
} from '@material-ui/core';


if (typeof Highcharts === 'object') {
    HC_heatmap(Highcharts);
    HC_column(Highcharts)
    HC_treemap(Highcharts)
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

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});

const Item = ({item, realm, valuation, quotes, chart, contracts}) => {
    let clusterChartOptions, columnsChartOptions, treemapChartOptions;

    if (valuation && valuation.reagent) {
        let {reagent} = valuation;
        if (reagent.premium && reagent.premium.length) {
            treemapChartOptions = {
                chart: {
                    type: 'treemap',
                    backgroundColor: 'transparent'
                },
                title: {
                    text: undefined
                },
                colorAxis: {
                    minColor: '#ebe7ee',
                    maxColor: '#241c18'
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    verticalAlign: 'middle',
                    symbolHeight: 300,
                    labelFormat: "{value}"
                },
                plotOptions: {
                    treemap: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b><br><b>{point.colorValue}g</b><br><b>x{point.value}</b>',
                            distance: -50,
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        return `
                        Method: ${this.point.name}<br>
                        Value: ${(this.point.colorValue).toLocaleString('ru-RU')}g<br>
                        Wi: ${this.point.value}<br>`
                    }
                },
                series: [{
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    data: valuation.reagent.premium.filter(({wi, value}) => wi > 25 && value > 0).map(({_id, value, wi}) => ({name: _id, value: wi, colorValue: value})),
                }]
            }
        }
    }

    if (valuation && valuation.derivative && valuation.derivative.length) {

        const compareColumnsData = (valuation) => {
            let data = []
            if ("market" in valuation) {
                let {market} = valuation;
                if ("price" in market) {
                    let {price} = market
                    data.push({
                        name: "Market",
                        color: '#241c18',
                        data: [
                            {
                                name: "MARKET",
                                y: price,
                                drilldown: false
                            }
                        ]
                    })
                }
            }
            if ("derivative" in valuation) {
                let {derivative} = valuation;
                data = [...data, ...derivative.map(({_id, nominal_value}) => ({name: _id, color: '#c1aa82', data: [{name: _id, y: nominal_value, drilldown: true}]}))]
            }
            return data
        }

        const dropdownData = (point) => {
            const {_id, reagent_items} = valuation.derivative.find(({_id}) => (_id === point));
            let findData = {}
            Object.assign(findData, {name: _id, color: '#c1aa82', data: reagent_items.map(item => [item.name.en_GB, item.value]) })
            return findData
        }

        columnsChartOptions = {
            chart: {
                type: "column",
                plotBorderWidth: 1,
                backgroundColor: 'transparent',
                style: {
                    letterSpacing: 'unset',
                },
                events: {
                    drilldown: function(e) {
                        if (!e.seriesOptions) {
                            let chart = this;
                            chart.addSingleSeriesAsDrilldown(e.point, dropdownData(e.point.name));
                            chart.applyDrilldown();
                        }
                    }
                }
            },
            title: {
                text: "Cheapest to Delivery",
                style: {
                    fontFamily: 'Roboto',
                    color: 'contrast',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    textOutline: '0px',
                }
            },
            subtitle: {
                text: "Click the columns to drilldown every method"
            },
            xAxis: {
                type: "category"
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Value"
                }
            },
            legend: {
                enabled: false
            },
            series: compareColumnsData(valuation)
        }
    }
    if (typeof chart !== 'undefined') {
        const { price_range, timestamps, dataset } = chart;
        clusterChartOptions = {
            chart: {
                type: 'heatmap',
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
                minColor: '#ebe7ee',
                maxColor: '#241c18'
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
    }
    const {_id, name, quality, item_class, item_subclass, ilvl, inventory_type, level, ticker, v_class, sell_price} = item;
    const classes = useStyles();

    let defaultValuationTab = 0
    if (valuation && valuation.reagent) {
        if ("index" in valuation.reagent) {
            defaultValuationTab = valuation.reagent.index;
        }
    }
    const [value, setValue] = React.useState(defaultValuationTab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth={false} alignContent="center">
            {/** TITLE BLOCK */}
            <Container maxWidth={false} className={classes.titleBlock}>
                <Grid container direction="column" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box alignItems="center" display="flex" justifyContent="center">
                            <Avatar alt="Item Icon" variant="rounded" src={item.icon} className={classes.large} />
                            <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
                                {(ticker) ? (ticker) : (name["en_GB"])}@{(realm.ticker) ? (realm.ticker) : (ticker.name)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        {(valuation) ? (
                            <Clock time={valuation.lastModified}/>
                        ) : ('')}
                    </Grid>
                    {(valuation && valuation.market) ? (
                        <Grid item>
                            {(contracts && contracts.length) ? (
                                <Grid container direction="row" justify="space-evenly" alignItems="center">
                                {contracts.map(({_id, code, type, connected_realm_id}, i) => (
                                    <Grid item key={i} xs={2}>
                                        <Chip clickable color="default" variant="default" className={classes.chip} label={<Link href={`/contract/${connected_realm_id}/${code}`} color="inherit" underline="none">{code}</Link>} avatar={<Avatar>{type}</Avatar>} />
                                    </Grid>
                                ))}
                                </Grid>
                            ) : ('')}
                        </Grid>
                    ) : (
                        ''
                    )}
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
                            ID: {_id}
                        </Typography>
                        {(ticker) ? (
                            <Typography variant="caption" display="block">
                                Name: {name["en_GB"]}
                            </Typography>
                        ) : ('')}
                    </Grid>
                    <Grid item key={2} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Class
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {item_class} {item_subclass}
                        </Typography>
                        {(v_class && v_class.length) ? (
                        <Typography variant="caption" display="block">
                            {v_class.toString().replace(/,/g, ' ')}
                        </Typography>
                        ) : ('')}
                    </Grid>
                    <Grid item key={3} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Inventory
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {quality} {inventory_type}
                        </Typography>
                        {(ilvl && level) ? (
                            <Typography variant="caption" display="block">
                                {ilvl} {level}
                            </Typography>
                        ) : ("")}
                    </Grid>
                    <Grid item key={4} xs={12} sm={6} md={3}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Vendor
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            {sell_price}
                        </Typography>
                    </Grid>
                    {(valuation && valuation.market && valuation.market.price) ? (
                    <React.Fragment>
                        <Grid item key={5} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Market
                            </Typography>
                            <Divider light />
                            <Typography variant="caption" display="block">
                                Price-5% (OTC): {(valuation.market.price*0.95).toLocaleString('ru-RU')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Price: {valuation.market.price.toLocaleString('ru-RU')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Price Size: {valuation.market.price_size.toLocaleString('ru-RU')}
                            </Typography>
                        </Grid>
                        <Grid item key={6} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Market Stats
                            </Typography>
                            <Divider light />
                            <Typography variant="caption" display="block">
                                Q: {valuation.market.quantity.toLocaleString('ru-RU')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                OI: {valuation.market.open_interest.toLocaleString('ru-RU')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Orders: {valuation.market.orders.length}
                            </Typography>
                        </Grid>
                        <Grid item key={7} xs={12} sm={6} md={3}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Yield
                            </Typography>
                            <Divider light />
                            <Typography variant="caption" display="block">
                                To vendor: {valuation.market.yieldVendor} %
                            </Typography>
                            <Typography variant="caption" display="block">
                                To derivative: {valuation.market.yieldReagent} %
                            </Typography>
                        </Grid>
                    </React.Fragment>
                    ) : ('')}
                </Grid>
            </Container>

            {/** DERIVATIVE BLOCK */}
            {(valuation.derivative && valuation.derivative.length) ? (
                <React.Fragment>
                    <Divider className={classes.divider} />
                    <Grid container alignItems="center" alignContent="center" spacing={2}>
                        <Grid item key={1} xs={4}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                constructorType={'chart'}
                                options={columnsChartOptions}
                            />
                        </Grid>
                        <Grid item key={2} xs={8}>
                            <AppBar position="static" color="default">
                                <Tabs value={value} onChange={handleChange} aria-label="Methods">
                                {valuation.derivative.map(({_id}, i) => (
                                    <Tab label={_id} {...a11yProps(i)} />
                                ))}
                                </Tabs>
                                {valuation.derivative.map((method, i) => (
                                    <TabPanel value={value} index={i}>
                                        <TableContainer>
                                            <Table stickyHeader className={classes.table} aria-label="Method">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Item</TableCell>
                                                        <TableCell align="right">Price</TableCell>
                                                        <TableCell align="right">Quantity</TableCell>
                                                        <TableCell align="right">Value</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {method.reagent_items.map((row) => (
                                                        <TableRow key={row._id}>
                                                            <TableCell><Link href={`/item/${realm.connected_realm_id}/${row._id}`} color="secondary" underline="hover">{row.name.en_GB}</Link></TableCell>
                                                            <TableCell align="right">{row.price}</TableCell>
                                                            <TableCell align="right">{row.quantity}</TableCell>
                                                            <TableCell align="right">{row.value}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell>Method</TableCell>
                                                        <TableCell align="right">Nominal Value</TableCell>
                                                        <TableCell align="right">Queue Quantity</TableCell>
                                                        <TableCell align="right">Queue Cost</TableCell>
                                                    </TableRow>
                                                    <TableRow key={method._id} className={classes.totalRow}>
                                                        <TableCell>{method._id}</TableCell>
                                                        <TableCell align="right">{method.nominal_value}</TableCell>
                                                        <TableCell align="right">{method.queue_quantity}</TableCell>
                                                        <TableCell align="right">{method.queue_cost}</TableCell>
                                                    </TableRow>
                                                    {(method.yieldMarket || method.yieldVendor) ? (
                                                    <TableRow>
                                                        <TableCell>Yield</TableCell>
                                                        {(method.yieldMarket) ? (
                                                            <TableCell align="right">Market: {method.yieldMarket} %</TableCell>
                                                        ) : ('')}
                                                        {(method.yieldVendor) ? (
                                                            <TableCell align="right">Vendor: {method.yieldVendor} %</TableCell>
                                                        ) : ('')}
                                                    </TableRow>
                                                    ) : ('')}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                ))}
                            </AppBar>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
                ''
            )}
            {/** MARKET BLOCK */}
            {(chart && quotes) ? (
                <React.Fragment>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={clusterChartOptions}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table stickyHeader size="small" aria-label="Quotes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Price</TableCell>
                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="right">Value</TableCell>
                                        <TableCell align="right">Orders</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quotes.map(({_id, quantity, open_interest, orders}, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">{_id.toLocaleString('ru-RU')}</TableCell>
                                            <TableCell align="right">{quantity.toLocaleString('ru-RU')}</TableCell>
                                            <TableCell align="right">{Math.round(open_interest).toLocaleString('ru-RU')}</TableCell>
                                            <TableCell align="right">{orders.length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                </React.Fragment>
            ) : (
                ''
            )}
            {/** PREMIUM BLOCK */}
            {(valuation && valuation.reagent && valuation.reagent.p_value) ? (
                <React.Fragment>
                    <Divider className={classes.divider} />
                    <Container maxWidth="lg">
                        <Grid item xs={12}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                constructorType={'chart'}
                                options={treemapChartOptions}
                            />
                        </Grid>
                    </Container>
                </React.Fragment>
            ) : (
                ''
            )}
            <Divider className={classes.divider} />
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