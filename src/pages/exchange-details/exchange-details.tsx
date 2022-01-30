import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import classes from './exchange-details.module.scss'

export default function ExchangeDetails() {
  const homePath = routes.exchanges.getPath()
  const params = useParams()
  const context = useContext()
  const exchangeResponse = useQuery(
    `exchange-details-${params.exchangeId}`,
    () => context.coinGeckoService.getExchange(params.exchangeId!)
  )

  function renderContent() {
    const { data: exchange, isLoading, isError } = exchangeResponse

    if (isLoading) return <Spinner />
    if (isError) return <p>Something went wrong</p>
    if (!exchange) return <p>No data to display</p>

    const detailsToRender = [
      ['Country', exchange.country],
      ['Trust score rank', exchange.trust_score_rank],
      ['Year of establishment', exchange.year_established],
      ['Description', exchange.description],
      ['Facebook', exchange.facebook_url],
      ['Reddit', exchange.reddit_url],
      ['Slack', exchange.slack_url],
      ['Telegram', exchange.telegram_url],
      ['Twitter', exchange.twitter_handle]
    ]

    return (
      <div className={classes.content}>
        <h1 data-testid="exchange-name">{exchange.name}</h1>

        <img
          className={classes.detailsImage}
          src={exchange.image}
          alt={exchange.name}
        />

        <div>
          {detailsToRender.map(detail => {
            const [label, value] = detail
            return (
              <p key={label}>
                <strong>{label}:</strong> {value || '-'}
              </p>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link to={homePath} className={classes.link}>
        Back to home
      </Link>

      {renderContent()}
    </div>
  )
}
