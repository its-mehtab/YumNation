import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState(null);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(false);

  const getAllDishes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/restaurants/dishes`, {
        withCredentials: true,
      });

      console.log(data);

      setDishes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getAllDishes();
  }, []);

  return (
    <DishContext.Provider value={{ dishes, setDishes, loading, setLoading }}>
      {children}
    </DishContext.Provider>
  );
};

export const useDish = () => useContext(DishContext);
