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
import ExternalServicesPage from "./pages/ExternalServicesCrudPage.tsx";
import NotFoundPage from "./pages/404.tsx";
import MyAccountPage from "./pages/MyAccountPage.tsx";
import PreferencePage from "./pages/PreferencesPage.tsx";
import { PreferenceProvider } from "./context/PreferenceContext.tsx";
import { PlacesProvider } from "./context/PlaceContext.tsx";
import PlacesPage from "./pages/PlacesPage.tsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <ItineraryProvider>
          <PlacesProvider>
            <PreferenceProvider>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/itinerarios" element={<ItinerariesPage />} />
                    <Route path="/lugares" element={<PlacesPage />} />
                    <Route
                      path="/externalServices"
                      element={<ExternalServicesPage />}
                    />
                    <Route path="/preferences" element={<PreferencePage />} />
                    <Route path="/myaccount" element={<MyAccountPage />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </PreferenceProvider>
          </PlacesProvider>
        </ItineraryProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
