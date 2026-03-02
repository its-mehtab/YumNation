import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(false);

  const { serverURL, isLoggedIn } = useAuth();

  const fetchAddress = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/address`, {
        withCredentials: true,
      });

      setAddresses(data);
    } catch (error) {
      console.log(error);
      setAddresses(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [isLoggedIn]);

  return (
    <AddressContext.Provider
      value={{ addresses, setAddresses, loading, setLoading }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
