import React from 'react';
import PropTypes from "prop-types";
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
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

import {
    AddBox, ArrowDownward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from "@material-ui/icons";
import PropTypes from "prop-types";

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

const a11yProps = index => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(6, 0, 3),
    },
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

export default function Method(props) {
    const classes = useStyles();
    const [columns, setColumns] = React.useState({
        columns: [
            { title: 'Name', field: '_id', editable: 'never' },
            { title: 'P', field: 'price', type: 'numeric' },
            { title: 'Q', field: 'quantity', type: 'numeric', editable: 'never' },
            { title: 'V', field: 'value', type: 'numeric', editable: 'never' },
        ]
    });
    const [data, setData] = React.useState({
        data: [],
    });
    return (
        <MaterialTable
            icons={tableIcons}
            title={false}
            columns={columns.columns}
            data={data.data}
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
    );
}
