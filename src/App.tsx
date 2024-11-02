
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import Header from './components/Header.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import ProtectedRoute from './ProtectedRoutes.tsx'
import ItinerariesPage from './pages/ItinerariesPage.tsx'
import HomePage from './pages/HomePage.tsx'
import { ItineraryProvider } from './context/ItineraryContext.tsx'
import ExternalServicesPage from './pages/ExternalServicesCrudPage.tsx'
import NotFoundPage from './pages/404.tsx'
import PlacesPage  from './pages/PlacesPage.tsx'
import { PlacesProvider } from './context/PlaceContext.tsx'
import MyAccountPage from './pages/MyAccountPage.tsx'
import PreferencePage from './pages/PreferencesPage.tsx'
import { PreferenceProvider } from './context/PreferenceContext.tsx'
import { ParticipantProvider } from './context/ParticipantContext.tsx'
import ParticipantsPage from './pages/ParticipantsPage.tsx'
import { ActivitiesProvider } from './context/ActivityContext.tsx'
import { OpinionsProvider } from './context/OpinionContext.tsx'
import { ExternalServicesProvider } from './context/ExternalServicesContext.tsx'


function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <ItineraryProvider>

          <ExternalServicesProvider>
            <OpinionsProvider>
              <ActivitiesProvider>
                <PlacesProvider>
                  <PreferenceProvider>
                    <ParticipantProvider>
                      
                        <Header />
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route element={<ProtectedRoute />}>
                            <Route
                              path="/itinerarios"
                              element={<ItinerariesPage />}
                            />
                            <Route path="/places" element={<PlacesPage />} />
                            <Route
                              path="/externalServices"
                              element={<ExternalServicesPage />}
                            />
                            <Route
                              path="/preferences"
                              element={<PreferencePage />}
                            />
                            <Route
                              path="/myaccount"
                              element={<MyAccountPage />}
                            />
                            <Route
                              path="/favorites"
                              element={<ParticipantsPage />}
                            />
                          </Route>
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </ParticipantProvider>
                  </PreferenceProvider>
                </PlacesProvider>
              </ActivitiesProvider>
            </OpinionsProvider>
          </ExternalServicesProvider>
        </ItineraryProvider>
      </AuthProvider>
      </BrowserRouter>
      
    </div>
  )
}

export default App
