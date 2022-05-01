import React from 'react'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardForm from './CardForm';

import classes from './SingleCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const SingleCard = (props) => {

  let ownedText = "Owned"
  let notOwnedText = "Not Owned"

  const ownedToggleHandler = (id) => {
    props.dispatch({ type: 'OWNED_TOGGLE', id: id })
  }

  return (

    <Card className={classes.singlecard}>

      <Card.Header className={classes['card-container']}>
        <div>
          ${props.stock.symbol}
        </div>

        <div>
          {props.stock.owned ?
            <FontAwesomeIcon
              onClick={() => ownedToggleHandler(props.stock.id)}
              style={{ color: 'green' }}
              icon={faCheck}
              size="2x" /> :

            <FontAwesomeIcon
              onClick={() => ownedToggleHandler(props.stock.id)}
              style={{ color: 'red' }}
              icon={faPlusCircle}
              size="2x" />
          }
        </div>
      </Card.Header>



      <Card.Body>
        <Card.Title className={classes['card-title']}>
          {props.stock.name}
          <Button
            onClick={() => ownedToggleHandler(props.stock.id)}
            className={`${props.stock.owned ? classes.owned : classes.notOwned}`}
            variant="primary">
            {props.stock.owned ? ownedText : notOwnedText}
          </Button>
        </Card.Title>
        <Card.Text>${props.stock.price}
        </Card.Text>
      </Card.Body>

      <Card.Header>
        {props.stock.owned ?
          <CardForm
            price={props.stock.price}
            dispatch={props.dispatch}
            id={props.stock.id}
            amount={props.stock.amount}
            onShowTrade={props.onShowTrade}
          // onCloseTrade={props.onCloseTrade}
          /> :
          <div>Stock Not Owned</div>}
      </Card.Header>
    </Card>

  )
}

export default SingleCard