import { NavLink } from "react-router-dom";
import "../Menu.css";

function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}
export default Menu;
