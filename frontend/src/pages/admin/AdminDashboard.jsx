import React from "react";
import { Utensils, DollarSign, ShoppingBag, Users, Store, ArrowUpRight } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Dishes",
      value: "683",
      change: "12 this week",
      icon: Utensils,
      color: "text-blue-500",
      bg: "bg-blue-50/50",
    },
    {
      label: "Total Revenue",
      value: "$65,683",
      change: "$1,240 today",
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50/50",
    },
    {
      label: "Total Orders",
      value: "3,683",
      change: "48 today",
      icon: ShoppingBag,
      color: "text-orange-500",
      bg: "bg-orange-50/50",
    },
    {
      label: "Total Customers",
      value: "12,683",
      change: "5 today",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-50/50",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Here's what's happening with your platform today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 bg-white rounded-2xl border border-gray-100 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} strokeWidth={2} />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14} strokeWidth={2.5} />
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800 tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] min-h-[320px] p-6 flex flex-col">
          <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Utensils size={32} className="mb-3 opacity-20" strokeWidth={1.5} />
            <p className="text-sm font-medium">Activity charts will appear here</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] min-h-[320px] p-6 flex flex-col">
          <h3 className="text-base font-semibold text-gray-900">Top Restaurants</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Store size={32} className="mb-3 opacity-20" strokeWidth={1.5} />
            <p className="text-sm font-medium">Ranking will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
