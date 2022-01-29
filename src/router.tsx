import { useEffect } from 'react'
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from 'pages/home'
import Details from 'pages/details'
import Navigation from 'components/navigation'

export const routes = {
  home: {
    getPath: () => '/',
    component: Home
  },
  details: {
    getPath: (exchangeId = ':exchangeId') => `/details/${exchangeId}`,
    component: Details
  }
}

interface RouterProviderProps {
  initialPath?: string
}

export function RouterProvider(props: RouterProviderProps) {
  const { initialPath = routes.home.getPath() } = props
  const history = createBrowserHistory()

  useEffect(() => {
    history.push(initialPath)
  }, [])

  return (
    <Router history={history}>
      <div className="app">
        <Navigation />

        <div className="app__container">
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
