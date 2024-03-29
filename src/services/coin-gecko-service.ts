import axios, { AxiosInstance } from 'axios'
import { Exchange, ExchangeWithDetails } from './coin-gecko-service.types'

/**
 * The CoinGecko is a public API to fetch a useful info about latest cryptocurrencies.
 * The link to docs https://www.coingecko.com/en/api/documentation
 * */
export default class CoinGeckoService {
  private httpClient: AxiosInstance

  constructor(baseURL = 'https://api.coingecko.com/api/v3') {
    this.httpClient = axios.create({
      baseURL,
      timeout: 5_000
    })
  }

  findExchanges = (limit = 10): Promise<Exchange[]> => {
    return this.httpClient
      .get(`/exchanges?per_page=${limit}`)
      .then(response => response.data)
  }

  getExchange = (id: string): Promise<ExchangeWithDetails> => {
    return this.httpClient
      .get(`/exchanges/${id}`)
      .then(response => response.data)
  }
}
