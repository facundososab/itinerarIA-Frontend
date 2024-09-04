import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.js";
import { useItinerary } from "./context/ItineraryContext.js";

function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth();
  console.log(isAuthenticated, "isAuthenticated", isLoading, "isLoading");
  const { isCreated } = useItinerary();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  if (isCreated) {
    return <Navigate to="/itinerarios" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
