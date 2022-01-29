import { StrictMode } from 'react'
import { RouterProvider } from 'router'
import { ContextProvider, ContextType } from 'context'

interface Props {
  context?: ContextType
}

export default function App(props: Props) {
  const { context } = props || {}

  return (
    <StrictMode>
      <ContextProvider value={context}>
        <RouterProvider />
      </ContextProvider>
    </StrictMode>
  )
}
