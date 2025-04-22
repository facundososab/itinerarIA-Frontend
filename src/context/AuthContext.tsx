import { useContext, useState, createContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
  updateUserRequest,
} from "../auth/user.ts";
import User from "../interfaces/User.ts";

import { useNavigate } from "react-router-dom";
import { useItinerary } from "./ItineraryContext.tsx";

export const AuthContext = createContext({
  user: null as User | null,
  isAuthenticated: true || false,
  isAdmin: true || false,
  signup: (_user: User) => {},
  authErrors: [],
  signIn: (_user: User) => {},
  isLoading: false || true,
  logout: () => {},
  updateUser: (_user: User) => {},
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [authErrors, setAuthErrors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getItineraries, setCurrentItinerary, setItineraries, itineraries } =
    useItinerary();

  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data.data.user);
      setIsAdmin(res.data.data.isAdmin);
      setIsAuthenticated(true);
      setAuthErrors([]);
      getItineraries(res.data.data.user.id);
    } catch (err: any) {
      console.log(err);
      const errorData = err.response.data.message;
      setAuthErrors(errorData);
    }
  };
  const signIn = async (user: User) => {
    try {
      const res = await loginRequest(user);
      console.log(itineraries, "itineraries");
      setUser(res.data.data.user);
      setIsAdmin(res.data.data.user.isAdmin);
      setIsAuthenticated(true);
      setAuthErrors([]);
      getItineraries(res.data.data.user.id);
      setCurrentItinerary(null);
    } catch (err: any) {
      console.log(err);
      const errorData = err.response?.data?.message ||
        err.response?.data?.errors?.password ||
        err.response?.data?.errors?.username || ["Error"];
      setAuthErrors(errorData);
      console.log(typeof errorData, "errorData");
    }
  };
  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      setCurrentItinerary(null);
      setItineraries([]);
      navigate("/login");
    } catch (err: any) {
      const errorData = err.response?.data?.message || "Error";
      setAuthErrors(errorData);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const res = await updateUserRequest(user);
      setUser(res.data.data);
      setAuthErrors([]);
    } catch (err: any) {
      setAuthErrors(err.response.data.message);
    }
  };

  //Elimino msj despues de 5 segundos
  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authErrors]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data.data.user);
          setIsAdmin(res.data.data.user.isAdmin);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);
  //Esto es para que el user no se desloguee al recargar la página, y para las rutas privadas

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
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
  );
};
