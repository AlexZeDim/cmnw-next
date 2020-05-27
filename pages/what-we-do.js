import React from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://material-ui.com/">
                Your Website
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function TabPanel(props) {
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
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: 'url(https://source.unsplash.com/random)',
        padding: theme.spacing(15, 0, 15),
    },
}));

export default function WhatWeDo() {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent} />
            <Container fixed>
                <Box my={4}>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="simple tabs example">
                                <Tab label="Market Operations" {...a11yProps(0)} />
                                <Tab label="REPO" {...a11yProps(1)} />
                                <Tab label="XSS" {...a11yProps(2)} />
                                <Tab label="Research" {...a11yProps(3)} />
                                <Tab label="In house solutions" {...a11yProps(4)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            Our team always looking for opportunities in marketmaking top-demand commodities in our home realm
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Our reputation allows us to borrow enormous amount of in-game capital
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            We could offer our parties execution across main in-game trade hubs (like Ravencrest, Outland, Gordunni) for various items and bespoke trades via cross servers swap trades (XSS)
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Having access to various hi-end PvE guilds and boosting communities across RU region allows us to gather information, analyze it
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Our in-house solutions allow our parties to leverage their in-game results in various aspects like hi-end M+ keys (KBI), market coverage (DMA) and others.
                        </TabPanel>
                    </div>
                    <ProTip />
                    <Copyright />
                </Box>
            </Container>
        </main>
    );
}
