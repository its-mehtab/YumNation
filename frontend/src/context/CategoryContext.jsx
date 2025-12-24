import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/categories`);

      setCategories(data.slice(0, 8));
    } catch (error) {
      console.log("Categories Error:", error?.response?.data || error.message);
      setCategories(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, loading, setLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
