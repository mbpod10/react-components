import React from 'react'
import Modal from './Modal'
import ModalForm from './ModalForm';

import classes from "./Trade.module.css"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Trade = (props) => {
  return (
    <Modal onCloseTrade={props.onCloseTrade}>
      <h3>Trade</h3>
      <div className={classes.container}>
        {props.stock.owned ?
          <>
            <h6>
              You Own {props.stock.amount}{" "}
              Shares Worth ${(props.stock.amount * props.stock.price).toFixed(2)}
            </h6>
            <h6>
              <FontAwesomeIcon
                style={{ color: 'green' }}
                icon={faCheck}
                size="2x" />
            </h6>
          </> : <>
            <h6> You don't own this stock</h6>
            <h6>
              <FontAwesomeIcon
                style={{ color: 'green' }}
                icon={faPlusCircle}
                size="2x" />
            </h6>
          </>
        }
      </div>


      <ModalForm
        onCloseTrade={props.onCloseTrade}
        stock={props.stock}
      />
      <Button className={classes.button} onClick={props.onCloseTrade}>Close</Button>
    </Modal>
  )
}

export default Trade