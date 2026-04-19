import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/user/AuthContext";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;
