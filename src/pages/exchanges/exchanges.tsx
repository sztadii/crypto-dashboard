import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import classes from './exchanges.module.scss'

export default function Exchanges() {
  const context = useContext()
  const query = useQuery('exchanges', () =>
    context.coinGeckoService.findExchanges()
  )

  function renderExchangeList() {
    const { data: exchanges, isLoading, isError } = query

    if (isLoading) return <Spinner />
    if (isError) return <p>Something went wrong</p>
    if (!exchanges?.length) return <p>No data to display</p>

    return exchanges.map(exchange => {
      const detailsPagePath = routes.exchangeDetails.getPath(exchange.id)
      return (
        <Link
          to={detailsPagePath}
          key={exchange.name}
          className={classes.listItem}
          data-testid="exchange-item"
        >
          <img
            className={[
              classes.icon,
              classes.listItemSection,
              'no-border'
            ].join(' ')}
            src={exchange.image}
            alt={exchange.name}
          />

          <div className={classes.listItemSection}>{exchange.name}</div>
          <div className={classes.listItemSection}>{exchange.country}</div>
          <div className={[classes.listItemSection, 'no-border'].join(' ')}>
            {exchange.trust_score_rank}
          </div>

          <a
            href={exchange.url}
            target="_blank"
            rel="noreferrer"
            className={classes.externalLink}
            onClick={e => e.stopPropagation()}
          >
            Link
          </a>
        </Link>
      )
    })
  }

  return (
    <div>
      <h1>Exchanges</h1>

      {renderExchangeList()}
    </div>
  )
}
