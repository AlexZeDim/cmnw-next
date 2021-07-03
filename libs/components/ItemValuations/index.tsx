import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { itemValuations, itemValuationsResponse } from '../../types/components';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';
import { domain } from '../../constants';

const ItemValuations: FC<itemValuations> = ({ id }) => {

  const { data, error } = useSWR<itemValuationsResponse>(`${domain}/api/dma/item/valuations?_id=${id}`, (url) => fetch(url).then(r => r.json()));

  if (error) return <></>
  if (!data) return <LinearProgress />

  const options = {
    download: false,
    print: false,
    filter: false,
    search: false,
    viewColumns: false,
    fixedSelectColumn: false,
    selectableRows: 'none',
    setTableProps: () => ({ size: 'small' }),
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 25, 50],
    sortOrder: {
      name: 'value',
      direction: 'asc',
    },
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => data.valuations[dataIndex].details,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <Table size="small" aria-label="Reagents">
          <TableHead>
            <TableRow>
              <TableCell colSpan={colSpan} align="right">Queue Value</TableCell>
              <TableCell colSpan={colSpan} align="right">{data.valuations[rowMeta.dataIndex].details.queue_cost}</TableCell>
              <TableCell colSpan={colSpan} align="right">Queue Quantity</TableCell>
              <TableCell colSpan={colSpan} align="right">{data.valuations[rowMeta.dataIndex].details.queue_quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell colSpan={colSpan} align="right">Ticker</TableCell>
              <TableCell colSpan={colSpan} align="right">Price</TableCell>
              <TableCell colSpan={colSpan} align="right">Quantity</TableCell>
              <TableCell colSpan={colSpan} align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.valuations[rowMeta.dataIndex].details.reagent_items.map((row) => (
              <TableRow key={row._id}>
                <TableCell colSpan={colSpan} align="right">{row.name.en_GB}</TableCell>
                <TableCell colSpan={colSpan} align="right">{row.ticker}</TableCell>
                <TableCell colSpan={colSpan} align="right">{(row.value / row.quantity).toFixed(2)}</TableCell>
                <TableCell colSpan={colSpan} align="right">{row.quantity}</TableCell>
                <TableCell colSpan={colSpan} align="right">{row.value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(curExpanded, allExpanded, rowsExpanded)
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'flag',
      label: 'Flag',
    },
    {
      name: 'type',
      label: 'Type',
    },
    {
      name: 'value',
      label: 'Value',
      options: {
        customBodyRenderLite: (dataIndex) => data.valuations[dataIndex].value.toLocaleString('ru-RU')
      }
    },
    {
      name: 'connected_realm_id',
      label: 'Realm',
    },
    {
      name: 'last_modified',
      label: 'Last Modified',
    },
  ];

  console.log(data);

  if (!data.is_evaluating) {
    // TODO force refresh
  }

  return (
    <Fragment>
      <MUIDataTable
        data={data.valuations}
        columns={columns}
        options={options}
      />
    </Fragment>
  )
}

export default ItemValuations;
