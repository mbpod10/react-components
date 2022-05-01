import React, { useState } from 'react';

import './App.css';
import CardList from './components/CardList';
import Trade from './components/Trade';

function App() {

  const [showTrade, setShowTrade] = useState(false)

  const showTradeHandler = () => {
    setShowTrade(true)
  }

  const closeTradeHandler = () => {
    setShowTrade(false)
  }

  return (
    <>
      {showTrade && <Trade onCloseTrade={closeTradeHandler} />}
      <CardList
        onShowTrade={showTradeHandler}
      />
    </>

  );
}

export default App;
