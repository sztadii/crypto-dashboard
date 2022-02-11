import td from 'testdouble'
import { screen, render } from '@testing-library/react'
import App from 'app'
import { ContextType } from 'context'
import { Exchange } from 'services/coin-gecko-service.types'

describe('exchanges', () => {
  it('when the list is fetching then display a loading', async () => {
    render(<App />)

    expect(await screen.findByTestId('spinner')).toBeVisible()
  })

  it('when we receive an error then display a warning', async () => {
    const context = td.object<ContextType>()

    td.when(context.coinGeckoService.findExchanges()).thenReject(
      new Error('Status 404')
    )

    render(<App context={context} />)

    expect(await screen.findByText('Something went wrong')).toBeVisible()
  })

  it('when fetched list is empty then display a warning', async () => {
    const context = td.object<ContextType>()

    td.when(context.coinGeckoService.findExchanges()).thenResolve([])

    render(<App context={context} />)

    expect(await screen.findByText('No data to display')).toBeVisible()
  })

  it('when we fetched the list then render it', async () => {
    const context = td.object<ContextType>()

    td.when<Partial<Exchange>[]>(
      context.coinGeckoService.findExchanges()
    ).thenResolve([
      {
        name: 'Bitcoin'
      },
      {
        name: 'Dogecoin'
      }
    ])

    render(<App context={context} />)

    expect(await screen.findByText('Bitcoin')).toBeVisible()
    expect(await screen.findByText('Dogecoin')).toBeVisible()
  })
})
