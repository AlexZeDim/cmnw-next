import React, { FC, Fragment } from 'react';
import { itemDetailsTable } from '../../types/components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { ValuationTypes } from '../../types/enums';
import { TableContainer } from '@material-ui/core';


const ItemDetailsTable: FC<itemDetailsTable> = ({ type, details, colspan }) => {

  if (type === ValuationTypes.DERIVATIVE) {
    return (
      <Fragment>
        <TableContainer>
          <Table size="small" aria-label="Reagents">
            <TableHead>
              <TableRow>
                <TableCell align="right">Queue Cost</TableCell>
                <TableCell align="right">{details.queue_cost}</TableCell>
                <TableCell align="right">Queue Quantity</TableCell>
                <TableCell align="right">{details.queue_quantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Ticker</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.reagent_items.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="right">{row.name.en_GB}</TableCell>
                  <TableCell align="right">{row.ticker}</TableCell>
                  <TableCell align="right">{(row.value / row.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.value.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
