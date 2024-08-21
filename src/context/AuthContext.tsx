import { useState, createContext } from 'react'
import { registerRequest } from '../auth/auth.ts'
import { User } from '../interfaces/User.ts'
import { useContext } from 'react'

export const AuthContext = createContext({
  user: null as User | null,
  isAuthenticated: true || false,
  signup: (user: User) => {},
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user)
      console.log(res.data)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (err: any) {
      console.log(err.response.data, 'errores')
      // Capturar err.response.data
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
