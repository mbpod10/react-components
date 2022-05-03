import { useReducer, useCallback } from "react";

import StockContext from "./stock-context";
import axios from "axios";

const defaultStockState = {
  stocks: [],
  loading: false,
  error: false,
  totalMoney: 0
}

const findStockIndex = (array, id) => {
  const returnIndex = array.findIndex(
    (stock) => stock.id === id)
  return returnIndex
}

const dataReducer = (state, action) => {

  if (action.type === "MAKE_API_CALL") {
    return {
      ...state,
      loading: true
    }
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      stocks: action.data
    }
  }

  if (action.type === "OWNED_TOGGLE") {
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const updatedStock = { ...stock, owned: !stock.owned }
    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    const ownedBool = stock.owned

    try {
      axios.post(`http://localhost:4001/stocks/update/${action.id}`,
        { owned: ownedBool })
    } catch (error) {
      console.error(error);
    }

    return {
      ...state,
      stocks: updatedStocks
    }
  }
  if (action.type === "AMOUNT_CHANGED") {
    console.log(action.amount.current.value)
    if (!action.amount.current.value) {
      return {
        ...state,
        error: "Please enter a valid number"
      }
    }
    const amount = parseInt(action.amount.current.value, 10)
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const beforeAmount = stock.amount

    let totalAmount

    if (action.transaction === "sell") {
      totalAmount = beforeAmount - amount
      if (totalAmount === 0) totalAmount = 0
      if (totalAmount < 0) {
        return {
          ...state,
          error: `You only have ${stock.amount} shares to sell`
        }
      }
    }

    if (action.transaction === "buy") {
      totalAmount = beforeAmount + amount
    }

    const updatedStock = { ...stock, amount: totalAmount }
    try {
      axios.post(`http://localhost:4001/stocks/${action.id}`,
        { amount: totalAmount })
    } catch (error) {
      console.error(error);
      return { ...state, error: error }
    }
    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return {
      ...state,
      stocks: updatedStocks,
      error: false
    }
  }
  return {
    ...state,
    error: false
  }
}

const StockProvider = (props) => {
  const [stockState, dispatch] = useReducer(dataReducer, defaultStockState)

  const toggleOwnedHandler = (id) => {
    dispatch({ type: 'OWNED_TOGGLE', id: id })
  }

  const changeAmountHandler = (id, amount, transaction) => {
    dispatch({ type: 'AMOUNT_CHANGED', id: id, amount: amount, transaction: transaction })
  }

  const makeAPICallHandler = useCallback(() => {
    dispatch({ type: "MAKE_API_CALL" })
  }, [])

  const successAPICallHandler = useCallback((data) => {
    dispatch({ type: "SUCCESS", data: data })
  }, [])

  const stockContext = {
    stocks: stockState.stocks,
    loading: stockState.loading,
    error: stockState.error,
    totalMoney: stockState.totalMoney,
    changeAmount: changeAmountHandler,
    toggleOwned: toggleOwnedHandler,
    makeAPICall: makeAPICallHandler,
    successAPICall: successAPICallHandler
  }

  return (
    <StockContext.Provider value={stockContext}>
      {props.children}
    </StockContext.Provider>
  )

}

export default StockProvider