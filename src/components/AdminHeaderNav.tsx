import { NavLink } from 'react-router-dom'

export const AdminHeaderNav = () => {
  return (
    <>
      <NavLink
        to="/externalServices"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
      >
        External Services
      </NavLink>
      <NavLink to="/lugares" className="text-indigo-300 hover:text-indigo-200">
        Places
      </NavLink>
    </>
  )
}
