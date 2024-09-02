import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { MapIcon } from '@heroicons/react/24/outline'

function Header() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <>
      <div>
        <header className="bg-raisin-black shadow-sm">
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            aria-label="Top"
          >
            <div className="w-full py-2 flex items-center justify-between border-b border-onyx lg:border-none">
              <div className="flex items-center">
                <div>
                  <span className="sr-only">itinerarIA</span>
                  <Link
                    to="/"
                    className="text-indigo-300 hover:text-indigo-200"
                  >
                    <MapIcon className="h-10 w-auto text-indigo-400" />
                  </Link>
                </div>
                {!isAuthenticated && (
                  <div className="hidden ml-10 space-x-8 lg:block">
                    <a
                      href="#features"
                      className="text-indigo-300 hover:text-indigo-200"
                    >
                      Features
                    </a>
                    <a
                      href="#benefits"
                      className="text-indigo-300 hover:text-indigo-200"
                    >
                      Benefits
                    </a>
                  </div>
                )}
              </div>
              {!isAuthenticated ? (
                <div className="flex items-center justify-end space-x-4 w-full py-6 ml-auto border-b border-indigo-500 lg:border-none">
                  <Link
                    id="login"
                    to="/login"
                    className="text-white hover:text-indigo-400 hover:scale-105 focus:text-indigo-500 transform transition-transform duration-300 focus:scale-105"
                  >
                    Sign in
                  </Link>
                  <Link
                    id="register"
                    to="/register"
                    className="items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 transform transition-transform duration-300 hover:bg-white hover:text-indigo-600 focus:bg-white focus:text-indigo-600"
                  >
                    Sign up {'->'}
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => logout()}
                  className="text-white"
                >
                  Logout
                </Link>
              )}
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Header