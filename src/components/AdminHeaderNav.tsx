import { NavLink } from 'react-router-dom'

interface AdminHeaderNavProps {
  mobile?: boolean // Optional prop to indicate if it's in mobile view
  onClick?: () => void // Optional callback for handling clicks
}

export const AdminHeaderNav = ({ mobile, onClick }: AdminHeaderNavProps) => {
  return (
    <div className={mobile ? 'flex flex-col space-y-2' : 'flex space-x-8'}>
      <NavLink
        to="/externalServices"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
        onClick={onClick} // Call the onClick when this link is clicked
      >
        External Services
      </NavLink>
      <NavLink
        to="/lugares"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
        onClick={onClick} // Call the onClick when this link is clicked
      >
        Places
      </NavLink>
      <NavLink
        to="/preferences"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
        onClick={onClick} // Call the onClick when this link is clicked
      >
        Preferences
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? 'text-indigo-600' : 'text-indigo-300'
        }
        onClick={onClick} // Call the onClick when this link is clicked
      >
        Favorites
      </NavLink>
    </div>
  )
}
