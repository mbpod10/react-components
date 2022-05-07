import React from 'react'
import classes from '../CSS/Modal.module.css'
import ReactDOM from 'react-dom';


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseTrade} />
}

const ModalOverlay = (props) => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseTrade={props.onCloseTrade} />,
        document.getElementById('overlays')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children} </ModalOverlay>,
        document.getElementById('overlays')
      )}
    </React.Fragment>
  )
}

export default Modal