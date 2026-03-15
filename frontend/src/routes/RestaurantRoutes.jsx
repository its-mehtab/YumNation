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
import { useRestaurant } from "../context/restaurant/RestaurantContext";
import RestaurantSuspended from "../pages/restaurant/RestaurantSuspended";
import RestaurantEditDish from "../pages/restaurant/RestaurantEditDish";

const RestaurantRoutes = () => {
  const { user } = useAuth();
  const { restaurant } = useRestaurant();

  if (user?.role !== "restaurant") return <Navigate to="/" />;

  if (!user || user?.role !== "restaurant") return <Navigate to="/" />;

  if (!restaurant) return <RestaurantApply />;

  if (restaurant?.status === "pending") return <RestaurantPendingApproval />;

  if (restaurant?.status === "suspended") return <RestaurantSuspended />;

  if (restaurant?.status === "rejected") return <RestaurantRejectedPage />;

  return (
    <RestaurantLayout>
      <Routes>
        <Route path="/" element={<RestaurantDashboard />} />
        <Route path="/orders" element={<RestaurantOrders />} />
        <Route path="/orders/:id" element={<RestaurantOrderDetails />} />
        <Route path="/dishes" element={<RestaurantDishes />} />
        <Route path="/dish/:id" element={<RestaurantDishDetails />} />
        <Route path="/dish/add" element={<RestaurantAddDish />} />
        <Route path="/dish/edit/:id" element={<RestaurantEditDish />} />
        <Route path="/settings" element={<RestaurantSettings />} />
      </Routes>
    </RestaurantLayout>
  );
};

export default RestaurantRoutes;
