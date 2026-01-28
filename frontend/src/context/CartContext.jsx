import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchUserCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/cart`, {
        withCredentials: true,
      });

      setCart(data);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, loading, setLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
