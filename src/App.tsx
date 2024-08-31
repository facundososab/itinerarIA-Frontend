import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import Menu from './components/Menu.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import ProtectedRoute from './ProtectedRoutes.tsx'
import ItineraryPage from './pages/ItineraryPage.tsx'
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h1>Protected</h1>} />
              <Route path="/itinerarios" element={<ItineraryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
