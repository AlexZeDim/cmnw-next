import React, { FC } from 'react';
import MUIDataTable from 'mui-datatables';
import useSWR from 'swr';
import { domain } from '../../constants';
import { LinearProgress } from '@material-ui/core';
import { AuctionsResponse, itemQuery } from '../../types/components';

const options = {
  download: false,
  setTableProps: () => ({ size:'small' }),
}

const ItemListing: FC<itemQuery> = ({ id, is_gold, is_commdty }) => {

  if (is_commdty || is_gold) return <></>

  const { data, error } = useSWR<AuctionsResponse>(`${domain}/api/dma/item/feed?_id=${id}`, (url) => fetch(url).then(r => r.json()));
  if (!data) return <LinearProgress />

  if (error) return <></>

  const timeLeft = new Map([
    ['SHORT', '30m'],
    ['MEDIUM', '30m - 2h'],
    ['LONG', '2h - 12h'],
    ['VERY_LONG', '1D - 2D'],
  ]);

  const columns = [
    {
      name: 'id',
      label: 'Item',
    },
    {
      name: 'connected_realm_id',
      label: 'Realm',
    },
    {
      name: 'buyout',
      label: 'Price',
      options: {
        customBodyRenderLite: (dataIndex) => {
          if (data.feed[dataIndex].buyout) return data.feed[dataIndex].buyout.toLocaleString('ru-RU');
          return `BID: ${data.feed[dataIndex].bid.toLocaleString('ru-RU')}`
        }
      }
    },
    {
      name: 'time_left',
      label: 'Expiration',
      options: {
        customBodyRenderLite: (dataIndex) => timeLeft.has(data.feed[dataIndex].time_left)
          ? timeLeft.get(data.feed[dataIndex].time_left) : data.feed[dataIndex].time_left
      }
    },
    {
      name: 'last_modified',
      label: 'Created',
      options: {
        customBodyRenderLite: (dataIndex) => new Date(data.feed[dataIndex].last_modified).toLocaleString('en-GB')
      }
    },
  ];

  return (
    <MUIDataTable
      data={data.feed}
      columns={columns}
    />
  )
}

export default ItemListing;
