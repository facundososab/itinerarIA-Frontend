import { useState, createContext } from "react";
import registerRequest from "../api/registerRequest";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initalAuth = null;
  const [auth, setAuth] = useState(initalAuth);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleAuth = () => {
    const res = await registerRequest(user);
    setUser(res.data);
    setAuth(auth ? null : true);
  };

  return (
    <AuthContext.Provider value={{ auth, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
