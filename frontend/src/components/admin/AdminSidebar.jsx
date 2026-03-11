import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RestaurantIcon } from "../../assets/icon/Icons";
import { assets } from "../../assets/assets";

const AdminSidebar = () => {
  return (
    <aside className="col-span-2 h-dvh relative z-10">
      <div className="mx-auto px-4 lg:px-5 py-6 bg-white shadow-[0_0_24px_20px_rgba(8,21,66,0.04)] h-full">
        <NavLink to="/admin" className="flex shrink-0 items-center mb-10">
          <img src={assets.logoYellow} alt="logo" className="h-8 w-auto" />
        </NavLink>
        <ul className="[&_li]:mt-5">
          <li>
            <NavLink
              to={"/admin"}
              end
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/restaurants"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Restaurants
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/dishes"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Dishes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/categories"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/orders"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/promo"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Promo Codes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/customers"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Customers
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/admin/reviews"} className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`}>
              <RestaurantIcon size={22} />
              Reviews
            </NavLink>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
