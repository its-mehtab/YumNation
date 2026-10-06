import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  XCircle,
  HelpCircle,
  MoreHorizontal,
  User,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const RestaurantDashboard = () => {
  // Chart Data
  const barData = [
    { name: "Mon", income: 400, expense: 240 },
    { name: "Tue", income: 300, expense: 139 },
    { name: "Wed", income: 200, expense: 980 },
    { name: "Thu", income: 278, expense: 390 },
    { name: "Fri", income: 189, expense: 480 },
    { name: "Sat", income: 239, expense: 380 },
    { name: "Sun", income: 349, expense: 430 },
  ];

  const areaData = [
    { name: "Mon", thisWeek: 40, lastWeek: 75 },
    { name: "Tue", thisWeek: 55, lastWeek: 25 },
    { name: "Wed", thisWeek: 50, lastWeek: 60 },
    { name: "Thu", thisWeek: 40, lastWeek: 25 },
    { name: "Fri", thisWeek: 75, lastWeek: 15 },
    { name: "Sat", thisWeek: 80, lastWeek: 70 },
    { name: "Sun", thisWeek: 40, lastWeek: 75 },
  ];

  const pieData = [
    { name: "Pizza (27%)", value: 763, color: "#ea6a12" },
    { name: "Burger (50%)", value: 763, color: "#ef4444" },
    { name: "Drinks (23%)", value: 69, color: "#10b981" },
  ];

  const gaugeData = [
    { name: "Completed", value: 85, color: "#3b82f6" },
    { name: "Remaining", value: 15, color: "#dbeafe" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto bg-white">
      {/* Grid Layout matching FoodDesk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Main Stats & Charts) - 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Income Card */}
          <div className="bg-[#fff9f4] border border-[#f5d0b5] rounded-md p-6 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-1">
                Total Income
              </p>
              <h2 className="text-[28px] font-bold text-[#ea6a12] leading-none">
                $4,890.00
              </h2>
            </div>

            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>

            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-1">
                Income
              </p>
              <h3 className="text-[19px] font-bold text-gray-800 leading-none mb-1">
                $1,345.00
              </h3>
              <p className="text-[11px] font-semibold text-green-500 flex items-center gap-0.5">
                <ArrowUpRight size={12} strokeWidth={2.5} /> +15%
              </p>
            </div>

            <div className="h-10 w-px bg-gray-200 hidden md:block"></div>

            <div>
              <p className="text-[13px] font-medium text-gray-500 mb-1">
                Expense
              </p>
              <h3 className="text-[19px] font-bold text-gray-800 leading-none mb-1">
                $890.00
              </h3>
              <p className="text-[11px] font-semibold text-red-500 flex items-center gap-0.5">
                <ArrowDownRight size={12} strokeWidth={2.5} /> -10%
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6">
            {/* Bar Chart */}
            <div className="bg-white border border-[#fca5a5] rounded-md p-5 h-56 shadow-sm transition-shadow [&_.recharts-surface]:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  barCategoryGap="15%"
                  barSize={60}
                >
                  <Tooltip
                    cursor={{ fill: "#fff2e8" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="income" fill="#ea6a12" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Rate Row */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-800">Order Rate</h3>
              <div className="flex items-center gap-6">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ea6a12]"></span>{" "}
                      This Week
                    </p>
                    <p className="text-[13px] font-bold text-gray-800 mt-0.5 ml-4">
                      324
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-500 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-red-500"></span>{" "}
                      Last Week
                    </p>
                    <p className="text-[13px] font-bold text-gray-800 mt-0.5 ml-4">
                      310
                    </p>
                  </div>
                </div>
                <select className="border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-600 outline-none">
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-3 bg-[#ea6a12] text-white py-2 px-3 rounded-md min-w-[140px]">
                <div className="border border-white/40 p-1 rounded-md">
                  <User size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-white/90 leading-none mb-1">
                    Order Total
                  </p>
                  <p className="text-sm font-bold leading-none">1.307</p>
                </div>
              </div>
            </div>

            {/* Area Chart */}
            <div className="h-50 w-full mt-4 [&_.recharts-surface]:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                >
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="colorThisWeek"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorLastWeek"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <CartesianGrid vertical={false} stroke="#f3f4f6" />
                  <Area
                    type="monotone"
                    dataKey="thisWeek"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorThisWeek)"
                  />
                  <Area
                    type="monotone"
                    dataKey="lastWeek"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLastWeek)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Stats) - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Cards (Individual rounded-md cards with thin borders) */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: "Total Order Complete",
                value: "2.678",
                icon: CheckCircle2,
                color: "text-[#ea6a12]",
                border: "border-gray-200",
              },
              {
                label: "Total Order Delivered",
                value: "1.234",
                icon: CheckCircle2,
                color: "text-[#ea6a12]",
                border: "border-gray-200",
              },
              {
                label: "Total Order Canceled",
                value: "123",
                icon: XCircle,
                color: "text-[#ea6a12]",
                border: "border-gray-200",
              },
              {
                label: "Order Pending",
                value: "432",
                icon: HelpCircle,
                color: "text-[#ea6a12]",
                border: "border-gray-200",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white border ${stat.border} rounded-md p-4 flex items-center gap-4 shadow-sm transition-colors`}
              >
                <div className="p-2 border border-gray-100 rounded-md text-[#ea6a12]">
                  <stat.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-base font-bold text-gray-800 leading-none">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Food Donut Chart */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-800">
                Popular Food
              </h3>
              <MoreHorizontal
                className="text-gray-400 cursor-pointer"
                size={20}
              />
            </div>

            <div className="h-[200px] relative mb-6 [&_.recharts-surface]:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-gray-800">Legend</h4>
              {pieData.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-md"
                      style={{ backgroundColor: d.color }}
                    ></span>
                    <span className="text-gray-500">{d.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
