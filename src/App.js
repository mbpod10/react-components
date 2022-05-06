import React, { useContext, useState } from 'react';
import './App.css';
import StockList from './components/StockList';
import Trade from './components/UI/Trade';
import CartContext from "./store/stock-context"

function App() {
  const { closeErrors } = useContext(CartContext)
  const [showTrade, setShowTrade] = useState(false)
  const [stock, setStock] = useState()


  const showTradeHandler = () => {
    setShowTrade(true)
  }

  const closeTradeHandler = () => {
    setShowTrade(false)
    closeErrors()
  }

  const raiseStock = (stock) => {
    setStock(stock)
    showTradeHandler()
  }

  return (
    <>
      {showTrade && <Trade onCloseTrade={closeTradeHandler} stock={stock} />}
      <StockList onShowTrade={showTradeHandler} raiseStock={raiseStock} />
    </>

  );
}

export default App;
