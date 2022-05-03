import React from 'react'

const StockContext = React.createContext({
  stocks: [],
  changeAmount: (id, amount) => { },
  toggleOwned: (id) => { },
  makeAPICall: () => { },
  successAPICall: () => { },
  loading: null,
  error: null
})

export default StockContext