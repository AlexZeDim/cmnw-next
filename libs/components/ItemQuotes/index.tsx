import React, { FC, Fragment } from 'react';
import { itemQuery } from '../../types/components';
import useSWR from 'swr';
import MUIDataTable from 'mui-datatables';
import { domain } from '../../constants';
import { quotesResponse } from '../../types/components';
import { LinearProgress } from '@material-ui/core';

const options = {
  download: false,
  print: false,
  filter: false,
  search: false,
  viewColumns: false,
  fixedSelectColumn: false,
  selectableRows: 'none',
  setTableProps: () => ({ size:'small' }),
  rowsPerPage: 15,
  rowsPerPageOptions: [15, 25, 50]
}

const ItemQuotes: FC<itemQuery> = ({ id, is_gold, is_xrs }) => {

  if (is_xrs) return <></>

  const { data, error } = useSWR<quotesResponse>(`${domain}/api/dma/item/quotes?_id=${id}`, (url) => fetch(url).then(r => r.json()));

  if (error) return <></>
  if (!data) return <LinearProgress />

  const columns = [
    {
      name: 'price',
      label: 'Price',
      options: {
        customBodyRenderLite: (dataIndex) => data.quotes[dataIndex].price.toLocaleString('ru-RU')
      }
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        customBodyRenderLite: (dataIndex) => data.quotes[dataIndex].quantity.toLocaleString('ru-RU')
      }
    },
    {
      name: 'open_interest',
      label: 'Open Interest',
      options: {
        customBodyRenderLite: (dataIndex) => data.quotes[dataIndex].open_interest.toLocaleString('ru-RU')
      }
    },
    {
      name: 'size',
      label: is_gold ? 'Sellers' : 'Orders',
      type: 'number',
    }
  ]

  return (
    <Fragment>
      <MUIDataTable
        data={data.quotes}
        columns={columns}
        options={options}
      />
    </Fragment>
  )
}

export default ItemQuotes;
