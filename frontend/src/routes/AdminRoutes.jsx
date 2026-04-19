import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../context/user/AuthContext";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Loader from "../components/public/Loader";

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;
