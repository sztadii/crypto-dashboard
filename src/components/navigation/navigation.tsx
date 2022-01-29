import { NavLink } from 'react-router-dom'
import { routes } from 'router'
import classes from './navigation.module.scss'
import { ReactComponent as Logo } from 'assets/images/logo.svg'

export default function Navigation() {
  return (
    <div className={classes.navigation}>
      <NavLink to={routes.home.getPath()}>
        <Logo className={classes.logo} />
      </NavLink>
    </div>
  )
}
