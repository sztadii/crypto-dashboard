import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import classes from './home.module.scss'

export default function Home() {
  const context = useContext()
  const query = useQuery('home', () => context.coinGeckoService.findExchanges())

  function renderExchangeList() {
    const { data: exchanges, isLoading, isError } = query

    if (isLoading) return <Spinner />
    if (isError) return 'Something went wrong'
    if (!exchanges?.length) return 'No data to display'

    return exchanges.map(exchange => {
      const detailsPagePath = routes.details.getPath(exchange.id)
      return (
        <Link
          to={detailsPagePath}
          key={exchange.name}
          className={classes.homeItem}
          data-testid="exchange-item"
        >
          <img
            className={[
              classes.homeIcon,
              classes.homeItemSection,
              'no-border'
            ].join(' ')}
            src={exchange.image}
            alt={exchange.name}
          />

          <div className={classes.homeItemSection}>{exchange.name}</div>
          <div className={classes.homeItemSection}>{exchange.country}</div>
          <div className={[classes.homeItemSection, 'no-border'].join(' ')}>
            {exchange.trust_score_rank}
          </div>

          <a
            href={exchange.url}
            target="_blank"
            rel="noreferrer"
            className={classes.homeExternalLink}
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
