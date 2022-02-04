import Exchanges from 'pages/exchanges'
import ExchangeDetails from 'pages/exchange-details'

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
