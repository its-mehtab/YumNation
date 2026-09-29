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
} from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      to: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Restaurants",
      to: "/admin/restaurants",
      icon: Store,
    },
    {
      name: "Categories",
      to: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Orders",
      to: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Promo Codes",
      to: "/admin/promo",
      icon: Ticket,
    },
    {
      name: "Customers",
      to: "/admin/customers",
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full relative z-10 shrink-0">
      <div className="h-20 flex items-center px-8 border-b border-gray-50">
        <Link to="/admin">
          <img src={assets.logo} alt="logo" className="h-8 w-auto opacity-90" />
        </Link>
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
                  className={({ isActive }) =>
                    `flex gap-3.5 items-center text-sm px-4 py-2.5 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "text-[#fc8019] bg-orange-50/50"
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
                          isActive ? "text-[#fc8019]" : "text-gray-400 group-hover:text-gray-600"
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
  );
};

export default AdminSidebar;
