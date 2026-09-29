import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-50/50">
    <AdminSidebar />
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AdminHeader />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
