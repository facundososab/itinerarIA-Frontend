import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserIcon, LogOutIcon } from 'lucide-react'
import { AdminHeaderNav } from './AdminHeaderNav'

interface MobileMenuProps {
  isAuthenticated: boolean
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isAuthenticated,
  isOpen,
  onClose,
  onLogout,
}) => {
  return (
    <div
      className={`lg:hidden bg-[#1c1c21] absolute top-full left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{
        maxHeight: isOpen ? '100vh' : '0',
        overflow: 'hidden',
        boxShadow: isOpen
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          : 'none',
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
      }}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isAuthenticated && <AdminHeaderNav mobile onLinkClick={onClose} />}
        {isAuthenticated && (
          <div className="pt-4 pb-3 border-t border-indigo-700">
            <div className="px-2 space-y-1">
              <NavLink
                to="/myaccount"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-indigo-100 hover:bg-indigo-700"
                onClick={onClose}
              >
                <UserIcon className="inline-block h-4 w-4 mr-2" />
                My Account
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => {
                  onLogout()
                  onClose()
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-indigo-100 hover:bg-indigo-700"
              >
                <LogOutIcon className="inline-block h-4 w-4 mr-2" />
                Log out
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
