import { Link } from 'react-router-dom'

export const AdminHeaderNav = () => {
  return (
    <>
      <Link
        to="/externalServices"
        className="text-indigo-300 hover:text-indigo-200"
      >
        External Services
      </Link>

      <Link
        to="/lugares"
        className="text-indigo-300 hover:text-indigo-200"
      >
        Places
      </Link>
    </>

  )
}
