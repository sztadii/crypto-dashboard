import Exchanges from 'pages/exchanges'
import ExchangeDetails from 'pages/exchange-details'

export type RoutesParams = {
  exchanges: {}
  exchangeDetails: {
    exchangeId: string
  }
}

export const routes = {
  exchanges: {
    getPath: () => '/',
    component: Exchanges
  },
  exchangeDetails: {
    getPath: (exchangeId = ':exchangeId') => `/exchange-details/${exchangeId}`,
    component: ExchangeDetails
  }
}
