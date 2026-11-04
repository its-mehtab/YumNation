import React, { useEffect, useState } from "react";
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
  Inbox,
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
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  useAdminDashboard,
  useRestaurants,
  useAdminOrders,
} from "../../context/admin";
import AdminDashboardSkeleton from "../../components/skeleton/admin/AdminDashboardSkeleton";
import { ErrorState } from "../../components/common";

const orderStatusConfig = {
  placed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  confirmed: "bg-amber-50 text-amber-700 border-amber-200",
  preparing: "bg-orange-50 text-orange-700 border-orange-200",
  "out for delivery": "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const today = dayjs();
const format = "MMM DD YYYY";
const dateDropdown = [
  {
    name: "Today",
    dayDetails: `Today (${today.format(format)})`,
    startDate: today.startOf("day").toISOString(),
    endDate: today.endOf("day").toISOString(),
  },
  {
    name: "Last 7 days",
    dayDetails: `Last 7 days (${today.subtract(6, "day").format(format)} - ${today.format(format)})`,
    startDate: today.subtract(6, "day").startOf("day").toISOString(),
    endDate: today.endOf("day").toISOString(),
  },
  {
    name: "This month",
    dayDetails: `This month (${today.startOf("month").format(format)} - ${today.format(format)})`,
    startDate: today.startOf("month").toISOString(),
    endDate: today.endOf("day").toISOString(),
  },
  {
    name: "Last month",
    dayDetails: `Last month (${today.subtract(1, "month").startOf("month").format(format)} - ${today.subtract(1, "month").endOf("month").format(format)})`,
    startDate: today.subtract(1, "month").startOf("month").toISOString(),
    endDate: today.subtract(1, "month").endOf("month").toISOString(),
  },
  {
    name: "This year",
    dayDetails: `This year (${today.startOf("year").format(format)} - ${today.format(format)})`,
    startDate: today.startOf("year").toISOString(),
    endDate: today.endOf("day").toISOString(),
  },
  {
    name: "Last year",
    dayDetails: `Last year (${today.subtract(1, "year").startOf("year").format(format)} - ${today.subtract(1, "year").endOf("year").format(format)})`,
    startDate: today.subtract(1, "year").startOf("year").toISOString(),
    endDate: today.subtract(1, "year").endOf("year").toISOString(),
  },
];

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOverviewDropdownOpen, setIsOverviewDropdownOpen] = useState(false);
  const [analaticsDropdown, setAnalaticsDropdown] = useState(dateDropdown[0]);

  const {
    dashboardStats,
    fetchDashboardStats,
    // searchParams,
    setSearchParams,
    loading,
    error,
  } = useAdminDashboard();
  const { orders, fetchAdminOrders, error: ordersError } = useAdminOrders();
  const { restaurants, fetchRestaurants, error: resError } = useRestaurants();

  const lineChartData = [
    { name: "Nov 20", value: 116 },
    { name: "Nov 21", value: 281 },
    { name: "Nov 22", value: 249 },
    { name: "Nov 23", value: 299 },
    { name: "Nov 24", value: 819 },
    { name: "Nov 25", value: 128 },
    { name: "Nov 26", value: 927 },
  ];

  const pieData = [
    {
      name: "Pending",
      value: dashboardStats?.orderStats.pending || 0,
      color: "#f97316",
    },
    {
      name: "Confirmed",
      value: dashboardStats?.orderStats.confirmed || 0,
      color: "#eab308",
    },
    {
      name: "Preparing",
      value: dashboardStats?.orderStats.preparing || 0,
      color: "#3b82f6",
    },
    {
      name: "Out for Delivery",
      value: dashboardStats?.orderStats.outForDelivery || 0,
      color: "#22c55e",
    },
    {
      name: "Delivered",
      value: dashboardStats?.orderStats.delivered || 0,
      color: "#4ade80",
    },
    {
      name: "Cancelled",
      value: dashboardStats?.orderStats.cancelled || 0,
      color: "#ef4444",
    },
  ];
  const hasPieOrders = pieData.some((item) => item.value > 0);

  const miniChartData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 25 },
    { value: 20 },
    { value: 30 },
  ];

  useEffect(() => {
    const params = {};
    params.startDate = analaticsDropdown.startDate;
    params.endDate = analaticsDropdown.endDate;
    setSearchParams(params);
  }, [analaticsDropdown]);

  if (error) return <ErrorState error={error} onRetry={fetchDashboardStats} />;
  if ((loading, !dashboardStats)) return <AdminDashboardSkeleton />;

  return (
    <div className="space-y-6 max-w-400 mx-auto">
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
            {analaticsDropdown.dayDetails}
            <ChevronDown size={16} className="text-gray-500 ml-1" />
          </div>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
              isDropdownOpen
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            }`}
          >
            <div className="py-1">
              {dateDropdown.map((item) => {
                return (
                  <button
                    key={item.name}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setAnalaticsDropdown(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
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
                <p className="text-gray-500 text-xs font-medium mb-1">
                  Total Restaurants
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalRestaurants}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0%{" "}
              <span className="text-gray-400 font-normal ml-1">
                vs. yesterday
              </span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={false}
                  />
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
                <p className="text-gray-500 text-xs font-medium mb-1">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalOrders}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0%{" "}
              <span className="text-gray-400 font-normal ml-1">
                vs. yesterday
              </span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#eab308"
                    strokeWidth={2}
                    dot={false}
                  />
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
                <p className="text-gray-500 text-xs font-medium mb-1">
                  Total Customers
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalCustomers}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0%{" "}
              <span className="text-gray-400 font-normal ml-1">
                vs. yesterday
              </span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
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
                <p className="text-gray-500 text-xs font-medium mb-1">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ${dashboardStats.totalRevenue}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs font-medium text-green-600 flex items-center gap-1">
              <ArrowUp size={12} strokeWidth={3} /> 0%{" "}
              <span className="text-gray-400 font-normal ml-1">
                vs. yesterday
              </span>
            </p>
            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
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
              <BarChart2
                className="text-orange-500"
                size={24}
                strokeWidth={2}
              />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">
                  Orders Overview
                </h3>
                <p className="text-xs text-gray-500">
                  Track your platform performance over time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                onClick={() =>
                  setIsOverviewDropdownOpen(!isOverviewDropdownOpen)
                }
              >
                Last 7 Days <ChevronDown size={14} />
              </div>

              <div
                className={`absolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                  isOverviewDropdownOpen
                    ? "scale-100 opacity-100 visible"
                    : "scale-95 opacity-0 invisible"
                }`}
              >
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOverviewDropdownOpen(false)}
                  >
                    Today
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOverviewDropdownOpen(false)}
                  >
                    Yesterday
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOverviewDropdownOpen(false)}
                  >
                    Last 7 Days
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOverviewDropdownOpen(false)}
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData}
                margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6 h-full">
          <div className="flex items-center gap-3 mb-8">
            <PieChartIcon
              className="text-orange-500"
              size={24}
              strokeWidth={2}
            />
            <div>
              <h3 className="font-bold text-gray-800 text-base leading-tight">
                Order Status
              </h3>
              <p className="text-xs text-gray-500">
                Real-time overview of all orders.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 h-52">
            <div className="relative w-1/2 h-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      hasPieOrders
                        ? pieData.filter((item) => item.value > 0)
                        : [{ name: "No Orders", value: 1, color: "#f3f4f6" }]
                    }
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={65}
                    dataKey="value"
                    nameKey="name"
                    stroke="none"
                    paddingAngle={hasPieOrders ? 2 : 0}
                  >
                    {(hasPieOrders
                      ? pieData.filter((item) => item.value > 0)
                      : [{ name: "No Orders", value: 1, color: "#f3f4f6" }]
                    ).map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>

                  {hasPieOrders && <Tooltip />}
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-800">
                  {dashboardStats.totalOrders}
                </span>
                <span className="text-[10px] text-gray-400">Total Orders</span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-3">
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-600 font-medium">
                      {item.name}
                    </span>
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
              <ListOrdered
                className="text-orange-500"
                size={24}
                strokeWidth={2}
              />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">
                  Recent Orders
                </h3>
                <p className="text-xs text-gray-500">
                  Latest orders from all restaurants.
                </p>
              </div>
            </div>
            <Link
              to={"./orders"}
              className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:text-orange-600 transition"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          {ordersError && (
            <ErrorState
              variant="inline"
              error={ordersError}
              onRetry={fetchAdminOrders}
            />
          )}

          {orders?.items && orders.items.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] text-gray-500 text-xs uppercase">
                    <th className="font-medium p-3 rounded-l-md whitespace-nowrap">
                      Order ID
                    </th>
                    <th className="font-medium p-3 whitespace-nowrap">
                      Restaurant
                    </th>
                    <th className="font-medium p-3 whitespace-nowrap">
                      Customer
                    </th>
                    <th className="font-medium p-3 whitespace-nowrap">Items</th>
                    <th className="font-medium p-3 whitespace-nowrap">Total</th>
                    <th className="font-medium p-3 whitespace-nowrap">
                      Status
                    </th>
                    <th className="font-medium p-3 rounded-r-md whitespace-nowrap">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.items.slice(0, 4).map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="p-3 whitespace-nowrap">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="text-xs font-mono font-bold text-gray-600 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-gray-200 px-2 py-1 rounded-md transition"
                        >
                          #{order._id.slice(0, 6).toUpperCase()}
                        </Link>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                            <Store size={16} strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                              {order.restaurantSnapshot?.name ||
                                order.restaurant?.name ||
                                "Restaurant"}
                            </p>
                            {order.deliveryAddress?.city && (
                              <p className="text-xs text-gray-500">
                                {order.deliveryAddress.city}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                          {order.user?.firstName
                            ? `${order.user.firstName} ${order.user.lastName || ""}`.trim()
                            : order.deliveryAddress?.fullName ||
                              order.user?.name ||
                              "Customer"}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                          {order.user?.email ||
                            order.deliveryAddress?.phoneNumber ||
                            ""}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-gray-700 font-medium truncate max-w-40">
                          {order.items?.[0]?.name || "—"}
                        </p>
                        {order.items?.length > 1 && (
                          <p className="text-xs text-[#fc8019] font-bold mt-1 bg-[#fff2e8] px-2 py-0.5 rounded w-fit whitespace-nowrap">
                            +{order.items.length - 1} more items
                          </p>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="font-bold text-gray-800 text-sm">
                          ${Number(order.totalAmount || 0).toFixed(2)}
                        </span>
                        {order.paymentMethod && (
                          <p className="text-[10px] font-bold tracking-wider text-gray-400 mt-0.5 uppercase">
                            {order.paymentMethod}
                          </p>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md capitalize border ${
                            orderStatusConfig[order.orderStatus] ||
                            "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-500 font-medium whitespace-nowrap">
                        <p>{dayjs(order.createdAt).format("MMM D, YYYY")}</p>
                        <p className="text-gray-400 mt-0.5 text-[11px]">
                          {dayjs(order.createdAt).format("h:mm A")}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Inbox size={48} strokeWidth={1} className="mb-3 text-gray-300" />
              <p className="text-gray-800 font-semibold text-sm">
                No orders found
              </p>
              <p className="text-xs">
                Orders will appear here once customers place them.
              </p>
            </div>
          )}
        </div>

        {/* Top Restaurants */}
        <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6 h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Crown className="text-orange-500" size={24} strokeWidth={2} />
              <div>
                <h3 className="font-bold text-gray-800 text-base leading-tight">
                  Top Restaurants
                </h3>
                <p className="text-xs text-gray-500">
                  Restaurants with the most orders.
                </p>
              </div>
            </div>
            <Link
              to={"./restaurants"}
              className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:text-orange-600 transition"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] text-gray-500 text-xs">
                  <th className="font-medium p-3 rounded-l-md">#</th>
                  <th className="font-medium p-3">Restaurant</th>
                  <th className="font-medium p-3">Orders</th>
                  <th className="font-medium p-3">Revenue</th>
                  <th className="font-medium p-3 rounded-r-md text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {resError && (
                  <ErrorState
                    variant="inline"
                    error={resError}
                    onRetry={fetchRestaurants}
                  />
                )}
                {restaurants &&
                  restaurants.items.map((restaurant) => {
                    return (
                      <tr
                        key={restaurant._id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-sm text-gray-600 font-medium">
                          #{(restaurant._id + 1).slice(0, 6)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                              <Store size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                                {restaurant.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {restaurant.address.city}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-600 font-medium">
                          {restaurant.totalOrders}
                        </td>
                        <td className="p-3 text-sm font-bold text-gray-800">
                          ${restaurant.revenue}
                        </td>
                        <td className="p-3 text-right">
                          <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md capitalize">
                            {restaurant.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
