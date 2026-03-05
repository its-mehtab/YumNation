import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, RestaurantIcon } from "../../assets/icon/Icons.jsx";

const Aside = () => {
  return (
    <aside className="col-span-2 h-[87dvh]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 border-r border-[#b3b3b3] h-full">
        <ul>
          <li>
            <Link className="flex gap-4 items-center text-[15px] font-medium text-gray-500">
              <HomeIcon color="#888" size={22} />
              Home
            </Link>
          </li>
          <li>
            <Link className="flex gap-4 items-center text-[15px] font-medium text-gray-500 mt-8">
              <RestaurantIcon color="#888" size={22} />
              Restaurant
            </Link>
          </li>
          <li>
            <Link className="flex gap-4 items-center text-[15px] font-medium text-gray-500 mt-8">
              <HomeIcon color="#888" size={22} />
              Home
            </Link>
          </li>
          <li>
            <Link className="flex gap-4 items-center text-[15px] font-medium text-gray-500 mt-8">
              <HomeIcon color="#888" size={22} />
              Home
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
