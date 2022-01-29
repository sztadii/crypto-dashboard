import { NavLink } from 'react-router-dom'
import { routes } from 'router'
import './navigation.css'
import { ReactComponent as Logo } from 'assets/images/logo.svg'

export default function Navigation() {
  return (
    <div className="navigation">
      <NavLink to={routes.home.getPath()}>
        <Logo className="navigation__logo" />
      </NavLink>
    </div>
  )
}
