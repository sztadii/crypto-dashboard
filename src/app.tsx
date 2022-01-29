import { StrictMode } from 'react'
import { RouterProvider } from 'router'
import { ContextProvider, ContextType } from 'context'
import { CacheProvider } from './cache'

interface Props {
  context?: ContextType
}

export default function App(props: Props) {
  const { context } = props || {}

  return (
    <StrictMode>
      <ContextProvider value={context}>
        <CacheProvider>
          <RouterProvider />
        </CacheProvider>
      </ContextProvider>
    </StrictMode>
  )
}
