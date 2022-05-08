import React, { useContext } from 'react'

import classes from './CSS/StockTable.module.css'
import Table from 'react-bootstrap/Table';
import StockContext from "../store/stock-context"

const StockTable = (props) => {

  const { changeOrderBy } = useContext(StockContext)

  const changeFilterHandler = (name) => {
    console.log(name)
    changeOrderBy(name)
  }

  return (
    <div className={classes.table}>
      <Table responsive="xl">
        <thead>
          <tr>
            <th className={classes.click} onClick={() => changeFilterHandler('symbol')}>Symbol</th>
            <th className={classes.click} onClick={() => changeFilterHandler('name')}>Name</th>
            <th>Trade</th>
            <th className={classes.click} onClick={() => changeFilterHandler('price')}>Price</th>
            <th>Owned</th>
            <th className={classes.click} onClick={() => changeFilterHandler('amount')}>Amount</th>
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