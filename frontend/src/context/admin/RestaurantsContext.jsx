import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../AuthContext";

const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState();

  const { serverURL } = useAuth();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${serverURL}/api/restaurant/admin/all`,
        {
          withCredentials: true,
        },
      );

      setRestaurants(data);
    } catch (error) {
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
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => useContext(RestaurantsContext);
