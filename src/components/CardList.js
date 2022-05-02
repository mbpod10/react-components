import React, { useReducer, useEffect } from 'react'

import axios from 'axios'

import SingleCard from './SingleCard'
import classes from './CardList.module.css'

// const ACTIONS = {
//   MAKE_API_CALL: "MAKE_API_CALL",
//   SUCCESS: "SUCCESS",
//   OWNED_TOGGLE: "OWNED_TOGGLE",
//   AMOUNT_CHANGED: "AMOUNT_CHANGED"
// }

const findStockIndex = (array, id) => {
  const returnIndex = array.findIndex(
    (stock) => stock.id === id)
  return returnIndex
}
const dataReducer = (state, action) => {

  if (action.type === "MAKE_API_CALL") {
    return {
      ...state,
      loading: true
    }
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      stocks: action.data
    }
  }

  if (action.type === "OWNED_TOGGLE") {
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const updatedStock = { ...stock, owned: !stock.owned }
    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    const ownedBool = stock.owned

    try {
      axios.post(`http://localhost:4001/stocks/update/${action.id}`,
        { owned: ownedBool })
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }

    return {
      ...state,
      stocks: updatedStocks
    }
  }
  if (action.type === "AMOUNT_CHANGED") {
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const updatedStock = { ...stock, amount: action.amount.current.value }
    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return {
      ...state,
      stocks: updatedStocks
    }
  }
}

const initialState = {
  stocks: [],
  loading: false,
  error: null
}


const CardList = (props) => {

  useEffect(() => {
    dispatch({ type: "MAKE_API_CALL" })
    const makeAPICall = async () => {
      try {
        const response = await axios.get('http://localhost:4001/stocks');
        dispatch({ type: "SUCCESS", data: response.data })
      } catch (error) {
        console.error(error);
      }
    }
    makeAPICall()
  }, [])

  const [dataState, dispatch] = useReducer(dataReducer, initialState)



  const raiseStock = (id) => {
    let formStock = dataState.stocks.filter((stock) => {
      return stock.id === id
    })
    props.raiseStock(formStock[0])
  }

  const cardMapList = dataState.stocks.map((element) => {
    return (
      <SingleCard
        stock={element}
        dispatch={dispatch}
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
        </div>
        {dataState.loading ?
          <div className={classes.loaderDiv}>
            <div className={classes.loader}></div>
          </div>
          :
          <div className={classes.cardList}>
            {cardMapList}
          </div>
        }
      </div>
    </>
  )
}

export default CardList