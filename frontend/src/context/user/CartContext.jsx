import axios from "axios";
import React, { createContext, useContext, useState } from "react";
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

  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, setCart, loading, setLoading, subtotal, fetchUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
