import axios from "axios";
import React, { createContext, useState } from "react";
import { useAuth } from "../user/AuthContext";
import dayjs from "dayjs";

const OwnerDashboardContext = createContext();

export const OwnerDashboardProvider = ({ children }) => {
  const [ownerDashboardData, setOwnerDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analaticsDropdown, setAnalaticsDropdown] = useState({
    name: "This year",
    dayDetails: `This year (${dayjs().startOf("year").format("MMM DD YYYY")} - ${dayjs().format("MMM DD YYYY")})`,
    startDate: dayjs().startOf("year").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const { serverURL } = useAuth();

  const fetchOwnerDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${serverURL}/api/owner/dashboard`, {
        params: {
          startDate: analaticsDropdown.startDate,
          endDate: analaticsDropdown.endDate,
        },
        withCredentials: true,
      });

      setOwnerDashboardData(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OwnerDashboardContext.Provider
      value={{
        ownerDashboardData,
        setOwnerDashboardData,
        loading,
        setLoading,
        error,
        setError,
        analaticsDropdown,
        setAnalaticsDropdown,
        fetchOwnerDashboard,
      }}
    >
      {children}
    </OwnerDashboardContext.Provider>
  );
};

export default OwnerDashboardContext;
