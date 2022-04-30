import React from 'react'
import classes from './SingleCard.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SingleCard = (props) => {

  let ownedText = "Owned"
  let notOwnedText = "Not Owned"

  const ownedToggleHandler = (id) => {
    props.dispatch({ type: 'OWNED_TOGGLE', id: id })
  }

  return (

    <Card className={classes.singlecard}>
      <Card.Header>{props.symbol}</Card.Header>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Weighting: {props.weighting}%
        </Card.Text>

        <Button
          // onClick={() => ownedToggleHandler(props.id)}
          onClick={() => ownedToggleHandler(props.id)}
          className={`${props.owned ? classes.owned : classes.notOwned}`}
          variant="primary">
          {props.owned ? ownedText : notOwnedText}


        </Button>

      </Card.Body>
    </Card>

  )
}

export default SingleCard