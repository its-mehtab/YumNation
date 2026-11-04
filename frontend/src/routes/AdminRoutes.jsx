import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/user/AuthContext";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Loader from "../components/public/Loader";

const AdminRoutes = () => {
  const { user, error } = useAuth();

  if (error) return <Navigate to="/login" />;

  if (user && user.role !== "admin") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;
