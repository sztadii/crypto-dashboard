import td from 'testdouble'
import { screen, render } from '@testing-library/react'
import { ContextType } from 'context'
import App from 'app'
import { Exchange } from 'services/coin-gecko-service.types'

describe('home component', () => {
  it('when we fetched the exchange list then render it', async () => {
    const context = td.object<ContextType>()

    td.when(context.coinGeckoService.findExchanges()).thenResolve([
      {
        name: 'Bitcoin'
      },
      {
        name: 'Dogecoin'
      }
    ] as Exchange[])

    render(<App context={context} />)

    expect(await screen.findByText('Bitcoin')).toBeVisible()
    expect(await screen.findByText('Dogecoin')).toBeVisible()
  })
})
