import React, { useRef } from 'react'
import classes from "./ModalForm.module.css"

import Form from 'react-bootstrap/Form';

const ModalForm = (props) => {
  console.log(props)
  const amount = useRef(props.amount)
  return (
    <Form>
      <div className={classes['formContainer']}>
        <div className={classes.symbol}>
          <Form.Label htmlFor="text">Symbol</Form.Label>
          <Form.Control type="text" id="text" placeholder={`${props.stock.symbol}`} />
        </div>
        <div> {props.stock.name} </div>
        <div>
          <input ref={amount} type='number' min='0' />
        </div>
      </div>

    </Form>

  )
}

export default ModalForm