import { NavLink, Link } from "react-router-dom";
import "../Menu.css";
import { useAuth } from "../context/AuthContext.tsx";
function Menu() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <nav className="menu">
          <NavLink to="/itinerarios">Ver itinerarios</NavLink>
          <NavLink to="/">Home</NavLink>
          <Link to="/" onClick={() => logout()}>
            Logout
          </Link>
        </nav>
      ) : (
        <nav className="menu">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      )}
    </>
  );
}
export default Menu;
