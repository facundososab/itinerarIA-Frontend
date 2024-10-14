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
      <NavLink
        to="/lugares"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
      >
        Places
      </NavLink>
      <NavLink
        to="/preferences"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
      >
        Preferences
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
      >
        Favorites
      </NavLink>
    </>
  )
}
