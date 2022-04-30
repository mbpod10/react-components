import React, { useReducer } from 'react'
import SingleCard from './SingleCard'
import { data } from './Data'
import classes from './CardList.module.css'

const dataReducer = (state, action) => {
  if (action.type === "OWNED_TOGGLE") {

    const indexOfUpdatedItem = state.findIndex(
      (stock) => stock.id === action.id)

    const stock = state[indexOfUpdatedItem]
    const updatedStock = { ...stock, owned: !stock.owned }
    let updatedStocks = [...state]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return updatedStocks
  }
}


const CardList = () => {

  const [dataState, dispatch] = useReducer(dataReducer, data)

  const cardMapList = dataState.map((element, index) => {
    return (
      <SingleCard
        id={element.id}
        dispatch={dispatch}
        name={element.name}
        symbol={element.symbol}
        weighting={element.weighting}
        owned={element.owned}
        key={element.id}
      />
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