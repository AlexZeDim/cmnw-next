import React, { FC } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { logTable } from '../../types/components';

const columns = [
  {
    field: 'event',
    headerName: 'Event',
    width: 180,
  },
  {
    field: 'action',
    headerName: 'Action',
  },
  {
    field: 'original',
    headerName: 'Original',
  },
  {
    field: 'updated',
    headerName: 'Updated',
  },
  {
    field: 't0',
    headerName: 'After',
    type: 'date',
  },
  {
    field: 't1',
    headerName: 'Before',
    type: 'date',
  }
];

export const LogTable: FC<logTable> = ({ logs }) => {
  if (!logs || logs.length === 0) return (<div/>);
  const data = logs.map(l => Object.assign(l, { id: l._id }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
      />
    </div>
  )
};
