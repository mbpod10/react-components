import React, { useContext, useState, useRef, useCallback, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import useStockPaginate from '../store/useStockPaginate';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import classes from "./StockList.module.css"

import StockContext from "../store/stock-context"
// import StockListRow from './StockListRow';
import Loader from './UI/Loader';

let internationalNumberFormat = new Intl.NumberFormat('en-US')

const StockList = (props) => {

  const [pageNumber, setPageNumber] = useState(1)
  // const [pageNumber, setPageNumber] = useRef(1)
  const { hasMore } = useStockPaginate(pageNumber)
  const observer = useRef()

  const { stockListLoading, stocks } = useContext(StockContext)

  // console.log(stocks)

  const lastStockElement = useCallback(node => {
    // const lastStockElement = useMemo(node => {
    if (stockListLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    // console.log(node)
  }, [stockListLoading, hasMore])


  const raiseStock = (id) => {
    let formStock = stocks.filter((stock) => {
      return stock.id === id
    })
    props.raiseStock(formStock[0])
  }
  const onTradeClick = () => {

  }

  const cardMapList = stocks.map((element, index) => {

    if (stocks.length === index + 1) {
      return (
        // <StockListRow
        //   ref={lastStockElement}
        //   stock={element}
        //   key={element.id}
        //   onShowTrade={props.onShowTrade}
        //   onCloseTrade={props.onCloseTrade}
        //   raiseStock={raiseStock}
        // />
        <tr ref={lastStockElement} key={element.id}>
          <td className={`${classes.symbol} ${classes.odd}`}>{element.id}${element.symbol}</td>
          <td className={classes.even}>{element.name}</td>
          <td className={classes.odd}><Button onClick={onTradeClick}>Trade</Button></td>
          {/* <td className={classes.even}>${element.price.toFixed(2)}</td> */}
          <td className={classes.even}>${element.price}</td>
          <td className={classes.odd}> {element.owned
            ?
            <FontAwesomeIcon
              style={{ color: 'green' }}
              icon={faCheck}
              size="2x" />
            :
            <FontAwesomeIcon
              style={{ color: 'red' }}
              icon={faTimes}
              size="2x" />
          }
          </td>
          <td className={classes.even}>{element.amount}</td>
        </tr>
      )
    }
    else {
      return (
        <tr ref={lastStockElement} key={element.id}>
          <td className={`${classes.symbol} ${classes.odd}`}>{element.id}${element.symbol}</td>
          <td className={classes.even}>{element.name}</td>
          <td className={classes.odd}><Button onClick={onTradeClick}>Trade</Button></td>
          {/* <td className={classes.even}>${element.price.toFixed(2)}</td> */}
          <td className={classes.even}>${element.price}</td>
          <td className={classes.odd}> {element.owned
            ?
            <FontAwesomeIcon
              style={{ color: 'green' }}
              icon={faCheck}
              size="2x" />
            :
            <FontAwesomeIcon
              style={{ color: 'red' }}
              icon={faTimes}
              size="2x" />
          }
          </td>
          <td className={classes.even}>{element.amount}</td>
        </tr>
      )
    }
  })


  const totalMoneyAmount = stocks.reduce((currentStock, stock) => {
    return currentStock + (stock.price * stock.amount)
  }, 0)

  return (
    <>
      <div className={classes.heading}>
        <h1 className={classes['heading__title']}>S&P 500 Companies</h1>
        <p>${internationalNumberFormat.format(totalMoneyAmount)}</p>
      </div>
      {stockListLoading ? <Loader /> :
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
              {cardMapList}
            </tbody>
          </Table>
        </div>
      }
    </>
  )
}

export default StockList