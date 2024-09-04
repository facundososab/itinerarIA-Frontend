import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.js";

function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
