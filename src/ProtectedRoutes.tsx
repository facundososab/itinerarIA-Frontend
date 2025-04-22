import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext.js'
import Loader from './components/ui/Loader.js'

function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth()
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
