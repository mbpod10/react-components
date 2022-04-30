import React from 'react'
import classes from './SingleCard.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
          {props.stock.symbol}
        </div>

        <div>
          {props.stock.owned ?
            <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} size="2x" /> :
            <FontAwesomeIcon style={{ color: 'red' }} icon={faPlusCircle} size="2x" />
          }
        </div>
      </Card.Header>



      <Card.Body>
        <Card.Title>{props.stock.name}</Card.Title>
        <Card.Text> Weighting: {props.stock.weighting}% </Card.Text>
        <Button
          onClick={() => ownedToggleHandler(props.stock.id)}
          className={`${props.stock.owned ? classes.owned : classes.notOwned}`}
          variant="primary">
          {props.stock.owned ? ownedText : notOwnedText}
        </Button>
      </Card.Body>
    </Card>

  )
}

export default SingleCard