import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// ── Mock data ─────────────────────────────────────────────────────────────────
const restaurant = {
  name: "Pizza Palace",
  logo: null,
  isOpen: true,
  status: "active",
  rating: 4.5,
  totalReviews: 128,
  deliveryTime: 35,
};

const stats = [
  {
    label: "Today's Orders",
    value: "24",
    change: "+6 vs yesterday",
    up: true,
    emoji: "📦",
  },
  {
    label: "Today's Revenue",
    value: "$348",
    change: "+$82 vs yesterday",
    up: true,
    emoji: "💵",
  },
  {
    label: "Active Dishes",
    value: "18",
    change: "3 unavailable",
    up: null,
    emoji: "🍽️",
  },
  {
    label: "Avg Rating",
    value: "4.5",
    change: "128 reviews",
    up: true,
    emoji: "⭐",
  },
];

const recentOrders = [
  {
    _id: "o1",
    items: ["Margherita Pizza", "Garlic Bread"],
    total: 22.5,
    status: "placed",
    time: "2026-03-12T10:05:00Z",
    customer: "John D.",
  },
  {
    _id: "o2",
    items: ["Pepperoni Pizza"],
    total: 15.0,
    status: "preparing",
    time: "2026-03-12T09:48:00Z",
    customer: "Priya S.",
  },
  {
    _id: "o3",
    items: ["BBQ Chicken Pizza", "Coke"],
    total: 21.0,
    status: "out for delivery",
    time: "2026-03-12T09:30:00Z",
    customer: "Ravi K.",
  },
  {
    _id: "o4",
    items: ["Margherita Pizza"],
    total: 12.0,
    status: "delivered",
    time: "2026-03-12T09:10:00Z",
    customer: "Sara M.",
  },
  {
    _id: "o5",
    items: ["Garlic Bread", "Pasta"],
    total: 17.5,
    status: "delivered",
    time: "2026-03-12T08:55:00Z",
    customer: "Ali H.",
  },
];

const topDishes = [
  { name: "Margherita Pizza", orders: 84, revenue: "$1,008", trend: "up" },
  { name: "Pepperoni Pizza", orders: 61, revenue: "$915", trend: "up" },
  { name: "Garlic Bread", orders: 55, revenue: "$275", trend: "down" },
  { name: "BBQ Chicken Pizza", orders: 42, revenue: "$756", trend: "up" },
  { name: "Pasta Arrabiata", orders: 30, revenue: "$390", trend: "down" },
];

