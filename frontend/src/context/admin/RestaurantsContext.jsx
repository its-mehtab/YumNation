import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../user/AuthContext";

const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serverURL } = useAuth();

  const fetchRestaurants = async () => {
    setError(null);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/restaurant`, {
        withCredentials: true,
      });

      setRestaurants(data);
    } catch (error) {
      setError(error?.response?.data || error.message);
      console.log("Restaurants Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        loading,
        setLoading,
        fetchRestaurants,
        error,
        setError,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => useContext(RestaurantsContext);
