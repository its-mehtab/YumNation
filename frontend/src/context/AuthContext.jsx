import { useState, createContext, useContext, useEffect } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [token, setToken] = useState(localStorage.getItem("token"));

  //   useEffect(()=>{

  //   },[])
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
