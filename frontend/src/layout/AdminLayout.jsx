import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => (
  <div className="grid grid-cols-11 h-screen bg-gray-50">
    <AdminSidebar />
    <div className="col-span-9 flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
