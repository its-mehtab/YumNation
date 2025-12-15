import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const serverURL = "http://localhost:4000/";

  const getUserData = async () => {
    try {
      const res = await axios.get(serverURL + "api/getuserdata", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log("Auth Error:", error?.response?.data || error.message);

      if (location.pathname !== "/login") {
        navigate("/login");
      }

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <authContext.Provider
      value={{ serverURL, user, setUser, getUserData, loading }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
