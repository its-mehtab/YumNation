import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../user/AuthContext";

const OwnerOrdersContext = createContext();

export const OwnerOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(data);
    } catch (error) {
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
      }}
    >
      {children}
    </OwnerOrdersContext.Provider>
  );
};

export const useOwnerOrders = () => useContext(OwnerOrdersContext);
