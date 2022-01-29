import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import Spinner from 'components/spinner'
import './home.css'

export default function Home() {
  const context = useContext()
  const query = useQuery('home', () => context.coinGeckoService.findExchanges())

  function renderExchangeList() {
    const { data: exchanges, isLoading, isError } = query

    if (isLoading) return <Spinner />
    if (isError) return 'Something went wrong'
    if (!exchanges?.length) return 'No data to display'

    return exchanges.map(exchange => {
      const detailsPagePath = '/'
      return (
        <Link
          to={detailsPagePath}
          key={exchange.name}
          className="home__item"
          data-testid="exchange-item"
        >
          <img
            className="home__icon home__item-section no-border"
            src={exchange.image}
            alt={exchange.name}
          />

          <div className="home__item-section">{exchange.name}</div>
          <div className="home__item-section">{exchange.country}</div>
          <div className="home__item-section no-border">
            {exchange.trust_score_rank}
          </div>

          <a
            href={exchange.url}
            target="_blank"
            rel="noreferrer"
            className="home__external-link"
            onClick={e => e.stopPropagation()}
          >
            Link
          </a>
        </Link>
      )
    })
  }

  return (
    <div className="home">
      <h1>Exchanges</h1>

      {renderExchangeList()}
    </div>
  )
}
