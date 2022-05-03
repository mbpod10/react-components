import { useReducer, useCallback } from "react";

import StockContext from "./stock-context";
import axios from "axios";

const defaultStockState = {
  stocks: [],
  loading: false,
  error: null
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
    const amount = action.amount.current.value
    const indexOfUpdatedItem = findStockIndex(state.stocks, action.id)
    const stock = state.stocks[indexOfUpdatedItem]
    const updatedStock = { ...stock, amount: amount }
    try {
      axios.post(`http://localhost:4001/stocks/${action.id}`,
        { amount: amount })
    } catch (error) {
      console.error(error);
    }
    let updatedStocks = [...state.stocks]
    updatedStocks[indexOfUpdatedItem] = updatedStock

    return {
      ...state,
      stocks: updatedStocks
    }
  }
}

const StockProvider = (props) => {
  const [stockState, dispatch] = useReducer(dataReducer, defaultStockState)

  const toggleOwnedHandler = (id) => {
    dispatch({ type: 'OWNED_TOGGLE', id: id })
  }

  const changeAmountHandler = (id, amount) => {
    dispatch({ type: 'AMOUNT_CHANGED', id: id, amount: amount })
  }

  const makeAPICallHandler = useCallback(() => {
    dispatch({ type: "MAKE_API_CALL" })
  }, [])

  const successAPICallHandler = useCallback((data) => {
    dispatch({ type: "SUCCESS", data: data })
  }, [])

  const stockContext = {
    stocks: stockState.stocks,
    changeAmount: changeAmountHandler,
    toggleOwned: toggleOwnedHandler,
    makeAPICall: makeAPICallHandler,
    successAPICall: successAPICallHandler,
    loading: stockState.loading,
    error: stockState.error
  }

  return (
    <StockContext.Provider value={stockContext}>
      {props.children}
    </StockContext.Provider>
  )

}

export default StockProvider