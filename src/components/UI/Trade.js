import React from 'react'
import Modal from './Modal'
import ModalForm from './ModalForm';

import classes from "./Trade.module.css"
import Button from 'react-bootstrap/Button';

const Trade = (props) => {
  return (
    <Modal onCloseTrade={props.onCloseTrade}>
      <h3>Trade</h3>
      <ModalForm
        onCloseTrade={props.onCloseTrade}
        stock={props.stock}
      />
      <Button className={classes.button} onClick={props.onCloseTrade}>Close</Button>
    </Modal>
  )
}

export default Trade