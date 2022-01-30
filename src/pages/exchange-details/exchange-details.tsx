import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'context'
import { routes } from 'router'
import Spinner from 'components/spinner'
import { ExchangeWithDetails } from 'services/coin-gecko-service.types'
import classes from './exchange-details.module.scss'

export default function ExchangeDetails() {
  const pathToExchangesPage = routes.exchanges.getPath()
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

    const mainDetailsToRender = [
      ['Country', exchange.country],
      ['Trust score rank', exchange.trust_score_rank],
      ['Year of establishment', exchange.year_established],
      ['Description', exchange.description]
    ]

    const socialDetailsToRender = getSocialDetails(exchange)

    return (
      <div className={classes.content}>
        <h1 data-testid="exchange-name">{exchange.name}</h1>

        <div className="row">
          <div className="col col-12 col-md-auto">
            <img
              className={classes.detailsImage}
              src={exchange.image}
              alt={exchange.name}
            />
          </div>

          <div className="col col-12 col-md">
            <div className="mb-3">
              <h2 className="mb-2">Main details</h2>

              {mainDetailsToRender.map(detail => {
                const [label, value] = detail
                return (
                  <p key={label}>
                    <strong>{label}:</strong> {value || '-'}
                  </p>
                )
              })}
            </div>

            <div>
              <h2 className="mb-2">Social</h2>

              <div className="row">
                {socialDetailsToRender.map(detail => {
                  const [iconName, link] = detail
                  return (
                    <div className="col-auto mt-1" key={iconName}>
                      <a
                        data-testid={link}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i
                          data-testid="social-icon"
                          className={`bi bi-${iconName}`}
                        />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function getSocialDetails(exchange: ExchangeWithDetails) {
    return [
      ['facebook', exchange.facebook_url],
      ['reddit', exchange.reddit_url],
      ['slack', exchange.slack_url],
      ['telegram', exchange.telegram_url],
      ['twitter', `https://twitter.com/${exchange.twitter_handle}`]
    ].filter(detail => {
      const link = detail[1]
      // Some links are broken or invalid
      // then to make links clickable we need to filter correct one
      return link.includes('http')
    })
  }

  return (
    <div>
      <Link to={pathToExchangesPage} className={classes.link}>
        Back to home
      </Link>

      {renderContent()}
    </div>
  )
}