const weekData = [
  { day: "Mon", orders: 18 },
  { day: "Tue", orders: 24 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 30 },
  { day: "Fri", orders: 42 },
  { day: "Sat", orders: 38 },
  { day: "Sun", orders: 24 },
];

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  placed: { label: "Placed", color: "text-indigo-500", bg: "bg-indigo-50" },
  confirmed: {
    label: "Confirmed",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  preparing: {
    label: "Preparing",
    color: "text-[#fc8019]",
    bg: "bg-orange-50",
  },
  "out for delivery": {
    label: "Out for Delivery",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50" },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-50" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] ${className}`}
  >
    {children}
  </div>
);

const maxOrders = Math.max(...weekData.map((d) => d.orders));

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantDashboard = () => {
  const [isOpen, setIsOpen] = useState(restaurant.isOpen);
  const [orderFilter, setOrderFilter] = useState("all");

  const filteredOrders =
    orderFilter === "all"
      ? recentOrders
      : recentOrders.filter((o) => o.status === orderFilter);

  return (
    <div className="space-y-5">
      {/* ── Welcome header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl">
            {restaurant.logo ? (
              <img
                src={restaurant.logo}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              "🍽️"
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-700">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-gray-400">
                ⭐ {restaurant.rating} · {restaurant.totalReviews} reviews · ⏱{" "}
                {restaurant.deliveryTime} min
              </span>
              {restaurant.status === "active" ? (
                <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full">
                  Approved ✅
                </span>
              ) : (
                <span className="text-xs bg-yellow-50 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">
                  Pending Review ⏳
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Open / closed toggle */}
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)]">
          <div>
            <p className="text-xs font-semibold text-gray-700">
              {isOpen ? "🟢 Open for Orders" : "🔴 Closed"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isOpen ? "Customers can order now" : "No new orders accepted"}
            </p>
          </div>
          <Toggle checked={isOpen} onChange={() => setIsOpen((p) => !p)} />
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="border-l-4 border-l-[#fc8019] px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-gray-700">{s.value}</p>
              <p
                className={`text-xs font-medium mt-1.5 ${s.up === true ? "text-green-500" : s.up === false ? "text-red-400" : "text-gray-400"}`}
              >
                {s.up === true ? "↑" : s.up === false ? "↓" : ""} {s.change}
              </p>
            </div>
            <span className="text-3xl">{s.emoji}</span>
          </Card>
        ))}
      </div>

      {/* ── Middle row ── */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bar chart — weekly orders */}
        <Card className="col-span-7 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Weekly Orders
              </p>
              <p className="text-2xl font-bold text-gray-700 mt-1">
                191{" "}
                <span className="text-sm font-normal text-gray-400">
                  this week
                </span>
              </p>
            </div>
            <span className="text-xs bg-green-50 text-green-600 font-semibold px-3 py-1.5 rounded-full">
              ↑ 12% vs last week
            </span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weekData.map((d) => {
              const height = Math.round((d.orders / maxOrders) * 100);
              const isToday = d.day === "Thu";
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-semibold text-gray-500">
                    {d.orders}
                  </span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${height}%`,
                      background: isToday ? "#fc8019" : "#fee2c8",
                    }}
                  />
                  <span
                    className={`text-xs font-medium ${isToday ? "text-[#fc8019]" : "text-gray-400"}`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top dishes */}
        <Card className="col-span-5 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Top Dishes
            </p>
            <Link
              to="/owner/dishes"
              className="text-xs text-[#fc8019] font-semibold hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {topDishes.map((dish, i) => (
              <div key={dish.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 w-4">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    {dish.name}
                  </p>
                  <p className="text-xs text-gray-400">{dish.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-700">
                    {dish.revenue}
                  </p>
                  <p
                    className={`text-xs font-semibold ${dish.trend === "up" ? "text-green-500" : "text-red-400"}`}
                  >
                    {dish.trend === "up" ? "↑" : "↓"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Recent orders ── */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Recent Orders
          </p>
          <div className="flex items-center gap-2">
            {/* Filter tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 text-xs font-semibold">
              {["all", "placed", "preparing", "delivered"].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1.5 rounded-md capitalize transition-all ${orderFilter === f ? "bg-white text-[#fc8019] shadow-sm" : "text-gray-400"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <Link
              to="/restaurant/orders"
              className="text-xs text-[#fc8019] font-semibold border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                {[
                  "Order",
                  "Customer",
                  "Items",
                  "Total",
                  "Status",
                  "Time",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => {
                const cfg = statusConfig[order.status];
                return (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-400">
                      #{order._id.toUpperCase()}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs max-w-36 truncate">
                      {order.items.join(", ")}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-[#fc8019]">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${cfg.bg} ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                      {dayjs(order.time).format("h:mm A")}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        to={`/restaurant/orders/${order._id}`}
                        className="text-xs text-[#fc8019] font-semibold hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">📭</div>
              <p className="text-sm font-medium">No orders found</p>
            </div>
          )}
        </div>
      </Card>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Add New Dish",
            desc: "Add a dish to your menu",
            emoji: "➕",
            to: "/restaurant/dish/add",
            color: "border-orange-200 hover:bg-orange-50",
          },
          {
            label: "Manage Menu",
            desc: "Edit prices & availability",
            emoji: "🍽️",
            to: "/restaurant/dishes",
            color: "border-blue-100 hover:bg-blue-50",
          },
          {
            label: "View Profile",
            desc: "Update restaurant details",
            emoji: "⚙️",
            to: "/restaurant/settings",
            color: "border-green-100 hover:bg-green-50",
          },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className={`bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] border ${action.color} p-5 flex items-center gap-4 transition-colors`}
          >
            <span className="text-3xl">{action.emoji}</span>
            <div>
              <p className="text-sm font-bold text-gray-700">{action.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
