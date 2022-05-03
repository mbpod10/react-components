import React, { useRef } from 'react'

import classes from './CardForm.module.css'

const CardForm = (props) => {
  // console.log(props)
  const amount = useRef(props.amount)

  const submitHandler = (event) => {
    event.preventDefault()
    props.dispatch({ type: 'AMOUNT_CHANGED', id: props.id, amount: amount })
  }

  const onTradeClick = (event) => {
    event.preventDefault()
    props.onShowTrade()
    props.raiseStock(props.id)
  }

  return (
    // <form onSubmit={submitHandler}>
    //   <div className={classes['flex-container']}>
    //     <div>
    //       <input
    //         ref={amount}
    //         type='number'
    //         min='0'
    //       />
    //     </div>
    //     <div>
    // <button onClick={onTradeClick}>
    //   Trade
    // </button>
    //       Own ${(props.price * props.amount).toFixed(2)}
    //     </div>

    //   </div>
    // </form >
    <div>

      <button onClick={onTradeClick}>
        Trade
      </button>

    </div>
  )
}

export default CardForm