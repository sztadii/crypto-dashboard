import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/home'

export const routes = {
  home: {
    getPath: () => '/',
    component: Home
  }
}

export function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routes).map(route => {
          const { getPath, component: Component } = route
          const path = getPath()
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
    </BrowserRouter>
  )
}
