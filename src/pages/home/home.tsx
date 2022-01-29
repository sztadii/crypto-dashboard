import './home.css'
import { useQuery } from 'react-query'
import { useContext } from '../../context'

export default function Home() {
  const context = useContext()
  const query = useQuery('home', () => context.coinGeckoService.findExchanges())
  const { data: exchanges } = query

  return (
    <div className="home">
      <h1>Home page</h1>
      {exchanges?.map(e => {
        return <div key={e.name}>{e.name}</div>
      })}
    </div>
  )
}
