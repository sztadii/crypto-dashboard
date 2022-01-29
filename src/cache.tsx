import { FC, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const CacheProvider: FC = props => {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1
        }
      }
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
