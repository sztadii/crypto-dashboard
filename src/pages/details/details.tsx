import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import classes from './details.module.scss'

export default function Details() {
  const homePath = routes.home.getPath()
  const params = useParams()
  const context = useContext()
  const query = useQuery(`details-${params.exchangeId}`, () =>
    context.coinGeckoService.getExchange(params.exchangeId!)
  )

  function renderContent() {
    const { data: exchange, isLoading, isError } = query

    if (isLoading) return <Spinner />
    if (isError) return 'Something went wrong'
    if (!exchange) return 'No data to display'

    return (
      <div className={classes.detailsContent}>
        <img
          className={classes.detailsImage}
          src={exchange.image}
          alt={exchange.name}
        />

        <div>
          <p>
            <strong>Name:</strong> {exchange.name}
          </p>
          <p>
            <strong>Country:</strong> {exchange.country}
          </p>
          <p>
            <strong>Trust score rank:</strong> {exchange.trust_score_rank}
          </p>
          <p>
            <strong>Year of establishment:</strong> {exchange.year_established}
          </p>
          <p>
            <strong>Description:</strong> {exchange.description || '-'}
          </p>
          <p>
            <strong>Facebook:</strong> {exchange.facebook_url || '-'}
          </p>
          <p>
            <strong>Reddit:</strong> {exchange.reddit_url || '-'}
          </p>
          <p>
            <strong>Slack:</strong> {exchange.slack_url || '-'}
          </p>
          <p>
            <strong>Telegram:</strong> {exchange.telegram_url || '-'}
          </p>
          <p>
            <strong>Twitter:</strong> {exchange.twitter_handle || '-'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link to={homePath}>
        <h1>Back to home</h1>
      </Link>
      {renderContent()}
    </div>
  )
}
