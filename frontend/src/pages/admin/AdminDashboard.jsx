import React from "react";
import { DishIcon } from "../../assets/icon/Icons";

const AdminDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Total Dishes", value: "683", change: "+12 this week" },
          { label: "Total Revenue", value: "$65,683", change: "+$1,240 today" },
          { label: "Total Orders", value: "3,683", change: "+48 today" },
          { label: "Total Customers", value: "12,683", change: "+5 today" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 bg-white rounded-2xl border border-[#b2b2b254] flex justify-between gap-3 items-center"
          >
            <div>
              <p className="text-xs font-medium capitalize text-gray-400 mb-1.5">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-700">{stat.value}</h3>
              <p className="text-xs text-green-500 font-medium mt-1.5">
                {stat.change}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <DishIcon size={28} color="#fc8019" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
