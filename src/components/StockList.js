import React, { useEffect, useContext } from 'react'

import axios from 'axios'
import Table from 'react-bootstrap/Table';
import classes from "./StockList.module.css"

import CartContext from "../store/stock-context"
import StockListRow from './StockListRow';
import Loader from './UI/Loader';

let internationalNumberFormat = new Intl.NumberFormat('en-US')

const StockList = (props) => {

  const { makeAPICall, successAPICall, stockListLoading, stocks } = useContext(CartContext)

  const totalMoneyAmount = stocks.reduce((currentStock, stock) => {
    return currentStock + (stock.price * stock.amount)
  }, 0)

  useEffect(() => {
    makeAPICall('list')
    const makeAPICallUse = async () => {
      try {
        const response = await axios.get('http://localhost:4001/stocks');
        successAPICall(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICallUse()
  }, [makeAPICall, successAPICall])

  const raiseStock = (id) => {
    let formStock = stocks.filter((stock) => {
      return stock.id === id
    })
    props.raiseStock(formStock[0])
  }

  const cardMapList = stocks.map((element) => {
    return (
      <StockListRow
        stock={element}
        key={element.id}
        onShowTrade={props.onShowTrade}
        onCloseTrade={props.onCloseTrade}
        raiseStock={raiseStock}
      />
    )
  })

  return (
    <>
      <div className={classes.heading}>
        <h1 className={classes['heading__title']}>S&P 500 Companies</h1>
        <p>${internationalNumberFormat.format(totalMoneyAmount)}</p>
      </div>
      {stockListLoading ? <Loader /> :
        <div className={classes.table}>
          {/* <Table responsive="xl" variant="dark"> */}
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
              {cardMapList}
            </tbody>
          </Table>
        </div>
      }
    </>
  )
}

export default StockList