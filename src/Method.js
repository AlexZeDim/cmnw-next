import React from 'react';
import PropTypes from "prop-types";
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import TableIcons from "./TableIcons"
import {
    Typography, Box
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(6, 0, 3),
    },
}));

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
        data: props.data,
    });
    return (
        <MaterialTable
            icons={TableIcons}
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
