import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import { useAuth } from "../user/AuthContext";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serverURL } = useAuth();

  const fetchRestaurant = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/owner/restaurant`, {
        withCredentials: true,
      });

      setRestaurant(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        setRestaurant,
        loading,
        setLoading,
        fetchRestaurant,
        error,
        setError,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
