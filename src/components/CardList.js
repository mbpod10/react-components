import React from 'react'
import SingleCard from './SingleCard'
import { data } from './Data'
import classes from './CardList.module.css'

const CardList = () => {
  console.log(data)

  const cardMapList = data.map((element, index) => {
    return (
      <SingleCard
        name={element.name}
        symbol={element.symbol}
        weighting={element.weighting}
        owned={element.owned}
        key={element.key}
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