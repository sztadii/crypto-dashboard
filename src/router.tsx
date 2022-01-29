import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/home'
import Navigation from 'components/navigation'

export const routes = {
  home: {
    getPath: () => '/',
    component: Home
  }
}

export function RouterProvider() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
