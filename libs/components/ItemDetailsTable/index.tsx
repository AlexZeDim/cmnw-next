import React, { FC, Fragment } from 'react';
import { itemDetailsTable } from '../../types/components';
import { Avatar, TableCell, TableRow } from '@material-ui/core';
import { ValuationTypes } from '../../types/enums';


const ItemDetailsTable: FC<itemDetailsTable> = ({ type, details }) => {
  if (
    type === ValuationTypes.OTC ||
    type === ValuationTypes.GOLD ||
    type === ValuationTypes.FUNPAY ||
    type === ValuationTypes.WOWTOKEN
  ) {
    return (
      <Fragment>
        <TableRow key={0}>
          <TableCell colSpan={3} align="right">Quotation</TableCell>
          <TableCell colSpan={3} align="right">{details.quotation}</TableCell>
        </TableRow>
        <TableRow key={1}>
          <TableCell colSpan={3} align="right">Minimal Settlement Amount</TableCell>
          <TableCell colSpan={3} align="right">{details.minimal_settlement_amount.toLocaleString('ru-RU')}</TableCell>
        </TableRow>
        <TableRow key={2}>
          <TableCell colSpan={3} align="right">Lot Size</TableCell>
          <TableCell colSpan={3} align="right">{details.lot_size.toLocaleString('ru-RU')}</TableCell>
        </TableRow>
        <TableRow key={3}>
          <TableCell colSpan={3} align="right">Description</TableCell>
          <TableCell colSpan={3} align="right">{details.description}</TableCell>
        </TableRow>
      </Fragment>
    )
  }

  if (type === ValuationTypes.DERIVATIVE) {
    return (
      <Fragment>
        <TableRow>
          <TableCell colSpan={1}/>
          <TableCell colSpan={1} variant="head">Name</TableCell>
          <TableCell colSpan={1} variant="head">Ticker</TableCell>
          <TableCell colSpan={1} variant="head">Price</TableCell>
          <TableCell colSpan={1} variant="head">Quantity</TableCell>
          <TableCell colSpan={1} variant="head">Value</TableCell>
        </TableRow>
        {details.reagent_items.map((row) => (
          <TableRow key={row._id}>
            <TableCell colSpan={1}><Avatar alt="Item Icon" variant="rounded" src={row.icon}/></TableCell>
            <TableCell colSpan={1}>{row.name.en_GB}</TableCell>
            <TableCell colSpan={1}>{row.ticker}</TableCell>
            <TableCell colSpan={1} align="right" >{(row.value / row.quantity).toFixed(2)}</TableCell>
            <TableCell colSpan={1} align="right" >{row.quantity}</TableCell>
            <TableCell colSpan={1} align="right" >{row.value.toFixed(2)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={1}/>
          <TableCell colSpan={1}/>
          <TableCell colSpan={1} align="right" variant="head">Queue Cost</TableCell>
          <TableCell colSpan={1} align="left">{details.queue_cost}</TableCell>
          <TableCell colSpan={1} align="right" variant="head">Queue Quantity</TableCell>
          <TableCell colSpan={1} align="left">{details.queue_quantity}</TableCell>
        </TableRow>
      </Fragment>
    )
  }

  if (type === ValuationTypes.MARKET) {
    return (
      <Fragment>
        <TableRow key={0}>
          <TableCell colSpan={3} align="right">Minimal Price</TableCell>
          <TableCell colSpan={3} align="right">{details.min_price}</TableCell>
        </TableRow>
        <TableRow key={1}>
          <TableCell colSpan={3} align="right">Quantity</TableCell>
          <TableCell colSpan={3} align="right">{details.quantity}</TableCell>
        </TableRow>
        <TableRow key={2}>
          <TableCell colSpan={3} align="right">Open Interest</TableCell>
          <TableCell colSpan={3} align="right">{details.open_interest.toLocaleString('ru-RU')}</TableCell>
        </TableRow>
        <TableRow key={3}>
          <TableCell colSpan={3} align="right">Orders</TableCell>
          <TableCell colSpan={3} align="right">{details.orders.length}</TableCell>
        </TableRow>
      </Fragment>
    )
  }

  return <></>
}

export default ItemDetailsTable;
