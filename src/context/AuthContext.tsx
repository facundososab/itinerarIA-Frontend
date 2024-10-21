import { useContext, useState, createContext, useEffect } from 'react'
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
  updateUserRequest,
} from '../auth/user.ts'
import User from '../interfaces/User.ts'
import Itinerary from '../interfaces/Itinerary.ts'
import Cookies from 'js-cookie'

export const AuthContext = createContext({
  user: null as User | null,
  itineraries: null as Itinerary[] | null,
  setItineraries: (_itineraries: Itinerary[]) => {},
  isAuthenticated: true || false,
  signup: (_user: User) => {},
  authErrors: [],
  signIn: (_user: User) => {},
  isLoading: false || true,
  logout: () => {},
  updateUser: (_user: User) => {},
})

//Esta funcion se crea para poder utilizar el contexto en cualquier parte de la aplicación y no tener que estar exportando e importando el contexto en cada archivo.
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)
  const [itineraries, setItineraries] = useState<Itinerary[]>([]) //cambie [] por null,cambiar si hay algun error
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authErrors, setAuthErrors] = useState([])
  const [isLoading, setLoading] = useState(true)
  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data.data)
      setItineraries(res.data.data.itineraries)
      setIsAuthenticated(true)
      setAuthErrors([])
    } catch (err: any) {
      console.log(err)
      const errorData = err.response.data.message
      setAuthErrors(errorData)
    }
  }
  const signIn = async (userCreated: User) => {
    try {
      const res = await loginRequest(userCreated)
      console.log(res.data.data.usuario, 'res.data.data.usuario')
      setUser(res.data.data.usuario)
      setItineraries(res.data.data.usuario.itineraries)
      setIsAuthenticated(true)
      setAuthErrors([])
    } catch (err: any) {
      console.log(err)
      const errorData =
        err.response?.data?.message ||
        err.response?.data?.errors?.password ||
        err.response?.data?.errors?.username
      setAuthErrors(errorData)
      console.log(typeof errorData, 'errorData')
    }
  }
  const logout = async () => {
    try {
      await logoutRequest()
      setUser(null)
      setIsAuthenticated(false)
      Cookies.remove('token')
    } catch (err: any) {
      const errorData = err.response?.data?.message || 'Error'
      setAuthErrors(errorData)
    }
  }

  const updateUser = async (user: User) => {
    try {
      const res = await updateUserRequest(user)
      setUser(res.data.data)
      setAuthErrors([])
    } catch (err: any) {
      const errorData = err.response.data.message
      setAuthErrors(errorData)
    }
  }

  //Elimino msj despues de 5 segundos
  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [authErrors])

  useEffect(() => {
    const checkUser = async () => {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }
      try {
        const res = await verifyTokenRequest()
        if (!res.data) {
          return setIsAuthenticated(false)
        }
        setIsAuthenticated(true)
        setUser(res.data.data.usuario)
        setItineraries(res.data.data.usuario.itineraries)
        setLoading(false)
      } catch (err) {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }
    checkUser()
  }, [])
  //Esto es para que el usuario no se desloguee al recargar la página, y para las rutas privadas

  return (
    <AuthContext.Provider
      value={{
        user,
        itineraries,
        setItineraries,
        isAuthenticated,
        signup,
        authErrors,
        signIn,
        isLoading,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
