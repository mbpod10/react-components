import React from 'react'
import classes from './SingleCard.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SingleCard = (props) => {

  let owned = "Owned"
  let notOwned = "Not Owned"

  return (

    <Card className={classes.singlecard}>
      <Card.Header>{props.symbol}</Card.Header>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Weighting: {props.weighting}%
        </Card.Text>
        <Button variant="primary"
          className={props.owned ? classes.owned : classes.notOwned}>
          {props.owned ? owned : notOwned}
        </Button>
      </Card.Body>
    </Card>

  )
}

export default SingleCard