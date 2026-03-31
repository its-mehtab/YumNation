import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/restaurant`, {
        withCredentials: true,
      });

      setRestaurants(data);
    } catch (error) {
      console.log("Restaurant Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, loading, setLoading }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurats = () => useContext(RestaurantsContext);
