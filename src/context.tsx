import React, { createContext, FC } from 'react'
import CoinGeckoService from './services/coin-gecko-service'

const initialContext = {
  coinGeckoService: new CoinGeckoService()
}

const Context = createContext(initialContext)

export type ContextType = typeof initialContext

export const ContextProvider: FC<{ value?: ContextType }> = props => {
  const context = {
    ...initialContext,
    ...props.value
  }
  return <Context.Provider value={context}>{props.children}</Context.Provider>
}

export const useContext = () => React.useContext(Context)
