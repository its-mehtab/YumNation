import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../user/AuthContext";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(false);
  const { serverURL } = useAuth();

  const fetchCoupon = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/coupon`, {
        withCredentials: true,
      });

      console.log(data);
      setCoupon(data);
    } catch (error) {
      console.log("Coupon Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CouponContext.Provider
      value={{ coupon, setCoupon, fetchCoupon, loading, setLoading }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => useContext(CouponContext);
