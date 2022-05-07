import React, { useContext, useRef, useCallback } from 'react'

import useStockPaginate from '../store/useStockPaginate';

import classes from "./CSS/StockList.module.css"
import StockTable from './StockTable';
import StockContext from "../store/stock-context"
import StockListRow from './StockListRow';
import Loader from './UI/Loader';
import useMoneyAmount from '../store/useMoneyAmount'

const StockList = (props) => {

  // THIS DOESN'T WORK BC IT ONLY RETURNS THE TOTAL OF RENDERED STOCKS
  // NOT THE TOTAL AMOUNT OF MONEY OWNED THROUGH AN API CALL
  const { totalAmount } = useMoneyAmount()
  const { stockListLoading, stocks, pageNumber, nextPage } = useContext(StockContext)
  const { hasMore } = useStockPaginate(pageNumber)
  const observer = useRef()

  const lastStockElement = useCallback(node => {
    if (stockListLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        nextPage()
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [stockListLoading, hasMore, nextPage])


  const raiseStock = (id) => {
    let formStock = stocks.filter((stock) => {
      return stock.id === id
    })
    props.raiseStock(formStock[0])
  }

  const cardMapList = stocks.map((element, index) => {
    if (stocks.length === index + 1) {
      return (
        <tr ref={lastStockElement} key={element.id}>
          <StockListRow stock={element} onShowTrade={props.onShowTrade}
            onCloseTrade={props.onCloseTrade} raiseStock={raiseStock} />
        </tr>)
    }
    else {
      return (
        <tr key={element.id}>
          <StockListRow stock={element} onShowTrade={props.onShowTrade}
            onCloseTrade={props.onCloseTrade} raiseStock={raiseStock} />
        </tr>)
    }
  })

  return (
    <>
      <div className={classes.heading}>
        <h1 className={classes['heading__title']}>S&P 500 Companies</h1>
        <p>{totalAmount}</p>
      </div>
      <StockTable >
        {cardMapList}
      </StockTable>
      {stockListLoading && <Loader />}
    </>
  )
}

export default StockList