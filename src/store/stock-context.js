import React from 'react'

const StockContext = React.createContext({
  stocks: [],
  changeAmount: (id, amount) => { },
  toggleOwned: (id) => { },
  makeAPICall: (handler) => { },
  successAPICall: () => { },
  failureAPICall: (error, handler) => { },
  closeErrors: () => { },
  nextPage: () => { },
  stockListLoading: null,
  transactionLoading: null,
  error: null,
  totalMoney: null,
  pageNumber: null
})

export default StockContext