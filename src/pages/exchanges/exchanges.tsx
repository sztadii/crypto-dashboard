import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import classes from './exchanges.module.scss'

export default function Exchanges() {
  const context = useContext()
  const exchangesResponse = useQuery('exchanges', () =>
    context.coinGeckoService.findExchanges()
  )

  function renderExchangeList() {
    const { data: exchanges, isLoading, isError } = exchangesResponse

    if (isLoading) return <Spinner />
    if (isError) return <p>Something went wrong</p>
    if (!exchanges?.length) return <p>No data to display</p>

    return (
      <div className="row">
        {exchanges.map(exchange => {
          const pathToDetailsPage = routes.exchangeDetails.getPath(exchange.id)
          return (
            <div className="col col-12 col-md-6 col-lg-12" key={exchange.name}>
              <Link
                to={pathToDetailsPage}
                className={classes.listItem}
                data-testid="exchange-item"
              >
                <img
                  className={`${classes.listIcon} ${classes.listItemSection} no-border`}
                  src={exchange.image}
                  alt={exchange.name}
                />

                <span className={classes.listItemSection}>{exchange.name}</span>
                <span className={classes.listItemSection}>
                  {exchange.country}
                </span>
                <span className={`${classes.listItemSection} no-border`}>
                  <strong>Trust score:</strong> {exchange.trust_score_rank}
                </span>

                <a
                  href={exchange.url}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.externalLink}
                  onClick={e => e.stopPropagation()}
                >
                  Official website
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <h1>Exchanges</h1>

      <hr className="mb-3" />

      {renderExchangeList()}
    </div>
  )
}
