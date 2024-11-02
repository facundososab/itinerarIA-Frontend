import React, { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { Button } from '@headlessui/react'

interface ProfileMenuProps {
  isOpen: boolean
  toggleProfile: () => void
  logout: () => void
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isOpen,
  toggleProfile,
  logout,
}) => {
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        toggleProfile()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggleProfile])

  return (
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

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#26262c] ring-1 ring-black ring-opacity-5 focus:outline-none">
            <NavLink
              to="/myaccount"
              className="block px-4 py-2 text-sm text-indigo-300 hover:bg-[#2f3037]"
              onClick={toggleProfile}
            >
              <UserIcon className="inline-block h-4 w-4 mr-2" />
              My Account
            </NavLink>
            
            <Button
              //to="/login"
              onClick={() => {
                logout()
                toggleProfile()
              }}
              className="w-full block px-4 py-2 text-sm text-indigo-300 hover:bg-[#2f3037] text-left"
            >
              <LogOutIcon className="inline-block h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileMenu
