import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../user/AuthContext";

const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    search: "",
    filterStatus: "",
    sortBy: "recent_order",
    page: 1,
    limit: 1,
  });

  const { serverURL } = useAuth();

  const fetchAllUsers = async () => {
    console.log(`${serverURL}/api/admin/users`);

    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/users`, {
        params: {
          search: filter.search,
          status: filter.filterStatus,
          sort: filter.sortBy,
          page: filter.page,
          limit: filter.limit,
        },
        withCredentials: true,
      });

      console.log(data);

      setAllUsers(data);
    } catch (error) {
      console.log("Coupon Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AllUsersContext.Provider
      value={{
        allUsers,
        setAllUsers,
        loading,
        setLoading,
        fetchAllUsers,
        filter,
        setFilter,
      }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(AllUsersContext);
