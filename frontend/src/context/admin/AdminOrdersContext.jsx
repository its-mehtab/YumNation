import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const AdminOrdersContext = createContext();

export const AdminOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    orderSearch: "",
    statusFilter: "",
    sortBy: "newest",
    page: 1,
    limit: 2,
  });

  const { serverURL } = useAuth();

  const fetchAdminOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/orders`, {
        params: {
          search: filter.orderSearch,
          statusFilter: filter.statusFilter,
          sort: filter.sortBy,
          page: filter.page,
          limit: filter.limit,
        },
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
    fetchAdminOrders();
  }, [filter.page, filter.orderStatus, filter.orderSearchlter]);

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
      }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => useContext(AdminOrdersContext);
