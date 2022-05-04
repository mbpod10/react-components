import { useReducer, useCallback } from "react";

import StockContext from "./stock-context";
import axios from "axios";

const defaultStockState = {
  stocks: [],
  stockListLoading: false,
  transactionLoading: false,
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
    if (action.handler === 'list') return { ...state, stockListLoading: true }
    if (action.handler === 'transaction') return { ...state, transactionLoading: true }
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      stockListLoading: false,
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

    const amount = parseInt(action.amount, 10)
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const beforeAmount = stock.amount

    let totalAmount

    if (action.transaction === "sell") {
      totalAmount = beforeAmount - amount
    }
    if (action.transaction === "buy") {
      totalAmount = beforeAmount + amount
    }

    const updatedStock = { ...stock, amount: totalAmount }

    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return {
      ...state,
      stocks: updatedStocks,
      error: null,
      stockListLoading: false,
      transactionLoading: false,
    }
  }
  if (action.type === "ERROR") {
    if (action.handler === 'transaction') return { ...state, error: action.error, transactionLoading: false }
  }
  if (action.type === "CLOSE_ALL_ERRORS") {
    return { ...state, error: false, stockListLoading: false, transactionLoading: false, }
  }
}

const StockProvider = (props) => {
  const [stockState, dispatch] = useReducer(dataReducer, defaultStockState)

  const failureAPICallHandler = (error, handler) => {
    dispatch({ type: "ERROR", error: error, handler: handler })
  }

  const toggleOwnedHandler = (id) => {
    dispatch({ type: 'OWNED_TOGGLE', id: id })
  }

  const changeAmountHandler = (id, amount, transaction) => {
    dispatch({ type: 'AMOUNT_CHANGED', id: id, amount: amount, transaction: transaction })
  }

  const makeAPICallHandler = useCallback((handler) => {
    dispatch({ type: "MAKE_API_CALL", handler: handler })
  }, [])

  const successAPICallHandler = useCallback((data) => {
    dispatch({ type: "SUCCESS", data: data })
  }, [])

  const closeErrorsHandler = () => {
    dispatch({ type: "CLOSE_ALL_ERRORS" })
  }

  const stockContext = {
    stocks: stockState.stocks,
    stockListLoading: stockState.stockListLoading,
    transactionLoading: stockState.transactionLoading,
    error: stockState.error,
    totalMoney: stockState.totalMoney,
    changeAmount: changeAmountHandler,
    toggleOwned: toggleOwnedHandler,
    makeAPICall: makeAPICallHandler,
    successAPICall: successAPICallHandler,
    failureAPICall: failureAPICallHandler,
    closeErrors: closeErrorsHandler
  }

  return (
    <StockContext.Provider value={stockContext}>
      {props.children}
    </StockContext.Provider>
  )

}

export default StockProvider