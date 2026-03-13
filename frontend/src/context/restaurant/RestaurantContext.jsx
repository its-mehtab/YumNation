import axios from "axios";
import React, { useContext, useState } from "react";
import { createContext } from "react";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchRestaurant = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/restaurant`, {
        withCredentials: true,
      });

      setRestaurant(data);
    } catch (error) {
      console.log("Restaurant Error:", error?.response?.data || error.message);
      setRestaurant(null);
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
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
