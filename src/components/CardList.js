import React, { useEffect, useContext } from 'react'

import axios from 'axios'

import CartContext from "../store/stock-context"
import SingleCard from './SingleCard'
import classes from './CardList.module.css'
import Loader from "./UI/Loader"

let internationalNumberFormat = new Intl.NumberFormat('en-US')

const CardList = (props) => {

  const { makeAPICall, successAPICall, loading, stocks } = useContext(CartContext)

  const totalMoneyAmount = stocks.reduce((currentStock, stock) => {
    return currentStock + (stock.price * stock.amount)
  }, 0)

  useEffect(() => {
    makeAPICall()
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
      <SingleCard
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
      <div className={classes['main-container']}>
        <div className={classes.heading}>
          <h1 className={classes['heading__title']}>S&P 500 Companies</h1>
          <p>${internationalNumberFormat.format(totalMoneyAmount)}</p>
        </div>
        {loading ? <Loader /> : <div className={classes.cardList}> {cardMapList} </div>}
      </div>
    </>
  )
}

export default CardList