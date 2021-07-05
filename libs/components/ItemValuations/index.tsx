import { LinearProgress } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import { itemValuations, itemValuationsResponse } from '../../types/components';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';
import { domain, localhost } from '../../constants';
import { convertDate } from '../../utils';
import ItemDetailsTable from '../ItemDetailsTable';

const ItemValuations: FC<itemValuations> = ({ id }) => {

  const { data, error } = useSWR<itemValuationsResponse>(`${localhost}/api/dma/item/valuations?_id=${id}`, (url) => fetch(url).then(r => r.json()));

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
    isRowExpandable: (dataIndex) => !!data.valuations[dataIndex].details,
    renderExpandableRow: (rowData, rowMeta) => {
      const { type, details } = data.valuations[rowMeta.dataIndex];
      return (
        <ItemDetailsTable
          type={type}
          details={details}
          connected_realm_id={1602}
        />
      );
    },
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
      options: {
        customBodyRenderLite: (dataIndex) => convertDate(data.valuations[dataIndex].last_modified)
      }
    },
  ];

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
