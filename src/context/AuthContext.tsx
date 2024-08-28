import { useContext, useState, createContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../auth/usuario.ts";
import User from "../interfaces/User.ts";
//import Cookies from "js-cookie";
export const AuthContext = createContext({
  user: null as User | null,
  isAuthenticated: true || false,
  signup: (_user: User) => {},
  authError: { data: [] },
  signIn: (_user: User) => {},
  isLoading: false || true,
});

//Esta funcion se crea para poder utilizar el contexto en cualquier parte de la aplicación y no tener que estar exportando e importando el contexto en cada archivo.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthErrors] = useState({ data: [] });
  const [isLoading, setLoading] = useState(true);
  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setAuthErrors({ data: [] });
    } catch (err: any) {
      const errorData = err.response?.data?.message || "Error";
      console.log(errorData, "errorData");
      setAuthErrors({ data: errorData });
      console.log(typeof authError, "errors");
    }
  };
  const signIn = async (user: User) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setAuthErrors({ data: [] });
    } catch (err: any) {
      const errorData = err.response?.data?.message || "Error";
      setAuthErrors({ data: errorData });
    }
  };
  //Elimino msj despues de 5 segundos
  useEffect(() => {
    if (authError.data.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors({ data: [] });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authError]);
  // useEffect(() => {
  //   async function checkUser() {
  //     const cookies = Cookies.get();
  //     if (!cookies.token) {
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //       return setUser(null);
  //     }
  //     try {
  //       const res = await verifyTokenRequest();
  //       if (!res.data) {
  //         setIsAuthenticated(false);
  //         setLoading(false);
  //         return;
  //       }
  //       setUser(res.data);
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err, "aa");
  //     }
  //   }
  //   checkUser();
  // }, []);
  //Esto es para que el usuario no se desloguee al recargar la página, y para las rutas privadas

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        authError,
        signIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
