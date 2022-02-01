import { StrictMode } from 'react'
import { CacheProvider } from 'cache'
import { ContextProvider, ContextType } from 'context'
import { RouterProvider } from 'router'

interface Props {
  context?: ContextType
}

export default function App(props: Props) {
  return (
    <StrictMode>
      <ContextProvider value={props?.context}>
        <CacheProvider>
          <RouterProvider />
        </CacheProvider>
      </ContextProvider>
    </StrictMode>
  )
}
