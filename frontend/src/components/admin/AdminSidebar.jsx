import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import {
  LayoutDashboard,
  Store,
  Tags,
  ShoppingBag,
  Ticket,
  Users,
  X,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Restaurants", to: "/admin/restaurants", icon: Store },
    { name: "Categories", to: "/admin/categories", icon: Tags },
    { name: "Orders", to: "/admin/orders", icon: ShoppingBag },
    { name: "Promo Codes", to: "/admin/promo", icon: Ticket },
    { name: "Customers", to: "/admin/customers", icon: Users },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-10 w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 lg:px-8 bg-[#ea6a12]">
          <Link to="/admin" onClick={onClose}>
            <img
              src={assets.logo}
              alt="logo"
              className="h-8 w-auto brightness-0 invert"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white/80 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
            title="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-4">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">
            Main Menu
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    end={item.exact}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex gap-3.5 items-center text-sm px-4 py-2.5 rounded-md font-medium transition-colors ${
                        isActive
                          ? "text-white bg-[#ea6a12] shadow-md shadow-orange-500/20"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={
                            isActive
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-600"
                          }
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
