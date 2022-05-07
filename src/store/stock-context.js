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
  changeOrderBy: () => { },
  stockListLoading: null,
  transactionLoading: null,
  error: null,
  totalMoney: null,
  pageNumber: null,
  transactionBool: null,
  orderBy: null,
})

export default StockContext