import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/order`, {
        withCredentials: true,
      });

      setOrders(data);
    } catch (error) {
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, setOrders, loading, setLoading, fetchOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
