import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const AdminOrdersContext = createContext();

export const AdminOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    orderSearch: "",
    orderStatus: "all",
    sortBy: "newest",
    page: 1,
    limit: 2,
  });

  const { serverURL } = useAuth();

  const fetchAdminOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/order`, {
        params: {
          search: filter.orderSearch,
          orderStatus: filter.orderStatus,
          sort: filter.sortBy,
          page: filter.page,
          limit: filter.limit,
        },
        withCredentials: true,
      });

      setOrders(data);
    } catch (error) {
      setError(error?.response?.data || error.message);
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminOrdersContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        setLoading,
        fetchAdminOrders,
        filter,
        setFilter,
        error,
        setError,
      }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => useContext(AdminOrdersContext);
