import { useEffect } from 'react'
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useContext } from 'context'
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

export function RouterProvider() {
  const context = useContext()
  const history = createBrowserHistory()
  const { initialPath = routes.exchanges.getPath() } = context

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
