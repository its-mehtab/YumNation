import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminDishes from "../pages/admin/AdminDishes";
import AddDish from "../pages/admin/AddDish";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import AddRestaurant from "../pages/admin/AddRestaurant";
import AdminRestaurants from "../pages/admin/AdminRestaurants";

const AdminRoutes = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/restaurants" element={<AdminRestaurants />} />
        <Route path="/restaurant/add" element={<AddRestaurant />} />
        <Route path="/dishes" element={<AdminDishes />} />
        <Route path="/dishes/add" element={<AddDish />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/orders/:id" element={<AdminOrderDetails />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
