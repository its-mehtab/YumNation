import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const OwnerOrdersContext = createContext();

export const OwnerOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    status: "all",
    search: "",
    sortBy: "newest",
    page: 1,
    limit: 12,
  });

  const { serverURL, user } = useAuth();

  const fetchRestaurantOrders = async () => {
    if (user?.role !== "restaurant") return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios(`${serverURL}/api/owner/order`, {
        params: {
          search: filter.search,
          sort: filter.sortBy,
          orderStatus: filter.status,
          page: filter.page,
          limit: filter.limit,
        },
        withCredentials: true,
      });

      setOrders(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "restaurant") {
      fetchRestaurantOrders();
    }
  }, [filter.page, filter.status, filter.sortBy, user]);

  useEffect(() => {
    if (user && user.role === "restaurant") {
      const timer = setTimeout(() => {
        fetchRestaurantOrders();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [filter.search, user]);

  return (
    <OwnerOrdersContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        setLoading,
        fetchRestaurantOrders,
        filter,
        setFilter,
        error,
        setError,
      }}
    >
      {children}
    </OwnerOrdersContext.Provider>
  );
};

export default OwnerOrdersContext;
