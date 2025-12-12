import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const serverURL = "http://localhost:4000/";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(serverURL + "api/getuserdata", {
        withCredentials: true,
      });
      console.log(data);
      setUser(data);
    } catch (error) {
      navigate("/login");
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <authContext.Provider value={{ serverURL, user, setUser, getUserData }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
