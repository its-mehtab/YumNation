import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/user/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import AdminRestaurants from "../pages/admin/AdminRestaurants";
import AdminRestaurantDetails from "../pages/admin/AdminRestaurantDetails";

const AdminRoutes = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/restaurants" element={<AdminRestaurants />} />
        <Route path="/restaurants/:slug" element={<AdminRestaurantDetails />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/orders/:id" element={<AdminOrderDetails />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
