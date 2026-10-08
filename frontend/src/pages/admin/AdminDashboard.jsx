import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Store,
  Package,
  Users,
  DollarSign,
  ArrowUp,
  BarChart2,
  PieChart as PieChartIcon,
  ListOrdered,
  Crown,
  ArrowRight,
  Inbox
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOverviewDropdownOpen, setIsOverviewDropdownOpen] = useState(false);
  const lineChartData = [
    { name: "Nov 20", value: 0 },
    { name: "Nov 21", value: 0 },
    { name: "Nov 22", value: 0 },
    { name: "Nov 23", value: 0 },
    { name: "Nov 24", value: 0 },
    { name: "Nov 25", value: 0 },
    { name: "Nov 26", value: 0 },
  ];

  const pieData = [
    { name: "Pending", value: 0, color: "#f97316" }, 
    { name: "Confirmed", value: 0, color: "#eab308" }, 
    { name: "Preparing", value: 0, color: "#3b82f6" }, 
    { name: "Out for Delivery", value: 0, color: "#22c55e" }, 
    { name: "Delivered", value: 0, color: "#4ade80" }, 
    { name: "Cancelled", value: 0, color: "#ef4444" }, 
  ];

  const miniChartData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 25 },
    { value: 20 },
    { value: 30 },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Good morning, Admin 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="relative">
          <div 
            className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Calendar size={16} className="text-gray-500" />
            Today (Nov 26, 2024)
            <ChevronDown size={16} className="text-gray-500 ml-1" />
          </div>
          
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
              isDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
            }`}
          >
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Today</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Yesterday</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Last 7 Days</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>This Month</button>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Restaurants */}
        <div className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
                <Store size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Total Restaurants</p>
                <h3 className="text-2xl font-bold text-gray-800">1</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0% <span className="text-gray-400 font-normal ml-1">vs. yesterday</span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center">
                <Package size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-800">0</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0% <span className="text-gray-400 font-normal ml-1">vs. yesterday</span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Total Customers</p>
                <h3 className="text-2xl font-bold text-gray-800">0</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0% <span className="text-gray-400 font-normal ml-1">vs. yesterday</span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-500 flex items-center justify-center">
                <DollarSign size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">$0</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0% <span className="text-gray-400 font-normal ml-1">vs. yesterday</span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Overview */}
        <div className="lg:col-span-2 bg-white rounded-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <BarChart2 className="text-orange-500" size={24} strokeWidth={2} />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">Orders Overview</h3>
                <p className="text-xs text-gray-500">Track your platform performance over time.</p>
              </div>
            </div>
            <div className="relative">
                <div 
                  className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => setIsOverviewDropdownOpen(!isOverviewDropdownOpen)}
                >
                  Last 7 Days <ChevronDown size={14} />
                </div>
                
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                    isOverviewDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  }`}
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Today</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Yesterday</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Last 7 Days</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>This Month</button>
                  </div>
                </div>
              </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6 h-full">
          <div className="flex items-center gap-3 mb-8">
            <PieChartIcon className="text-orange-500" size={24} strokeWidth={2} />
            <div>
              <h3 className="font-bold text-gray-800 text-base leading-tight">Order Status</h3>
              <p className="text-xs text-gray-500">Real-time overview of all orders.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 h-52">
            <div className="relative w-1/2 h-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    fill="#f3f4f6"
                    dataKey="value"
                    stroke="none"
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-800">0</span>
                <span className="text-[10px] text-gray-400">Total Orders</span>
              </div>
            </div>
            
            <div className="w-1/2 flex flex-col gap-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-md border border-gray-200 p-6 h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ListOrdered className="text-orange-500" size={24} strokeWidth={2} />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">Recent Orders</h3>
                <p className="text-xs text-gray-500">Latest orders from all restaurants.</p>
              </div>
            </div>
            <button className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:text-orange-600 transition">
              View all <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] text-gray-500 text-xs uppercase">
                  <th className="font-medium p-3 rounded-l-md whitespace-nowrap">Order ID</th>
                  <th className="font-medium p-3 whitespace-nowrap">Restaurant</th>
                  <th className="font-medium p-3 whitespace-nowrap">Customer</th>
                  <th className="font-medium p-3 whitespace-nowrap">Total</th>
                  <th className="font-medium p-3 whitespace-nowrap">Status</th>
                  <th className="font-medium p-3 rounded-r-md whitespace-nowrap">Date</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Inbox size={48} strokeWidth={1} className="mb-3 text-gray-300" />
            <p className="text-gray-800 font-semibold text-sm">No orders found</p>
            <p className="text-xs">Orders will appear here once customers place them.</p>
          </div>
        </div>

        {/* Top Restaurants */}
        <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6 h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Crown className="text-orange-500" size={24} strokeWidth={2} />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">Top Restaurants</h3>
                <p className="text-xs text-gray-500">Restaurants with the most orders.</p>
              </div>
            </div>
            <button className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:text-orange-600 transition">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] text-gray-500 text-xs">
                  <th className="font-medium p-3 rounded-l-md">#</th>
                  <th className="font-medium p-3">Restaurant</th>
                  <th className="font-medium p-3">Orders</th>
                  <th className="font-medium p-3">Revenue</th>
                  <th className="font-medium p-3 rounded-r-md text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-600 font-medium">1</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <Store size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">Biryani House</p>
                        <p className="text-xs text-gray-500">Kolkata</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600 font-medium">0</td>
                  <td className="p-3 text-sm font-bold text-gray-800">$0</td>
                  <td className="p-3 text-right">
                    <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
                      Active
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
