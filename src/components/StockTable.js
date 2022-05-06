import React from 'react'

import classes from './StockTable.module.css'
import Table from 'react-bootstrap/Table';

const StockTable = (props) => {
  return (
    <div className={classes.table}>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Trade</th>
            <th>Price</th>
            <th>Owned</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </Table>
    </div>
  )
}

export default StockTable