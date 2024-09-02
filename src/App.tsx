import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import Header from './components/Header.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import ProtectedRoute from './ProtectedRoutes.tsx'
import ItinerariesPage from './pages/ItineraryPage.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/itinerarios" element={<ItinerariesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
