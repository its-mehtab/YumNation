import axios from "axios";
import { createContext, useState } from "react";
import { useAuth } from "../user/AuthContext";

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState(null);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRestaurantDishes = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/owner/dish`, {
        withCredentials: true,
      });

      setDishes(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DishContext.Provider
      value={{
        dishes,
        setDishes,
        loading,
        setLoading,
        getRestaurantDishes,
        error,
        setError,
      }}
    >
      {children}
    </DishContext.Provider>
  );
};

export default DishContext;
