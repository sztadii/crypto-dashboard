import React, { createContext, FC } from 'react'
import CoinGeckoService from './services/coin-gecko-service'

export type ContextType = {
  /**
   * In this way almost effortless we can set up initial route.
   * Very helpful during unit testing.
   * */
  initialPath?: string
  coinGeckoService: CoinGeckoService
}

const initialContext: ContextType = {
  coinGeckoService: new CoinGeckoService()
}

const Context = createContext(initialContext)

export const ContextProvider: FC<{ value?: ContextType }> = props => {
  const context = {
    ...initialContext,
    ...props.value
  }
  return <Context.Provider value={context}>{props.children}</Context.Provider>
}

export const useContext = () => React.useContext(Context)
