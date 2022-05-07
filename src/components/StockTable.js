import React, { useContext } from 'react'

import classes from './CSS/StockTable.module.css'
import Table from 'react-bootstrap/Table';
import StockContext from "../store/stock-context"

const StockTable = (props) => {

  const { changeOrderBy } = useContext(StockContext)

  const changeFilterHandler = (name) => {
    console.log(name)
    // const filter = name.toLowerCase()
    changeOrderBy(name)
  }

  return (
    <div className={classes.table}>
      <Table responsive="xl">
        <thead>
          <tr>
            <th onClick={() => changeFilterHandler('symbol')}>Symbol</th>
            <th onClick={() => changeFilterHandler('name')}>Name</th>
            <th>Trade</th>
            <th onClick={() => changeFilterHandler('price')}>Price</th>
            <th>Owned</th>
            <th onClick={() => changeFilterHandler('amount')}>Amount</th>
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