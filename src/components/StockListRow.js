// import React, { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import classes from "./StockListRow.module.css"
import Button from 'react-bootstrap/Button';

// import StockContext from '../store/stock-context';



function StockListRow(props) {

  // const stockCtx = useContext(StockContext)

  // const ownedToggleHandler = (id) => {
  //   stockCtx.toggleOwned(id)
  // }

  const onTradeClick = (event) => {
    event.preventDefault()
    props.onShowTrade()
    props.raiseStock(props.stock.id)
  }

  return (
    <tr>
      <td className={`${classes.symbol} ${classes.odd}`}>${props.stock.symbol}</td>
      <td className={classes.even}>{props.stock.name}</td>
      <td className={classes.odd}><Button onClick={onTradeClick}>Trade</Button></td>
      <td className={classes.even}>${props.stock.price.toFixed(2)}</td>
      <td className={classes.odd}> {props.stock.owned
        ?
        <FontAwesomeIcon
          // onClick={() => ownedToggleHandler(props.stock.id)}
          style={{ color: 'green' }}
          icon={faCheck}
          size="2x" />
        :
        <FontAwesomeIcon
          // onClick={() => ownedToggleHandler(props.stock.id)}
          style={{ color: 'red' }}
          icon={faPlusCircle}
          size="2x" />
      }
      </td>
      <td className={classes.even}>{props.stock.amount}</td>
    </tr>
  )
}

export default StockListRow