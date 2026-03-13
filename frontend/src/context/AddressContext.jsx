import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchAddress = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/address`, {
        withCredentials: true,
      });

      setAddresses(data);
    } catch (error) {
      console.log("Address Error:", error?.response?.data || error.message);
      setAddresses(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{ addresses, setAddresses, loading, setLoading, fetchAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
