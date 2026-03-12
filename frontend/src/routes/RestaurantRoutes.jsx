import RestaurantLayout from "../layout/RestaurantLayout";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import RestaurantOrders from "../pages/restaurant/RestaurantOrders";
import RestaurantOrderDetails from "../pages/restaurant/RestaurantOrderDetails";
import RestaurantDishes from "../pages/restaurant/RestaurantDishes";
import RestaurantAddDish from "../pages/restaurant/RestaurantAddDish";
import RestaurantDishDetails from "../pages/restaurant/RestaurantDishDetails";
import RestaurantSettings from "../pages/restaurant/RestaurantSettings";
import RestaurantApply from "../pages/restaurant/RestaurantApply";
import RestaurantPendingApproval from "../pages/restaurant/RestaurantPendingApproval";
import RestaurantRejectedPage from "../pages/restaurant/RestaurantRejectedPage";

const RestaurantRoutes = () => {
  const { user } = useAuth();

  if (user?.role !== "restaurant") return <Navigate to="/" />;

  if (!user || user?.role !== "restaurant") return <Navigate to="/" />;

  if (!user?.restaurant) return <RestaurantApply />;

  if (user?.restaurant?.status === "pending")
    return <RestaurantPendingApproval />;

  if (user?.restaurant?.status === "rejected")
    return <RestaurantRejectedPage />;

  return (
    <RestaurantLayout>
      <Routes>
        <Route path="/" element={<RestaurantDashboard />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/orders/:id" element={<RestaurantOrderDetails />} />
        <Route path="/dishes" element={<RestaurantDishes />} />
        <Route path="/dish/:id" element={<RestaurantDishDetails />} />
        <Route path="/dishes/add" element={<RestaurantAddDish />} />
        <Route path="/settings" element={<RestaurantSettings />} />
      </Routes>
    </RestaurantLayout>
  );
};

export default RestaurantRoutes;
