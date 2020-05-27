import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import {
    AddBox, ArrowDownward, Check,
    ChevronLeft, ChevronRight,
    Clear, DeleteOutline, Edit,
    FilterList, FirstPage, LastPage,
    Remove, SaveAlt, Search, ViewColumn
} from '@material-ui/icons';

const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
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
}));

const addTotal = (data, byColumn) => {
    let keys = Object.keys(data[0]);
    let total = data.reduce((acc, el) => {
        return acc += +(el[byColumn]);
    }, 0);

    let totalRow = {};
    for (let key of keys) {
        if (key === keys[0]) {
            totalRow[key] = 'Total';
        } else if (key === byColumn) {
            totalRow[key] = total;
        } else {
            totalRow[key] = '';
        }
    }
    return [...data, totalRow];
};

export default function Album() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name', editable: 'never' },
            { title: 'P', field: 'p', type: 'numeric' },
            { title: 'Q', field: 'q', type: 'numeric', editable: 'never' },
            { title: 'V', field: 'v', type: 'numeric', editable: 'never' },
        ],
        data: [
            { name: 'ANCR', p: 2, q: 3, v: 1231 },
            {
                p: 8,
                q: 2,
                v: 2017,
            }
        ],
    });
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Депортация
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container>
                        <Grid>
                            <MaterialTable
                                icons={tableIcons}
                                title="TEST"
                                columns={state.columns}
                                data={addTotal(state.data,'v')}
                                options={{search: false}}
                                editable={{
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                if (oldData) {
                                                    //console.log(parseInt(newData.name), oldData);
                                                    newData.v = parseFloat(newData.p)+newData.q;
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });
                                                }
                                            }, 600);
                                        }),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}