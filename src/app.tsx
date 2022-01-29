import React, { useEffect } from 'react'
import './app.css'
import CoinGeckoService from './services/coin-gecko-service'

function App() {
  useEffect(() => {
    const coinGeckoService = new CoinGeckoService()
    coinGeckoService.findExchanges().then(console.log)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
