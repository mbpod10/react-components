import React from 'react'

const StockContext = React.createContext({
  stocks: [],
  changeAmount: (id, amount) => { },
  toggleOwned: (id) => { },
  makeAPICall: (handler) => { },
  successAPICall: () => { },
  failureAPICall: (error, handler) => { },
  stockListLoading: null,
  transactionLoading: null,
  error: null,
  totalMoney: null
})

export default StockContext