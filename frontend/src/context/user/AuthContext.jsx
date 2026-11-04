import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverURL = import.meta.env.VITE_API_KEY;
  const isLoggedIn = !!user;

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(serverURL + "/api/getuserdata", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log("Auth Error:", error?.response?.data || error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${serverURL}/api/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
    } catch (error) {
      console.log("Auth Error:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <authContext.Provider
      value={{
        serverURL,
        user,
        setUser,
        getUserData,
        loading,
        error,
        setError,
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
