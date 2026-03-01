import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const { serverURL } = useAuth();
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/products`, {
        withCredentials: true,
      });

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, setLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
