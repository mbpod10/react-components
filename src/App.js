import React, { useContext, useState, useRef } from 'react';
import './App.css';
import StockList from './components/StockList';
import Trade from './components/UI/Trade';
import CartContext from "./store/stock-context"

function App() {
  const { closeErrors } = useContext(CartContext)
  const [showTrade, setShowTrade] = useState(false)
  const [stock, setStock] = useState()


  const showTradeHandler = useRef(() => {
    setShowTrade(true)
  }, [])

  const closeTradeHandler = useRef(() => {
    setShowTrade(false)
    closeErrors()
  }, [])

  const raiseStock = useRef((stock) => {
    setStock(stock)
  }, [])

  return (
    <>
      {showTrade && <Trade onCloseTrade={closeTradeHandler} stock={stock} />}
      <StockList onShowTrade={showTradeHandler} raiseStock={raiseStock} />
    </>

  );
}

export default App;
