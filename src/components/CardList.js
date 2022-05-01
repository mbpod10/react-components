import React, { useReducer } from 'react'
import SingleCard from './SingleCard'
import { data } from './Data'
import classes from './CardList.module.css'

const findStockIndex = (array, id) => {
  const returnIndex = array.findIndex(
    (stock) => stock.id === id)
  return returnIndex
}
const dataReducer = (state, action) => {

  if (action.type === "OWNED_TOGGLE") {

    const indexOfUpdatedItem = findStockIndex(state, action.id)

    const stock = state[indexOfUpdatedItem]
    const updatedStock = { ...stock, owned: !stock.owned }
    let updatedStocks = [...state]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return updatedStocks
  }
  if (action.type === "AMOUNT_CHANGED") {

    const indexOfUpdatedItem = findStockIndex(state, action.id)


    const stock = state[indexOfUpdatedItem]
    const updatedStock = { ...stock, amount: action.amount.current.value }
    let updatedStocks = [...state]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return updatedStocks
  }
}


const CardList = () => {

  const [dataState, dispatch] = useReducer(dataReducer, data)

  const cardMapList = dataState.map((element) => {
    return (
      <SingleCard stock={element} dispatch={dispatch} key={element.id} />
    )
  })

  return (
    <>
      <div className={classes['main-container']}>
        <div className={classes.heading}>
          <h1 className={classes['heading__title']}>S&P 500 Companies</h1>
        </div>
        <div className={classes.cardList}>
          {cardMapList}
        </div>
      </div>
    </>
  )
}

export default CardList