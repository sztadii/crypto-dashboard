import { StrictMode } from 'react'
import { CacheProvider } from 'cache'
import { ContextProvider, ContextType } from 'context'
import { RouterProvider } from 'router'

interface Props {
  initialPath?: string
  context?: ContextType
}

export default function App(props?: Props) {
  const { initialPath, context } = props || {}

  return (
    <StrictMode>
      <ContextProvider value={context}>
        <CacheProvider>
          <RouterProvider initialPath={initialPath} />
        </CacheProvider>
      </ContextProvider>
    </StrictMode>
  )
}
