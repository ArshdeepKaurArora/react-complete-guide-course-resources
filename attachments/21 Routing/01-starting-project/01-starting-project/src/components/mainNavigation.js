import { NavLink } from "react-router-dom";
import classes from './mainNavigation.module.css'

function MainNavigation() {

    const navLinks = [
        {
            path: '',
            label: 'Home'
        },
        {
            path: 'products',
            label: 'Products'
        }
    ]
  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <ul className={classes.list}>
                {navLinks.map((link) => (
                    <li>
                        <NavLink to={link.path} className={({isActive}) => isActive ? classes.active : undefined}>{link.label}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation