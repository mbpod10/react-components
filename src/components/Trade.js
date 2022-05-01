import React from 'react'
import Modal from './UI/Modal'

import Button from 'react-bootstrap/Button';
const Trade = (props) => {
  return (
    <Modal onCloseTrade={props.onCloseTrade}>
      <h3>Trade</h3>
      <Button onClick={props.onCloseTrade}>Close</Button>
    </Modal>
  )
}

export default Trade