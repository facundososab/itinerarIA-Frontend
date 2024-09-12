import { NavLink } from 'react-router-dom'

export const AdminHeaderNav = () => {
  return (
    <NavLink
      to="/externalServices"
      className={({ isActive }) =>
        isActive ? 'text-indigo-600' : 'text-indigo-300'
      }
    >
      External Services
    </NavLink>
  )
}
