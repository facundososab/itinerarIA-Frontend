import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapIcon } from "@heroicons/react/24/outline";
import { Menu as MenuIcon, X } from "lucide-react";
import { AdminHeaderNav } from "./AdminHeaderNav";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`bg-raisin-black shadow-sm py-2 ${
          isMobileMenuOpen ? "rounded-b-2xl shadow-lg" : ""
        }`}
      >
        <nav className="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-2 flex items-center justify-between border-b border-onyx lg:border-none">
            <div className="flex items-center">
              <div>
                <span className="sr-only">itinerarIA</span>
                <NavLink
                  to={isAuthenticated ? "/itinerarios" : "/"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-700 scale-105 hover:text-indigo-600"
                      : "text-indigo-300 hover:text-indigo-200"
                  }
                >
                  <MapIcon className="h-10 w-auto text-indigo-400" />
                </NavLink>
              </div>

              {isAuthenticated && (
                <div className="hidden ml-10 lg:flex">
                  <AdminHeaderNav />
                </div>
              )}
            </div>

            <div className="flex items-center">
              {!isAuthenticated ? (
                <div className="flex items-center justify-end space-x-4">
                  <NavLink
                    id="login"
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-700 py-2 scale-105 hover:text-indigo-600 hover:scale-105 focus:text-indigo-600 transform transition-transform duration-300"
                        : "text-indigo-300 py-2 hover:text-indigo-400 hover:scale-105 focus:text-indigo-500 transform transition-transform duration-300 focus:scale-105"
                    }
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    id="register"
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-700 scale-110 items-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-white transform transition-transform duration-300 hover:bg-white hover:text-indigo-600  focus:bg-white focus:text-indigo-600"
                        : "text-white items-center py-2 px-4 border border-transparent rounded-md shadow-sm bg-indigo-600 transform transition-transform duration-300 hover:bg-white hover:text-indigo-600 focus:bg-white focus:text-indigo-600"
                    }
                  >
                    Sign up {"->"}
                  </NavLink>
                </div>
              ) : (
                <>
                  <div className="hidden lg:block">
                    <ProfileMenu
                      isOpen={isProfileOpen}
                      toggleProfile={toggleProfile}
                      logout={logout}
                    />
                  </div>
                  <button
                    className="ml-4 text-indigo-300 hover:text-indigo-200 lg:hidden transition-colors duration-300 ease-in-out"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-8 w-8 transform rotate-0 hover:rotate-90 transition-transform duration-300 ease-in-out" />
                    ) : (
                      <MenuIcon className="h-8 w-8 transform hover:scale-110 transition-transform duration-300 ease-in-out" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {isAuthenticated && (
          <MobileMenu
            isAuthenticated={isAuthenticated}
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            onLogout={logout}
          />
        )}
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}
    </div>
  );
}

export default Header;
