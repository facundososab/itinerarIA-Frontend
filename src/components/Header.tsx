import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.tsx'
import { MapIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { ButtonLink } from './ui/ButtonLink.tsx'
import { ChevronDownIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { AdminHeaderNav } from './AdminHeaderNav.tsx'

function Header() {
  const { isAuthenticated, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Referencia para el contenedor del menú desplegable
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el clic se realiza fuera del menú, cierra el menú
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Cierra el menú si el usuario cambia de pestaña o minimiza la ventana
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      // Agrega los listeners para detectar clics fuera y cambio de ventana
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('visibilitychange', handleVisibilityChange)
    } else {
      // Elimina los listeners cuando el menú esté cerrado
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }

    // Cleanup para eliminar los event listeners cuando el componente se desmonte
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isProfileOpen])

  return (
    <>
      <div>
        <header className="bg-raisin-black shadow-sm py-2">
          <nav
            className={
              isAuthenticated
                ? 'mx-auto px-4 sm:px-6 lg:px-8'
                : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
            }
            aria-label="Top"
          >
            <div className="w-full py-2 flex items-center justify-between border-b border-onyx lg:border-none">
              <div className="flex items-center">
                <div>
                  <span className="sr-only">itinerarIA</span>
                  <Link
                    to={isAuthenticated ? '/itinerarios' : '/'}
                    className="text-indigo-300 hover:text-indigo-200"
                  >
                    <MapIcon className="h-10 w-auto text-indigo-400" />
                  </Link>
                </div>


                {!isAuthenticated ? (
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
                ) : (
                  <div className="ml-10 space-x-8 lg:block">
                    <AdminHeaderNav />
                  </div>
                )}
              </div>


              {!isAuthenticated ? (
                <div className="flex items-center justify-end space-x-4 w-full ml-auto border-b border-indigo-500 lg:border-none">
                  <Link
                    id="login"
                    to="/login"
                    className="text-white py-2 hover:text-indigo-400 hover:scale-105 focus:text-indigo-500 transform transition-transform duration-300 focus:scale-105"
                  >
                    Sign in
                  </Link>
                  <Link
                    id="register"
                    to="/register"
                    className="items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 transform transition-transform duration-300 hover:bg-white hover:text-indigo-600 focus:bg-white focus:text-indigo-600"
                  >
                    Sign up {'->'}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="ml-3 relative" ref={profileMenuRef}>
                    <div>
                      <button
                        onClick={toggleProfile}
                        className="flex items-center text-indigo-300 hover:text-indigo-200 transform transition-transform duration-300 hover:scale-105 focus:scale-105"
                      >
                        <UserCircleIcon className="h-8 w-8" />
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      </button>
                    </div>

                    {isProfileOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#26262c] ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-indigo-300 hover:bg-[#2f3037]"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <UserIcon className="inline-block h-4 w-4 mr-2" />
                          My Account
                        </Link>
                        <Link
                          to="/"
                          onClick={() => logout()}
                          className="block px-4 py-2 text-sm text-indigo-300 hover:bg-[#2f3037]"
                        >
                          <LogOutIcon className="inline-block h-4 w-4 mr-2" />
                          Log out
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Header
