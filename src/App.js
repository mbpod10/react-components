import React, { useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Trade from './components/Trade';


function App() {

  const [showTrade, setShowTrade] = useState(false)
  const [stock, setStock] = useState()


  const showTradeHandler = () => {
    setShowTrade(true)
  }

  const closeTradeHandler = () => {
    setShowTrade(false)
  }

  const raiseStock = (stock, func) => {
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
