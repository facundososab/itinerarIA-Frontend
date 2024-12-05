import { NavLink } from 'react-router-dom'

interface AdminHeaderNavProps {
  mobile?: boolean
  onLinkClick?: () => void
}

export const AdminHeaderNav = ({
  mobile,
  onLinkClick,
}: AdminHeaderNavProps) => {
  const navItems = [
    { to: '/externalServices', label: 'External Services' },
    { to: '/places', label: 'Places' },
    { to: '/preferences', label: 'Preferences' },
  ]

  return (
    <div
      className={`${
        mobile ? 'flex flex-col space-y-2' : 'lg:flex lg:space-x-8'
      }`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium 
            ${
              isActive
                ? 'text-indigo-600 bg-indigo-100 bg-opacity-10'
                : 'text-indigo-300 hover:text-indigo-100 hover:bg-indigo-700'
            } 
            transition-all duration-300 ease-in-out 
            transform hover:scale-105 hover:shadow-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`
          }
          onClick={onLinkClick}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}
