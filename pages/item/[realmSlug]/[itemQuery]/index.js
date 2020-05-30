import React from "react";
import fetch from 'isomorphic-unfetch'
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from "highcharts/modules/heatmap";
import Link from "../../../../src/Link";
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
    cardTitle: {
        fontSize: '0.9em',
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

const T = props => {
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        let timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    const tick = () => {
        setDate(new Date());
    };
    return (
        (props.time) ? (
            <React.Fragment>
                <Typography align="center" variant="caption" display="block">
                    NOW: {new Date().toLocaleString('en-GB')} LAST UPD: {new Date(props.time).toLocaleString('en-GB')}
                </Typography>
            </React.Fragment>
        ) : (
            <Typography variant="caption" display="block">
                NOW: {new Date().toLocaleString('en-GB')}
            </Typography>
        )
    );
};

const Item = ({item, market, chart, quotes, contracts_d, valuation}) => {
    let chartOptions;
    if (typeof chart !== 'undefined') {
        const { price_range, timestamps, dataset } = chart;
        chartOptions = {
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
                    {(market) ? (
                        <T time={market.timestamp}/>
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
                {(quotes) ? (
                <Grid item xs={4}>
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
                ) : (
                    ''
                )}
                {(market) ? (
                <Grid item xs={4}>
                    <Container>
                        <Grid container spacing={4}>
                            {Object.entries(market).map(([key, value],i) => (
                                (key !== 'timestamp') ? (
                                    <Grid item key={i} xs={12} sm={6} md={4}>
                                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                            {(key === 'otc') ? ('(OTC) price-5%') : (key.replace(/_/g, ' '))}
                                        </Typography>
                                        <Divider light />
                                        <Typography variant="caption" display="block">
                                            {value.toLocaleString('ru-RU')}
                                        </Typography>
                                    </Grid>
                                ) : ('')
                            ))}
                            {(contracts_d && contracts_d.length) ? (
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                        Contracts
                                    </Typography>
                                    <Divider light />
                                    {contracts_d.map(({_id, code}) => (
                                        <Chip clickable color="primary" variant="default" className={classes.chip} label={<Link href={`/contract/${_id.split('@')[1].toLowerCase()}/${code}`} color="inherit" underline="none">{code}</Link>} avatar={<Avatar>D</Avatar>} />
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
                    <Grid container>
                        <Grid item xs={12}>
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
                                                                <TableCell>{row.name.ru_RU}</TableCell>
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
            {(chart) ? (
                <React.Fragment>
                <Divider className={classes.pos} />
                <Grid container>
                    <Grid item xs={12}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            constructorType={'chart'}
                            options={chartOptions}
                        />
                    </Grid>
                </Grid>
                <Divider className={classes.pos} />
                </React.Fragment>
            ) : (
                ''
            )}
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