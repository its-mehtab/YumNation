import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Pagination from "@mui/material/Pagination";
import {
  Package,
  Sparkles,
  ChefHat,
  CheckCircle,
  Banknote,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";

// ── Mock data ────────────────────────────────────────────────────────────────
const mockOrders = [
  {
    _id: "64f3a2b1c9e1234567890001",
    user: { name: "John Doe", email: "john@example.com" },
    items: [{ name: "Italian Pizza" }, { name: "Coke" }],
    totalAmount: 89.5,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "placed",
    deliveryAddress: { city: "New York", state: "NY" },
    createdAt: "2026-03-10T10:20:00Z",
  },
  {
    _id: "64f3a2b1c9e1234567890002",
    user: { name: "Sara Smith", email: "sara@example.com" },
    items: [{ name: "Veg Burger" }],
    totalAmount: 24.0,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "preparing",
    deliveryAddress: { city: "Los Angeles", state: "CA" },
    createdAt: "2026-03-10T11:05:00Z",
  },
  {
    _id: "64f3a2b1c9e1234567890003",
    user: { name: "Mike Johnson", email: "mike@example.com" },
    items: [
      { name: "Spaghetti" },
      { name: "Garlic Bread" },
      { name: "Tiramisu" },
    ],
    totalAmount: 56.75,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    deliveryAddress: { city: "Chicago", state: "IL" },
    createdAt: "2026-03-09T18:30:00Z",
  },
  {
    _id: "64f3a2b1c9e1234567890004",
    user: { name: "Emily Davis", email: "emily@example.com" },
    items: [{ name: "Red Velvet Cake" }],
    totalAmount: 15.0,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "confirmed",
    deliveryAddress: { city: "Houston", state: "TX" },
    createdAt: "2026-03-10T09:15:00Z",
  },
  {
    _id: "64f3a2b1c9e1234567890005",
    user: { name: "Chris Brown", email: "chris@example.com" },
    items: [{ name: "Chicken Wings" }, { name: "Fries" }],
    totalAmount: 38.0,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "out for delivery",
    deliveryAddress: { city: "Phoenix", state: "AZ" },
    createdAt: "2026-03-10T12:45:00Z",
  },
  {
    _id: "64f3a2b1c9e1234567890006",
    user: { name: "Anna Wilson", email: "anna@example.com" },
    items: [{ name: "Margherita Pizza" }],
    totalAmount: 22.5,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "cancelled",
    deliveryAddress: { city: "Philadelphia", state: "PA" },
    createdAt: "2026-03-08T14:10:00Z",
  },
];

const STATUS_OPTIONS = [
  "all",
  "placed",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
  "cancelled",
];

const statusConfig = {
  placed: { color: "text-indigo-600", bg: "bg-indigo-50" },
  confirmed: { color: "text-amber-600", bg: "bg-amber-50" },
  preparing: { color: "text-[#fc8019]", bg: "bg-orange-50" },
  "out for delivery": { color: "text-[#fc8019]", bg: "bg-blue-50" },
  delivered: { color: "text-[#fc8019]", bg: "bg-green-50" },
  cancelled: { color: "text-red-500", bg: "bg-red-50" },
};

const paymentStatusConfig = {
  paid: { color: "text-[#fc8019]", bg: "bg-green-50" },
  pending: { color: "text-yellow-600", bg: "bg-yellow-50" },
  failed: { color: "text-red-500", bg: "bg-red-50" },
};

// ── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ label, config }) => (
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-md capitalize ${config.bg} ${config.color}`}
  >
    {label}
  </span>
);

// ── Status Update Dropdown ───────────────────────────────────────────────────
const StatusDropdown = ({ orderId, current, onChange }) => (
  <select
    value={current}
    onChange={(e) => onChange(orderId, e.target.value)}
    className={`text-xs font-semibold px-2.5 py-1 rounded-md border-0 outline-none cursor-pointer capitalize
      ${statusConfig[current]?.bg} ${statusConfig[current]?.color}`}
  >
    {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
      <option key={s} value={s} className="bg-white text-gray-700">
        {s}
      </option>
    ))}
  </select>
);

// ── Main Component ───────────────────────────────────────────────────────────
const RestaurantOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [filter, setFilter] = useState({
    status: "all",
    search: "",
    sortBy: "newest",
  });

  const { serverURL } = useAuth();

  // ── Filter + sort ──
  const filtered = orders
    .filter((o) => {
      const matchStatus =
        filter.status === "all" || o.orderStatus === filter.status;
      const matchSearch =
        o.user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        o._id.slice(-6).toLowerCase().includes(filter.search.toLowerCase()) ||
        o.items.some((i) =>
          i.name.toLowerCase().includes(filter.search.toLowerCase()),
        );
      return matchStatus && matchSearch;
    })
    .sort((a, b) =>
      filter.sortBy === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : filter.sortBy === "oldest"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : filter.sortBy === "highest"
            ? b.totalAmount - a.totalAmount
            : a.totalAmount - b.totalAmount,
    );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o,
      ),
    );
  };

  // ── Stats ──
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "placed").length,
    preparing: orders.filter((o) => o.orderStatus === "preparing").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    revenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((acc, o) => acc + o.totalAmount, 0),
  };

  const fetchRestaurantOrders = async () => {
    try {
      const { data } = await axios(`${serverURL}/api/owner/order`, {
        withCredentials: true,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantOrders();
  }, []);

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Orders</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>restaurant</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Orders</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
        {[
          {
            label: "Total Orders",
            value: stats.total,
            icon: Package,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
          {
            label: "New Orders",
            value: stats.pending,
            icon: Sparkles,
            color: "text-indigo-500",
            bg: "bg-indigo-50/50",
          },
          {
            label: "Preparing",
            value: stats.preparing,
            icon: ChefHat,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
          {
            label: "Delivered",
            value: stats.delivered,
            icon: CheckCircle,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
          {
            label: "Revenue",
            value: `$${stats.revenue.toFixed(2)}`,
            icon: Banknote,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-md  border border-gray-200 p-5 flex flex-col justify-between transition-all gap-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-md ${s.bg} ${s.color}`}>
                <s.icon size={18} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1 tracking-wide uppercase">
                {s.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800 tracking-tight">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-md border border-gray-200 transition-all overflow-hidden">
        {/* ── Card header ── */}
        <div className="px-6 py-4 border-b border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-700">All Orders</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <input
                value={filter.search}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Search by name, order ID..."
                className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-56"
              />
              {/* Sort */}
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Status filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter((prev) => ({ ...prev, status: s }))}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md capitalize transition-colors ${
                  filter.status === s
                    ? "bg-[#fc8019] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {s}
                {s !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({orders.filter((o) => o.orderStatus === s).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-gray-500">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-700 text-xs">
                      {order.user.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.user.email}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600 font-medium truncate max-w-32">
                      {order.items[0].name}
                    </p>
                    {order.items.length > 1 && (
                      <p className="text-xs text-[#fc8019] font-semibold mt-0.5">
                        +{order.items.length - 1} more
                      </p>
                    )}
                  </td>

                  {/* Address */}
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-4">
                    <span className="font-bold text-gray-700">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5 uppercase">
                      {order.paymentMethod}
                    </p>
                  </td>

                  {/* Payment status */}
                  <td className="px-4 py-4">
                    <Badge
                      label={order.paymentStatus}
                      config={
                        paymentStatusConfig[order.paymentStatus] ||
                        paymentStatusConfig.pending
                      }
                    />
                  </td>

                  {/* Order status — clickable dropdown */}
                  <td className="px-4 py-4">
                    <StatusDropdown
                      orderId={order._id}
                      current={order.orderStatus}
                      onChange={handleStatusChange}
                    />
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                    {dayjs(order.createdAt).format("MMM D, YYYY")}
                    <p className="text-gray-300">
                      {dayjs(order.createdAt).format("h:mm A")}
                    </p>
                  </td>

                  {/* View */}
                  <td className="px-4 py-4">
                    <Link
                      to={`/restaurant/orders/${order._id}`}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors inline-flex"
                      title="View"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="flex justify-center mb-3 text-gray-300">
              <Package size={40} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium">No orders found</p>
          </div>
        )}

        {/* Dummy Pagination UI for design */}
        {filtered.length > 0 && (
          <div className="mt-6 flex justify-center pb-6 border-t border-gray-100 pt-6">
            <Pagination
              count={5}
              page={1}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  "&.Mui-selected": {
                    backgroundColor: "#fc8019",
                    color: "white",
                    borderColor: "#fc8019",
                    "&:hover": {
                      backgroundColor: "#e5721f",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantOrders;
