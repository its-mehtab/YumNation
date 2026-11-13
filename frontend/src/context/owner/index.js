import { useContext } from "react";
import OwnerDashboardContext from "./OwnerDashboardContext";
import OwnerOrdersContext from "./OwnerOrdersContext";
import DishContext from "./DishContext";
import RestaurantContext from "./RestaurantContext";

export const useOwnerDashboard = () => useContext(OwnerDashboardContext);
export const useOwnerOrders = () => useContext(OwnerOrdersContext);
export const useDish = () => useContext(DishContext);
export const useRestaurant = () => useContext(RestaurantContext);
