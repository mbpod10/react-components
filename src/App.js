import React, { useContext, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Trade from './components/UI/Trade';
// import StockProvider from './store/StockProvider';
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
  }

  return (
    <>
      {showTrade && <Trade onCloseTrade={closeTradeHandler} stock={stock} />}
      <CardList
        onShowTrade={showTradeHandler}
        raiseStock={raiseStock}
      />

    </>

  );
}

export default App;
