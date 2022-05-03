import React, { useContext, useRef } from 'react'
import classes from "./ModalForm.module.css"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import StockContext from '../../store/stock-context';
import Form from 'react-bootstrap/Form';


const ModalForm = (props) => {
  const amount = useRef(props.stock.amount)
  const { changeAmount, error } = useContext(StockContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    let transaction = event.nativeEvent.submitter.name
    changeAmount(props.stock.id, amount, transaction)
    if (error) {
      return
    }
    props.onCloseTrade()
  }

  return (
    <>
      <Form onSubmit={onSubmitHandler} className={classes.form}>

        <div className={classes['formContainer']}>
          <div className={classes.symbol}>
            <Form.Label htmlFor="text">Symbol</Form.Label>
            <Form.Control type="text" id="text" placeholder={`${props.stock.symbol}`} />
          </div>
          <div> {props.stock.name} </div>
        </div>

        <div className={classes['formContainer']}>
          <div>
            <Form.Label htmlFor="number">Shares{" "}</Form.Label>
            <input ref={amount} type='number' min='0' />
          </div>
          <Button name="buy" type='submit'>Buy</Button>
          <Button name='sell' type='submit'>Sell</Button>
        </div>
      </Form>
      {error && <Alert key="danger" variant="danger">{error}</Alert>}
    </>

  )
}

export default ModalForm