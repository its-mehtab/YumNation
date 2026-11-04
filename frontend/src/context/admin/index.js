import { useContext } from "react";
import AdminDashboardContext from "./AdminDashboardContext";
import AdminOrdersContext from "./AdminOrdersContext";
import AllUsersContext from "./AllUsersContext";
import CategoryAdminContext from "./CategoryAdminContext";
import CouponContext from "./CouponContext";
import RestaurantsContext from "./RestaurantsContext";

export const useAdminDashboard = () => useContext(AdminDashboardContext);

export const useAdminOrders = () => useContext(AdminOrdersContext);

export const useAllUsers = () => useContext(AllUsersContext);

export const useCategories = () => useContext(CategoryAdminContext);

export const useCoupon = () => useContext(CouponContext);

export const useRestaurants = () => useContext(RestaurantsContext);
