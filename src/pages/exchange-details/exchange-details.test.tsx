import td from 'testdouble'
import { screen, render } from '@testing-library/react'
import { ContextType } from 'context'
import { routes } from 'router'
import App from 'app'

describe('exchange-details component', () => {
  it('when we render the component then display the "Back to home" link', async () => {
    const context = td.object<ContextType>()
    context.initialPath = routes.exchangeDetails.getPath('binance')

    render(<App context={context} />)

    expect(await screen.findByText('Back to home')).toBeVisible()
  })

  it('when the exchange item is fetching then display a loading', async () => {
    const context = td.object<ContextType>()
    context.initialPath = routes.exchangeDetails.getPath('binance')

    render(<App context={context} />)

    expect(await screen.findByTestId('spinner')).toBeVisible()
  })

  it('when we receive an error then display a warning', async () => {
    const context = td.object<ContextType>()
    context.initialPath = routes.exchangeDetails.getPath('binance')

    td.when(context.coinGeckoService.getExchange('binance')).thenReject(
      new Error('Status 404')
    )

    render(<App context={context} />)

    expect(await screen.findByText('Something went wrong')).toBeVisible()
  })

  it('when we fetched the exchange then render main details', async () => {
    const context = td.object<ContextType>()
    context.initialPath = routes.exchangeDetails.getPath('binance')

    td.when(context.coinGeckoService.getExchange('binance')).thenResolve({
      name: 'Bitcoin',
      country: 'Poland',
      trust_score_rank: 1,
      year_established: 2022,
      description: 'Some desc',
      url: '',
      facebook_url: '',
      reddit_url: '',
      slack_url: '',
      telegram_url: '',
      twitter_handle: ''
    })

    render(<App context={context} />)

    expect(await screen.findByText('Bitcoin')).toBeVisible()
    expect(await screen.findByText('Poland')).toBeVisible()
    expect(await screen.findByText('1')).toBeVisible()
    expect(await screen.findByText('2022')).toBeVisible()
    expect(await screen.findByText('Some desc')).toBeVisible()
  })

  it('when we fetched the exchange then display social icons ( not empty url )', async () => {
    const context = td.object<ContextType>()
    context.initialPath = routes.exchangeDetails.getPath('binance')

    td.when(context.coinGeckoService.getExchange('binance')).thenResolve({
      url: 'https://website.com',
      facebook_url: 'https://facebook.com/profile',
      reddit_url: '/web-xxd',
      slack_url: '',
      telegram_url: '',
      twitter_handle: 'twitter-profile'
    })

    render(<App context={context} />)

    expect(await screen.findByTestId('https://website.com')).toBeVisible()

    expect(
      await screen.findByTestId('https://facebook.com/profile')
    ).toBeVisible()
    expect(
      await screen.findByTestId('https://twitter.com/twitter-profile')
    ).toBeVisible()
    expect(
      await screen.findByTestId('https://reddit.com/web-xxd')
    ).toBeVisible()

    expect(await screen.findAllByTestId('social-icon')).toHaveLength(4)
  })
})
