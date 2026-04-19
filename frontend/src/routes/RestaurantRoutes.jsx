import RestaurantLayout from "../layout/RestaurantLayout";
import { useAuth } from "../context/user/AuthContext";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import RestaurantApply from "../pages/owner/RestaurantApply";
import RestaurantPendingApproval from "../pages/owner/RestaurantPendingApproval";
import RestaurantRejectedPage from "../pages/owner/RestaurantRejectedPage";
import { useRestaurant } from "../context/owner/RestaurantContext";
import RestaurantSuspended from "../pages/owner/RestaurantSuspended";
import Loader from "../components/public/Loader";

const RestaurantRoutes = () => {
  const { user, loading: authLoading } = useAuth();
  const { restaurant, loading } = useRestaurant();

  if (authLoading)
    return (
      <div>
        <Loader />
      </div>
    );

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
      <Outlet />
    </RestaurantLayout>
  );
};

export default RestaurantRoutes;
