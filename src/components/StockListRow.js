import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from "./CSS/StockListRow.module.css"
import Button from 'react-bootstrap/Button';

function StockListRow(props) {

  const onTradeClick = (event) => {
    event.preventDefault()
    props.onShowTrade()
    props.raiseStock(props.stock.id)
  }


  return (
    <>
      <td className={`${classes.symbol} ${classes.odd}`}>{props.stock.id}${props.stock.symbol}</td>
      <td className={classes.even}>{props.stock.name}</td>
      <td className={classes.odd}><Button onClick={onTradeClick}>Trade</Button></td>
      {/* <td className={classes.even}>${props.stock.price.toFixed(2)}</td> */}
      <td className={classes.even}>${props.stock.price}</td>
      <td className={classes.odd}>
        {
          props.stock.owned ?
            <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} size="2x" />
            :
            <FontAwesomeIcon style={{ color: 'red' }} icon={faTimes} size="2x" />
        }
      </td>
      <td className={classes.even}>{props.stock.amount}</td>
    </>
  )
}

export default StockListRow