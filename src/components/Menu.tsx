import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'

function Menu() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <nav className="menu flex items-end justify-end space-x-4 mt-2 me-2">
          <NavLink to="/itinerarios" className="text-white">
            Ver itinerarios
          </NavLink>
          <NavLink to="/" className="text-white">
            Home
          </NavLink>
          <Link to="/login" onClick={() => logout()} className="text-white">
            Logout
          </Link>
        </nav>
      ) : (
        <nav className="flex items-end justify-end space-x-4">
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </Link>
        </nav>
      )}
    </>
  )
}

export default Menu
