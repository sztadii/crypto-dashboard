import './home.css'
import { useEffect, useState } from 'react'
import { Exchange } from '../../services/coin-gecko-service.types'
import { useContext } from '../../context'

export default function Home() {
  const context = useContext()
  const [exchanges, setExchanges] = useState<Exchange[]>([])

  useEffect(() => {
    context.coinGeckoService.findExchanges().then(exchanges => {
      setExchanges(exchanges)
    })
  }, [context])

  return (
    <div className="home">
      <h1>Home page</h1>
      {exchanges.map(e => {
        return <div key={e.name}>{e.name}</div>
      })}
    </div>
  )
}
