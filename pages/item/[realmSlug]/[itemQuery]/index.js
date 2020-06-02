import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import HC_column from "highcharts/modules/drilldown";
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
        maxHeight: "100%",
    },
    cardTitle: {
        fontSize: '0.85em',
        fontWeight: 600
    },
    chip: {
        margin: theme.spacing(1)
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

const Item = ({item, realm, valuation, quotes, chart, contracts_day}) => {
    let clusterChartOptions, columnsChartOptions;
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
    const {_id, name, is_auctionable, is_commdty, quality, item_class, item_subclass, is_equippable, is_stackable, ilvl, inventory_type, level, ticker, asset_class, v_class, sell_price, derivative, expansion} = item;
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
        <Container maxWidth={false} alignContent={'center'} justify={'center'}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Item Icon" variant="rounded" src={item.icon} className={classes.large} />
                </Grid>
                <Grid item>
                    <Typography variant="h2" className={classes.en_title}>
                        {(ticker) ? (ticker) : (name["en_GB"])}
                    </Typography>
                    {(valuation) ? (
                        <Clock time={valuation.lastModified}/>
                    ) : ('')}
                </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.paper}>
                <Grid item xs={4}>
                    <TableContainer>
                        <Table className={classes.table} size="small" aria-label="Quotes">
                            <TableBody>
                                <TableRow key={0}>
                                    <TableCell component="th" scope="row">
                                        ID
                                    </TableCell>
                                    <TableCell align="right">{_id}</TableCell>
                                </TableRow>
                                {(ticker) ? (
                                <TableRow key={1}>
                                    <TableCell component="th" scope="row">
                                        Name
                                    </TableCell>
                                    <TableCell align="right">{name["en_GB"]}</TableCell>
                                </TableRow>
                                ) : ('')}
                                {(is_equippable) ? (
                                <React.Fragment>
                                    <TableRow key={2}>
                                        <TableCell component="th" scope="row">
                                            Inventory Slot
                                        </TableCell>
                                        <TableCell align="right">{inventory_type}</TableCell>
                                    </TableRow>
                                    <TableRow key={3}>
                                        <TableCell component="th" scope="row">
                                            Level
                                        </TableCell>
                                        <TableCell align="right">{level} // {ilvl}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                                ) : ('')}
                                {(item_class) ? (
                                <TableRow key={4}>
                                    <TableCell component="th" scope="row">
                                        Class
                                    </TableCell>
                                    <TableCell align="right">{item_class} // {item_subclass}</TableCell>
                                </TableRow>
                                ) : ('')}
                                {(quality) ? (
                                <TableRow key={5}>
                                    <TableCell component="th" scope="row">
                                        Quality
                                    </TableCell>
                                    <TableCell align="right">{quality}</TableCell>
                                </TableRow>
                                ) : ('')}
                                {(sell_price !== 0 && sell_price) ? (
                                <React.Fragment>
                                    <TableRow key={6}>
                                        <TableCell component="th" scope="row">
                                            Vendor Price
                                        </TableCell>
                                        <TableCell align="right" style={{textTransform: 'lowercase'}}>{sell_price} g</TableCell>
                                    </TableRow>
                                </React.Fragment>
                                ) : ('')}
                                {(is_auctionable) ? (
                                <React.Fragment>
                                    {(sell_price !== 0) ? (
                                    <TableRow key={7}>
                                        <TableCell component="th" scope="row">
                                            Margin Deposit
                                        </TableCell>
                                        <TableCell align="right" style={{textTransform: 'lowercase'}}> 12:{sell_price*0.15} 24:{sell_price*0.30} 48:{sell_price*0.60} g</TableCell>
                                    </TableRow>
                                    ) : ('')}
                                    <TableRow key={8}>
                                        <TableCell component="th" scope="row">
                                            Asset Class
                                        </TableCell>
                                        <TableCell align="right">{v_class.toString().replace(/,/g, ' ')}</TableCell>
                                    </TableRow>
                                    <TableRow key={9}>
                                        <TableCell component="th" scope="row">
                                            Expansion
                                        </TableCell>
                                        <TableCell align="right">{expansion}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                                ) : ('')}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {(valuation && valuation.market) ? (
                <Grid item xs={4}>
                    <Container>
                        <Grid container spacing={4}>
                            {(contracts_day && contracts_day.length) ? (
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                        Day Contracts
                                    </Typography>
                                    <Divider light />
                                    {contracts_day.map(({_id, code, connected_realm_id}) => (
                                        <Chip clickable color="primary" variant="default" className={classes.chip} label={<Link href={`/contract/${connected_realm_id}/${code}`} color="inherit" underline="none">{code}</Link>} avatar={<Avatar>D</Avatar>} />
                                    ))}
                                </Grid>
                            ) : ('')}
                        </Grid>
                    </Container>
                </Grid>
            ) : (
                ''
            )}
            </Grid>
            {(valuation) ? (
                <React.Fragment>
                    <Divider className={classes.pos} />
                    <Grid container alignItems="center" alignContent="center">
                        <Grid item xs={4}>
                            <Grid container spacing={1}>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={'chart'}
                                    options={columnsChartOptions}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            {(valuation.derivative && valuation.derivative.length) ? (
                                <AppBar position="static" color="default">
                                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    {valuation.derivative.map(({_id}, i) => (
                                        <Tab label={_id} {...a11yProps(i)} />
                                    ))}
                                    </Tabs>
                                    {valuation.derivative.map((method, i) => (
                                        <TabPanel value={value} index={i}>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="spanning table">
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
                                                                <TableCell>{row.name.en_GB}</TableCell>
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
                                                        <TableRow key={method._id}>
                                                            <TableCell>{method._id}</TableCell>
                                                            <TableCell align="right">{method.nominal_value}</TableCell>
                                                            <TableCell align="right">{method.queue_quantity}</TableCell>
                                                            <TableCell align="right">{method.queue_cost}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </TabPanel>
                                    ))}
                                </AppBar>
                            ) : (
                            ''
                            )}
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
                ''
            )}
            {(chart && quotes) ? (
                <React.Fragment>
                <Divider className={classes.pos} />
                <Container maxWidth="lg">
                    <Grid container spacing={2} direction="row" justify="space-evenly" alignItems="center">
                    {Object.entries(valuation.market).map(([key, value],i, array) => {
                        if (key === "price") {
                            return (
                                <React.Fragment>
                                    <Grid item key={array.length+1} xs={1}>
                                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                            {"OTC (Price-5%)"}
                                        </Typography>
                                        <Divider light />
                                        <Typography variant="caption" display="block">
                                            {(value * 0.95).toLocaleString('ru-RU')}
                                        </Typography>
                                    </Grid>
                                    <Grid item key={i} xs={1}>
                                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                            {key.replace(/_/g, ' ')}
                                        </Typography>
                                        <Divider light />
                                        <Typography variant="caption" display="block">
                                            {value.toLocaleString('ru-RU')}
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                            )
                        }
                        if (key === "orders") {
                            return (
                                <Grid item key={i} xs={1}>
                                    <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                        {key.replace(/_/g, ' ')}
                                    </Typography>
                                    <Divider light />
                                    <Typography variant="caption" display="block">
                                        {value.length.toLocaleString('ru-RU')}
                                    </Typography>
                                </Grid>
                            )
                        }
                        if (key === "lastModified") {
                            return ('')
                        }
                        return (
                            <Grid item key={i} xs={1}>
                                <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                    {key.replace(/_/g, ' ')}
                                </Typography>
                                <Divider light />
                                <Typography variant="caption" display="block">
                                    {value.toLocaleString('ru-RU')}
                                </Typography>
                            </Grid>
                        )
                    })}
                    </Grid>
                </Container>
                <Grid container>
                    <Grid item xs={9}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={clusterChartOptions}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TableContainer component={Paper} className={classes.container}>
                            <Table stickyHeader className={classes.table} size="small" aria-label="Quotes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>P</TableCell>
                                        <TableCell align="left">Q</TableCell>
                                        <TableCell align="right">OI</TableCell>
                                        <TableCell align="right">Orders</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quotes.map(({_id, quantity, open_interest, orders}, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {_id.toLocaleString('ru-RU')}
                                            </TableCell>
                                            <TableCell align="left">{quantity.toLocaleString('ru-RU')}</TableCell>
                                            <TableCell align="right">{Math.round(open_interest).toLocaleString('ru-RU')}</TableCell>
                                            <TableCell align="right">{orders.length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Divider className={classes.pos} />
                </React.Fragment>
            ) : (
                ''
            )}
            {(chart && quotes) ? (
                ''
            ) : (
                ''
            )}
            <Divider className={classes.pos} />0
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