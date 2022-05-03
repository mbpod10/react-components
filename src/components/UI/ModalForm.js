import React, { useContext, useRef } from 'react'
import classes from "./ModalForm.module.css"

import StockContext from '../../store/stock-context';
import Form from 'react-bootstrap/Form';

const ModalForm = (props) => {
  const amount = useRef(props.stock.amount)
  const { changeAmount } = useContext(StockContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    changeAmount(props.stock.id, amount)
    props.onCloseTrade()
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <div className={classes['formContainer']}>
        <div className={classes.symbol}>
          <Form.Label htmlFor="text">Symbol</Form.Label>
          <Form.Control type="text" id="text" placeholder={`${props.stock.symbol}`} />
        </div>
        <div> {props.stock.name} </div>
        <div>
          <input ref={amount} type='number' min='0' />
        </div>
        <button type='submit'>Buy</button>
      </div>
    </Form>

  )
}

export default ModalForm