import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(false);

  const getRestaurantDishes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/owner/dish`, {
        withCredentials: true,
      });

      setDishes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DishContext.Provider
      value={{ dishes, setDishes, loading, setLoading, getRestaurantDishes }}
    >
      {children}
    </DishContext.Provider>
  );
};

export const useDish = () => useContext(DishContext);
