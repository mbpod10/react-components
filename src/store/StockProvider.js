import { useReducer, useCallback } from "react";

import StockContext from "./stock-context";

const defaultStockState = {
  stocks: [],
  stockListLoading: false,
  transactionLoading: false,
  error: false,
  totalMoney: 0,
  pageNumber: 1,
  transactionBool: false
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

    let newStocks = []
    if (state.stocks.length && action.data.length && state.stocks[0].id === action.data[0].id) {
      newStocks = state.stocks
    }
    else {
      newStocks = state.stocks.concat(action.data)
    }

    return {
      ...state,
      stockListLoading: false,
      stocks: newStocks
    }
  }

  if (action.type === "AMOUNT_CHANGED") {
    state.transactionBool = true
    const amount = parseInt(action.amount, 10)
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const beforeAmount = stock.amount

    let totalAmount
    let updatedStock

    if (action.transaction === "sell") {
      totalAmount = beforeAmount - amount
      if (totalAmount === 0) {
        updatedStock = { ...stock, amount: totalAmount, owned: false }
      }
      else {
        updatedStock = { ...stock, amount: totalAmount }
      }
    }
    if (action.transaction === "buy") {
      totalAmount = beforeAmount + amount
      updatedStock = { ...stock, amount: totalAmount, owned: true }
    }

    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return {
      ...state,
      stocks: updatedStocks,
      error: null,
      stockListLoading: false,
      transactionLoading: false,
      transactionBool: false
    }
  }
  if (action.type === "ERROR") {
    if (action.handler === 'transaction') return { ...state, error: action.error, transactionLoading: false }
  }
  if (action.type === "CLOSE_ALL_ERRORS") {
    return { ...state, error: false, stockListLoading: false, transactionLoading: false, }
  }
  if (action.type === "NEXT_PAGE") {
    let nextPage = state.pageNumber + 1
    return {
      ...state,
      pageNumber: nextPage
    }
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

  const nextPageHandler = useCallback(() => {
    dispatch({ type: "NEXT_PAGE" })
  }, [])

  const stockContext = {
    stocks: stockState.stocks,
    stockListLoading: stockState.stockListLoading,
    transactionLoading: stockState.transactionLoading,
    error: stockState.error,
    totalMoney: stockState.totalMoney,
    pageNumber: stockState.pageNumber,
    transactionBool: stockState.transactionBool,
    changeAmount: changeAmountHandler,
    toggleOwned: toggleOwnedHandler,
    makeAPICall: makeAPICallHandler,
    successAPICall: successAPICallHandler,
    failureAPICall: failureAPICallHandler,
    closeErrors: closeErrorsHandler,
    nextPage: nextPageHandler,
  }

  return (
    <StockContext.Provider value={stockContext}>
      {props.children}
    </StockContext.Provider>
  )

}

export default StockProvider