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
      country: 'Poland'
    })

    render(<App initialPath={initialPath} context={context} />)

    expect(await screen.findByText(/Bitcoin/)).toBeVisible()
    expect(await screen.findByText(/Poland/)).toBeVisible()
  })
})
