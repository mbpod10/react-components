import React from 'react'

const StockContext = React.createContext({
  stocks: [],
  changeAmount: (item) => { },
  removeItem: (id) => { }
})

export default StockContext