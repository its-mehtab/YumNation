import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RestaurantIcon } from "../../assets/icon/Icons";
import { assets } from "../../assets/assets";

const RestaurantSidebar = () => {
  return (
    <aside className="col-span-2 h-dvh relative z-10">
      <div className="mx-auto px-4 lg:px-5 py-6 border-r border-[#b2b2b2] h-full">
        <ul className="[&_li]:mt-5">
          <li>
            <NavLink
              to={"/restaurant"}
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
              to={"/restaurant/orders"}
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
              to={"/restaurant/dishes"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              My Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/restaurant/settings"}
              className={({ isActive }) =>
                `flex gap-3 items-center text-sm px-3 py-2.5 rounded-lg font-medium transition-all ${isActive ? "text-[#fc8019] bg-gray-100" : "text-gray-500"}`
              }
            >
              <RestaurantIcon size={22} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RestaurantSidebar;
