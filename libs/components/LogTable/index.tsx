import React, { FC } from 'react';
import MUIDataTable from "mui-datatables";
import { logTable } from '../../types/components';

const columns = [
  {
    name: 'event',
    label: 'Event',
  },
  {
    name: 'action',
    label: 'Action',
  },
  {
    name: 'original',
    label: 'Original',
  },
  {
    name: 'updated',
    label: 'Updated',
  },
  {
    name: 't0',
    label: 'After',
    type: 'date',
  },
  {
    name: 't1',
    label: 'Before',
    type: 'date',
  }
];

const options = {
  download: false,
  fixedSelectColumn: false,
  selectableRows: 'none',
}


export const LogTable: FC<logTable> = ({ logs }) => {
  if (!logs || logs.length === 0) return (<div/>);
  const data = logs.map(l => Object.assign(l, { id: l._id }));
  return (
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />
  )
};
