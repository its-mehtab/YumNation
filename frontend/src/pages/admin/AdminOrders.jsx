import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useAdminOrders } from "../../context/admin/AdminOrdersContext";
import Pagination from "@mui/material/Pagination";

// ── Mock data ────────────────────────────────────────────────────────────────

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
  preparing: { color: "text-orange-600", bg: "bg-orange-50" },
  "out for delivery": { color: "text-blue-600", bg: "bg-blue-50" },
  delivered: { color: "text-green-600", bg: "bg-green-50" },
  cancelled: { color: "text-red-500", bg: "bg-red-50" },
};

const paymentStatusConfig = {
  paid: { color: "text-green-600", bg: "bg-green-50" },
  pending: { color: "text-yellow-600", bg: "bg-yellow-50" },
  failed: { color: "text-red-500", bg: "bg-red-50" },
};

// ── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ label, config }) => (
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${config.bg} ${config.color}`}
  >
    {label}
  </span>
);

// ── Status Update Dropdown ───────────────────────────────────────────────────
const StatusDropdown = ({ orderId, current, onChange }) => (
  <select
    value={current}
    onChange={(e) => onChange(orderId, e.target.value)}
    className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer capitalize
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
const AdminOrders = () => {
  const { orders, setOrders, loading, fetchAdminOrders, filter, setFilter } =
    useAdminOrders();

  // ── Filter + sort ──
  // const filtered = orders.items
  //   .filter((o) => {
  //     const matchStatus =
  //       statusFilter === "all" || o.orderStatus === statusFilter;
  //     const matchSearch =
  //       o?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
  //       o?._id?.slice(-6)?.toLowerCase().includes(search.toLowerCase()) ||
  //       o?.items?.some((i) =>
  //         i.name.toLowerCase().includes(search.toLowerCase()),
  //       );
  //     return matchStatus && matchSearch;
  //   })
  //   .sort((a, b) =>
  //     sortBy === "newest"
  //       ? new Date(b.createdAt) - new Date(a.createdAt)
  //       : sortBy === "oldest"
  //         ? new Date(a.createdAt) - new Date(b.createdAt)
  //         : sortBy === "highest"
  //           ? b.totalAmount - a.totalAmount
  //           : a.totalAmount - b.totalAmount,
  //   );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.items.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o,
      ),
    );
  };

  // console.log(orders);

  // ── Stats ──
  const stats = {
    total: orders.items?.length,
    pending: orders.items?.filter((o) => o.orderStatus === "placed").length,
    preparing: orders.items?.filter((o) => o.orderStatus === "preparing")
      .length,
    delivered: orders?.items?.filter((o) => o.orderStatus === "delivered")
      .length,
    revenue: orders?.items
      ?.filter((o) => o.paymentStatus === "paid")
      .reduce((acc, o) => acc + o.totalAmount, 0),
  };

  console.log(filter);

  if (loading) return "Loading...";

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Orders</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Admin</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Orders</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        {[
          { label: "Total Orders", value: stats.total, emoji: "📦" },
          { label: "New Orders", value: stats.pending, emoji: "🆕" },
          { label: "Preparing", value: stats.preparing, emoji: "👨‍🍳" },
          { label: "Delivered", value: stats.delivered, emoji: "✅" },
          {
            label: "Revenue",
            value: `$${stats.revenue?.toFixed(2)}`,
            emoji: "💰",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] px-4 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">
                {s.label}
              </p>
              <p className="text-xl font-bold text-gray-700">{s.value}</p>
            </div>
            <span className="text-2xl">{s.emoji}</span>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
        {/* ── Card header ── */}
        <div className="px-6 py-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-700">All Orders</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <input
                value={filter.orderSearch}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    orderSearch: e.target.value,
                  }))
                }
                placeholder="Search by name, order ID..."
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-56"
              />
              {/* Sort */}
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }))
                }
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
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
                onClick={() =>
                  setFilter((prev) => ({
                    ...prev,
                    statusFilter: s,
                  }))
                }
                className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize transition-colors ${
                  filter.statusFilter === s
                    ? "bg-[#fc8019] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {s}
                {s !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({orders?.items?.filter((o) => o.orderStatus === s).length})
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
              <tr className="border-b border-gray-100">
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
              {orders.items?.map((order) => (
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
                      {order.user.firstName}
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
                      to={`/admin/orders/${order._id}`}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors inline-flex"
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
          <div className="mt-6 flex justify-center">
            <Pagination
              count={orders.pagination?.totalPages}
              page={filter.page}
              onChange={(e, value) =>
                setFilter((prev) => ({ ...prev, page: value }))
              }
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>

        {/* Empty state */}
        {orders.items?.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-sm font-medium">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
