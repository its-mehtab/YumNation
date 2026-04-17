import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../user/AuthContext";

const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchAllUsers = async () => {
    console.log(`${serverURL}/api/admin/users`);

    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/users`, {
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
      value={{ allUsers, setAllUsers, loading, setLoading, fetchAllUsers }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(AllUsersContext);
