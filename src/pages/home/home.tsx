import './home.css'
import { useEffect } from 'react'
import CoinGeckoService from '../../services/coin-gecko-service'

export default function Home() {
  useEffect(() => {
    const coinGeckoService = new CoinGeckoService()
    coinGeckoService.findExchanges().then(console.log)
  }, [])

  return (
    <div className="home">
      <h1>Home page</h1>
    </div>
  )
}
