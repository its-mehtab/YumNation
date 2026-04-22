import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "../user/AuthContext";
import { useEffect } from "react";

const CategoryAdminContext = createContext();

export const CategoryAdminPovider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { serverURL } = useAuth();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/categories`, {
        withCredentials: true,
      });

      // console.log(data);
    } catch (error) {
      console.log(
        "Admin Category Error:",
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryAdminContext.Provider
      value={{
        categories,
        setCategories,
        fetchCategories,
        loading,
        setLoading,
      }}
    >
      {children}
    </CategoryAdminContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryAdminContext);
