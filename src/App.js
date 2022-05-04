import React, { useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Trade from './components/UI/Trade';
import StockProvider from './store/StockProvider';

function App() {

  const [showTrade, setShowTrade] = useState(false)
  const [stock, setStock] = useState()


  const showTradeHandler = () => {
    setShowTrade(true)
  }

  const closeTradeHandler = () => {
    console.log('Close Trade')
    setShowTrade(false)
  }

  const raiseStock = (stock) => {
    setStock(stock)
  }

  return (
    <StockProvider>
      {showTrade && <Trade onCloseTrade={closeTradeHandler} stock={stock} />}
      <CardList
        onShowTrade={showTradeHandler}
        raiseStock={raiseStock}
      />
    </StockProvider>

  );
}

export default App;
