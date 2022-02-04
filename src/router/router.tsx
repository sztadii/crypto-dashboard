import { useEffect } from 'react'
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useContext } from 'context'
import { createBrowserHistory } from 'history'
import Navigation from 'components/navigation'
import classes from './router.module.scss'
import { routes } from './routes'

export function RouterProvider() {
  const context = useContext()
  const history = createBrowserHistory()
  const { initialPath } = context

  useEffect(() => {
    if (!initialPath) return
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
