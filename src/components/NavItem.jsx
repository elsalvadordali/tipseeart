import { NavLink } from 'react-router-dom'

const NavItem = ({ path, children }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'md:text-white underline text-2xl underline-offset-8' : 'md:text-white text-2xl'
      }
      to={path}
    >
      {children}
    </NavLink>
  )
}

export default NavItem
