import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../user/AuthContext";

const AdminDashboardContext = createContext();

export const AdminDashboardProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { serverURL } = useAuth();

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${serverURL}/api/admin/dashboard`, {
        params: searchParams,
        withCredentials: true,
      });

      setDashboardStats(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardContext.Provider
      value={{
        dashboardStats,
        setDashboardStats,
        fetchDashboardStats,
        loading,
        setLoading,
        error,
        setError,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

export default AdminDashboardContext;
