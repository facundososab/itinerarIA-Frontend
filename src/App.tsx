import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Header from "./components/Header.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";
import ItinerariesPage from "./pages/ItinerariesPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { ItineraryProvider } from "./context/ItineraryContext.tsx";
import { PlacesPage } from "./pages/PlacesPage.tsx";
import { PlaceProvider } from "./context/PlaceContext.tsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <ItineraryProvider>
          <PlaceProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/itinerarios" element={<ItinerariesPage />} />
                  <Route path="/lugares" element={<PlacesPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PlaceProvider>
        </ItineraryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
