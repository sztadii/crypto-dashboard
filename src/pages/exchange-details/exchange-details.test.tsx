import td from 'testdouble'
import { screen, render } from '@testing-library/react'
import { ContextType } from 'context'
import { routes } from 'router'
import App from 'app'

describe('exchange-details component', () => {
  it('when we render the component then display the "Back to home" link', async () => {
    const initialPath = routes.exchangeDetails.getPath('binance')

    render(<App initialPath={initialPath} />)

    expect(await screen.findByText('Back to home')).toBeVisible()
  })

  it('when the exchange item is fetching then display a loading', async () => {
    const initialPath = routes.exchangeDetails.getPath('binance')

    render(<App initialPath={initialPath} />)

    expect(await screen.findByTestId('spinner')).toBeVisible()
  })

  it('when we receive an error then display a warning', async () => {
    const initialPath = routes.exchangeDetails.getPath('binance')
    const context = td.object<ContextType>()

    td.when(context.coinGeckoService.getExchange('binance')).thenReject(
      new Error('Status 404')
    )

    render(<App initialPath={initialPath} context={context} />)

    expect(await screen.findByText('Something went wrong')).toBeVisible()
  })

  it('when we fetched the exchange then render its details', async () => {
    const initialPath = routes.exchangeDetails.getPath('binance')
    const context = td.object<ContextType>()

    td.when(context.coinGeckoService.getExchange('binance')).thenResolve({
      name: 'Bitcoin',
      country: 'Poland',
      trust_score_rank: 1,
      year_established: 2022,
      description: 'Some desc',
      facebook_url: 'https://facebook.com/profile',
      reddit_url: 'https://redit.com/profile',
      slack_url: 'https://slack.com/profile',
      telegram_url: 'https://telegram.com/profile',
      twitter_handle: 'twitter-profile'
    })

    render(<App initialPath={initialPath} context={context} />)

    expect(await screen.findByText('Bitcoin')).toBeVisible()
    expect(await screen.findByText('Poland')).toBeVisible()
    expect(await screen.findByText('1')).toBeVisible()
    expect(await screen.findByText('2022')).toBeVisible()
    expect(await screen.findByText('Some desc')).toBeVisible()
    expect(
      await screen.findByText('https://facebook.com/profile')
    ).toBeVisible()
    expect(await screen.findByText('https://redit.com/profile')).toBeVisible()
    expect(await screen.findByText('https://slack.com/profile')).toBeVisible()
    expect(
      await screen.findByText('https://telegram.com/profile')
    ).toBeVisible()
    expect(await screen.findByText('twitter-profile')).toBeVisible()
  })
})
