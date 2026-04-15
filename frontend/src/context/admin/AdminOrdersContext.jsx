import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../user/AuthContext";

const AdminOrdersContext = createContext();

export const AdminOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchAdminOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/orders`, {
        withCredentials: true,
      });

      setOrders(data);
    } catch (error) {
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminOrdersContext.Provider
      value={{ orders, setOrders, loading, setLoading, fetchAdminOrders }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => useContext(AdminOrdersContext);
