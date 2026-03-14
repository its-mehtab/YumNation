import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dish, setDish] = useState(null);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(false);

  const getAllDishs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/dish`, {
        withCredentials: true,
      });

      setDish(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDishs();
  }, []);

  return (
    <DishContext.Provider value={{ dish, setDish, loading, setLoading }}>
      {children}
    </DishContext.Provider>
  );
};

export const useDish = () => useContext(DishContext);
