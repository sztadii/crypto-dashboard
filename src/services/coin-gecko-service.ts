import HttpService from './http-service'

export interface Exchange {
  id: string
  name: string
  year_established?: number
  country: string
  description: string
  url: string
  image: string
  has_trading_incentive: boolean
  trust_score: number
  trust_score_rank: number
  trade_volume_24h_btc: number
  trade_volume_24h_btc_normalized: number
}

export default class CoinGeckoService extends HttpService {
  constructor() {
    super('https://api.coingecko.com/api/v3')
  }

  findExchanges = (limit = 10): Promise<Exchange[]> => {
    return this.httpClient
      .get('/exchanges', {
        params: { per_page: limit }
      })
      .then(res => res.data)
  }
}
