import { NavLink } from 'react-router-dom'

export function Menu(): JSX.Element {
  return (
    <>
      <nav className="menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/Register">Register</NavLink>
      </nav>
    </>
  )
}
