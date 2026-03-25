import RestaurantLayout from "../layout/RestaurantLayout";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import RestaurantDashboard from "../pages/owner/RestaurantDashboard";
import RestaurantOrders from "../pages/owner/RestaurantOrders";
import RestaurantOrderDetails from "../pages/owner/RestaurantOrderDetails";
import RestaurantDishes from "../pages/owner/RestaurantDishes";
import RestaurantAddDish from "../pages/owner/RestaurantAddDish";
import RestaurantDishDetails from "../pages/owner/RestaurantDishDetails";
import RestaurantSettings from "../pages/owner/RestaurantSettings";
import RestaurantApply from "../pages/owner/RestaurantApply";
import RestaurantPendingApproval from "../pages/owner/RestaurantPendingApproval";
import RestaurantRejectedPage from "../pages/owner/RestaurantRejectedPage";
import { useRestaurant } from "../context/owner/RestaurantContext";
import RestaurantSuspended from "../pages/owner/RestaurantSuspended";
import RestaurantEditDish from "../pages/owner/RestaurantEditDish";

const RestaurantRoutes = () => {
  const { user } = useAuth();
  const { restaurant, loading } = useRestaurant();

  if (user || restaurant) {
    if (!user || user?.role !== "restaurant") return <Navigate to="/" />;
  }

  if (!loading) {
    if (!restaurant) return <RestaurantApply />;

    if (restaurant?.status === "pending") return <RestaurantPendingApproval />;

    if (restaurant?.status === "suspended") return <RestaurantSuspended />;

    if (restaurant?.status === "rejected") return <RestaurantRejectedPage />;
  }

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
