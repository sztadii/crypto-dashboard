import { useEffect } from 'react'
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Exchanges from 'pages/exchanges'
import ExchangeDetails from 'pages/exchange-details'
import Navigation from 'components/navigation'
import classes from './router.module.scss'

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

interface RouterProviderProps {
  initialPath?: string
}

export function RouterProvider(props: RouterProviderProps) {
  const { initialPath = routes.exchanges.getPath() } = props
  const history = createBrowserHistory()

  useEffect(() => {
    history.push(initialPath)
  }, [])

  return (
    <Router history={history}>
      <div className={classes.wrapper}>
        <Navigation />

        <div className={classes.routingContent}>
          <Routes>
            {Object.values(routes).map(route => {
              const { getPath, component: Component } = route
              const path = getPath()
              return <Route key={path} path={path} element={<Component />} />
            })}
          </Routes>
        </div>
      </div>
    </Router>
  )
}
