import React from "react";
import fetch from 'node-fetch'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import {
    Container, Grid,
    Divider, Typography,
    AppBar, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination,
    TableRow, TableSortLabel,
    Paper, Box, Tabs, Tab,
    Button
} from "@material-ui/core";

const ButtonLink = ({ className, href, hrefAs, children }) => (
    <Link href={href} as={hrefAs}>
        <a className={className}>
            {children}
        </a>
    </Link>
);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'character_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'character_name', numeric: false, disablePadding: false, label: 'NAME' },
    { id: 'character_rank', numeric: true, disablePadding: false, label: 'RANK' },
    { id: 'character_checksum', numeric: false, disablePadding: false, label: 'CHECKSUM' },
    { id: 'character_date', numeric: true, disablePadding: false, label: 'LAST UPDATED' },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={'right'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

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
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    root: {
        marginTop: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    title: {
        color: theme.palette.background.paper,
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        textTransform: 'uppercase'
    },
    cardTitle: {
        fontSize: '1.1em',
        fontWeight: 600
    },
}));

function GuildPage(json) {
    let {
        //_id,
        id,
        name,
        realm_slug, realm,
        //createdBy, slug
        updatedBy, guild_log,
        members_latest,
        //members_prev,
        achievement_points, created_timestamp,
        faction, member_count,
        //crest,
        statusCode,
        createdAt, updatedAt
    } = json;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('character_rank');
    const [orderTS, setOrderTS] = React.useState('desc');
    const [orderByTS, setOrderByTS] = React.useState('character_date');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let join, leave, demote, promote;
    if (guild_log) ({join, leave, demote, promote} = guild_log);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, members_latest.length - page * rowsPerPage);

    let style;
    if (faction === 'Alliance') {
        style = {
            backgroundImage: `url(${require(`src/img/alliance.jpg`)})`
        }
    }
    if (faction === 'Horde') {
        style = {
            backgroundImage: `url(${require(`src/img/horde.jpg`)})`
        }
    }

    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent} style={style}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                            {name}@{realm}
                        </Typography>
                    </Container>
                </div>
                {/* End hero unit */}
                { (statusCode === 200) ? (
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item key={2} xs={12} sm={6} md={6}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                Summary
                            </Typography>
                            <Divider light />
                            <Typography variant="caption" display="block">
                                ID: {id}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Achivements: {achievement_points}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Members: {member_count}
                            </Typography>
                        </Grid>
                        <Grid item key={3} xs={12} sm={6} md={6}>
                            <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                {updatedBy}
                            </Typography>
                            <Divider />
                            <Typography variant="caption" display="block">
                                Founded: {new Date(created_timestamp).toLocaleString('en-GB')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Indexed: {new Date(createdAt).toLocaleString('en-GB')}
                            </Typography>
                            <Typography variant="caption" display="block">
                                Updated: {new Date(updatedAt).toLocaleString('en-GB')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.root}>
                        <AppBar position="static" color="primary">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="simple tabs example"
                                centered
                            >
                                <Tab label="MEMBERS" {...a11yProps(0)} />
                                <Tab label="JOINS" {...a11yProps(1)} />
                                <Tab label="LEAVES" {...a11yProps(2)} />
                                <Tab label="DEMOTES" {...a11yProps(3)} />
                                <Tab label="PROMOTES" {...a11yProps(4)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="Latest"
                                        size={'small'}
                                        aria-label="Latest Members"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={members_latest.length}
                                        />
                                        <TableBody>
                                            {stableSort(members_latest, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(({character_id, character_name, character_rank, character_checksum, character_date}) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{character_id}</TableCell>
                                                            <TableCell align="right"><Button component={ButtonLink} href={`/character/${realm_slug}/${character_name}`} color={'primary'}>{character_name}</Button></TableCell>
                                                            <TableCell align="right">{(character_rank === 0) ? ('GM') : (character_rank)}</TableCell>
                                                            <TableCell align="right">{(character_checksum === '') ? ('') : (<Button component={ButtonLink} href={`/find/${character_checksum}`} color={'primary'}>{character_checksum}</Button>)}</TableCell>
                                                            <TableCell align="right">{new Date(character_date).toLocaleString('en-GB')}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 33 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={members_latest.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="Joins"
                                        size={'small'}
                                        aria-label="Members joined"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={orderTS}
                                            orderBy={orderByTS}
                                            onRequestSort={handleRequestSort}
                                            rowCount={join.length}
                                        />
                                        <TableBody>
                                            {stableSort(join, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(({character_id, character_name, character_rank, character_checksum, character_date}) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{character_id}</TableCell>
                                                            <TableCell align="right"><Button component={ButtonLink} href={`/character/${realm_slug}/${character_name}`} color={'primary'}>{character_name}</Button></TableCell>
                                                            <TableCell align="right">{(character_rank === 0) ? ('GM') : (character_rank)}</TableCell>
                                                            <TableCell align="right">{(character_checksum === '') ? ('') : (<Button component={ButtonLink} href={`/find/${character_checksum}`} color={'primary'}>{character_checksum}</Button>)}</TableCell>
                                                            <TableCell align="right">{new Date(character_date).toLocaleString('en-GB')}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 33 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={join.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="Leaves"
                                        size={'small'}
                                        aria-label="Members leaved"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={orderTS}
                                            orderBy={orderByTS}
                                            onRequestSort={handleRequestSort}
                                            rowCount={leave.length}
                                        />
                                        <TableBody>
                                            {stableSort(leave, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(({character_id, character_name, character_rank, character_checksum, character_date}) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{character_id}</TableCell>
                                                            <TableCell align="right"><Button component={ButtonLink} href={`/character/${realm_slug}/${character_name}`} color={'primary'}>{character_name}</Button></TableCell>
                                                            <TableCell align="right">{(character_rank === 0) ? ('GM') : (character_rank)}</TableCell>
                                                            <TableCell align="right">{(character_checksum === '') ? ('') : (<Button component={ButtonLink} href={`/find/${character_checksum}`} color={'primary'}>{character_checksum}</Button>)}</TableCell>
                                                            <TableCell align="right">{new Date(character_date).toLocaleString('en-GB')}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 33 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={leave.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="Demotes"
                                        size={'small'}
                                        aria-label="Members demoted"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={orderTS}
                                            orderBy={orderByTS}
                                            onRequestSort={handleRequestSort}
                                            rowCount={demote.length}
                                        />
                                        <TableBody>
                                            {stableSort(demote, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(({character_id, character_name, character_rank, character_checksum, character_date}) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{character_id}</TableCell>
                                                            <TableCell align="right"><Button component={ButtonLink} href={`/character/${realm_slug}/${character_name}`} color={'primary'}>{character_name}</Button></TableCell>
                                                            <TableCell align="right">{(character_rank === 0) ? ('GM') : (character_rank)}</TableCell>
                                                            <TableCell align="right">{(character_checksum === '') ? ('') : (<Button component={ButtonLink} href={`/find/${character_checksum}`} color={'primary'}>{character_checksum}</Button>)}</TableCell>
                                                            <TableCell align="right">{new Date(character_date).toLocaleString('en-GB')}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 33 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={demote.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Paper className={classes.paper}>
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="Promoted"
                                        size={'small'}
                                        aria-label="Members promoted"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={orderTS}
                                            orderBy={orderByTS}
                                            onRequestSort={handleRequestSort}
                                            rowCount={promote.length}
                                        />
                                        <TableBody>
                                            {stableSort(promote, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(({character_id, character_name, character_rank, character_checksum, character_date}) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{character_id}</TableCell>
                                                            <TableCell align="right"><Button component={ButtonLink} href={`/character/${realm_slug}/${character_name}`} color={'primary'}>{character_name}</Button></TableCell>
                                                            <TableCell align="right">{character_rank}</TableCell>
                                                            <TableCell align="right">{(character_checksum === '') ? ('') : (<Button component={ButtonLink} href={`/find/${character_checksum}`} color={'primary'}>{character_checksum}</Button>)}</TableCell>
                                                            <TableCell align="right">{new Date(character_date).toLocaleString('en-GB')}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 33 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    count={promote.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                    </div>
                </Container>
                ) : (
                    <Container className={classes.cardGrid} maxWidth="lg">
                        <Grid container spacing={4}>
                            <Grid item key={4} xs={12} sm={6} md={6}>
                                <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                                    Summary
                                </Typography>
                                <Divider light />
                                <Typography variant="caption" display="block">
                                    ID: {id}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Achivements: {achievement_points}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Members: {member_count}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {realmSlug, guildSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/guilds/${(guildSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json}
}

export default GuildPage