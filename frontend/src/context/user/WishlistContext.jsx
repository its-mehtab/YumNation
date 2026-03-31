import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();

  const fetchWishlist = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/wishlist`, {
        withCredentials: true,
      });

      setWishlist(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, loading, setLoading, fetchWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
