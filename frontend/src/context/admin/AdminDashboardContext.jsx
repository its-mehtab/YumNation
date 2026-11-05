import axios from "axios";
import React, { useState, createContext } from "react";
import { useAuth } from "../user/AuthContext";
import dayjs from "dayjs";

const AdminDashboardContext = createContext();

export const AdminDashboardProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analaticsDropdown, setAnalaticsDropdown] = useState({
    name: "Today",
    dayDetails: `Today (${dayjs().format("MMM DD YYYY")})`,
    startDate: dayjs().startOf("day").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const { serverURL } = useAuth();

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${serverURL}/api/admin/dashboard`, {
        params: {
          startDate: analaticsDropdown.startDate,
          endDate: analaticsDropdown.endDate,
        },
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
        analaticsDropdown,
        setAnalaticsDropdown,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

export default AdminDashboardContext;
