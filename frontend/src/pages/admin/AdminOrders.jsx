import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useAdminOrders } from "../../context/admin/AdminOrdersContext";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  Package,
  ShoppingBag,
  ChefHat,
  CheckCircle,
  DollarSign,
  Search,
  Eye,
  PackageOpen,
} from "lucide-react";

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
  placed: {
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  confirmed: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  preparing: {
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  "out for delivery": {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  delivered: {
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  cancelled: {
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

const paymentStatusConfig = {
  paid: {
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  pending: {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  failed: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

// ── Status Badge ─────────────────────────────────────────────────────────────
const Badge = ({ label, config }) => (
  <span
    className={`text-xs font-bold px-2.5 py-1 rounded-lg capitalize border ${config.bg} ${config.color} ${config.border}`}
  >
    {label}
  </span>
);

// ── Status Update Dropdown ───────────────────────────────────────────────────
const StatusDropdown = ({ orderId, current, onChange }) => (
  <div className="relative">
    <select
      value={current}
      onChange={(e) => onChange(orderId, e.target.value)}
      className={`appearance-none text-xs font-bold px-3 py-1.5 pr-8 rounded-lg border outline-none cursor-pointer capitalize transition-colors
        ${statusConfig[current]?.bg} ${statusConfig[current]?.color} ${statusConfig[current]?.border} focus:ring-2 focus:ring-opacity-50 focus:ring-${statusConfig[current]?.color.split("-")[1]}-400`}
    >
      {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
        <option
          key={s}
          value={s}
          className="bg-white text-gray-700 font-medium"
        >
          {s}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const AdminOrders = () => {
  const { serverURL } = useAuth();
  const { orders, setOrders, loading, fetchAdminOrders, filter, setFilter } =
    useAdminOrders();

  const handleStatusChange = async (orderId, newStatus) => {
    setOrders((prev) => ({
      ...prev,
      items: prev.items.map((o) => {
        if (o._id !== orderId) return o;

        let paymentStatus = o.paymentStatus;
        if (o.paymentMethod === "cod") {
          paymentStatus = newStatus === "delivered" ? "paid" : "pending";
        }

        return {
          ...o,
          orderStatus: newStatus,
          paymentStatus,
        };
      }),
    }));

    try {
      await axios.patch(
        `${serverURL}/api/admin/order/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true },
      );
      notifySuccess("Order status updated");
    } catch {
      notifyError("Failed to update status");
      fetchAdminOrders();
    }
  };

  // ── Stats ──
  const stats = {
    total: orders?.pagination?.total || 0,
    pending: orders?.statusCount?.placed || 0,
    preparing: orders?.statusCount?.preparing || 0,
    delivered: orders?.statusCount?.delivered || 0,
    revenue: orders?.totalRevenue || 0,
  };

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Monitor and manage all incoming orders
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {[
          {
            label: "Total Orders",
            value: stats.total,
            icon: Package,
            color: "text-blue-500",
            bg: "bg-blue-50/50",
          },
          {
            label: "New Orders",
            value: stats.pending,
            icon: ShoppingBag,
            color: "text-indigo-500",
            bg: "bg-indigo-50/50",
          },
          {
            label: "Preparing",
            value: stats.preparing,
            icon: ChefHat,
            color: "text-orange-500",
            bg: "bg-orange-50/50",
          },
          {
            label: "Delivered",
            value: stats.delivered,
            icon: CheckCircle,
            color: "text-emerald-500",
            bg: "bg-emerald-50/50",
          },
          {
            label: "Revenue",
            value: `$${stats.revenue?.toFixed(2)}`,
            icon: DollarSign,
            color: "text-purple-500",
            bg: "bg-purple-50/50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] border border-gray-100 p-5 flex flex-col justify-between transition-all hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)] gap-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>
                <s.icon size={18} strokeWidth={2} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1 tracking-wide uppercase">
                {s.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800 tracking-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        {/* ── Card header ── */}
        <div className="px-6 py-5 border-b border-gray-50 space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-gray-900">All Orders</h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  value={filter.orderSearch}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      orderSearch: e.target.value,
                    }))
                  }
                  placeholder="Search order ID or name..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all outline-none"
                />
              </div>
              {/* Sort */}
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }))
                }
                className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 outline-none focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Status filter tabs */}
          <div className="flex gap-2 flex-wrap pb-1">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() =>
                  setFilter((prev) => ({
                    ...prev,
                    orderStatus: s,
                  }))
                }
                className={`text-xs font-bold px-4 py-2 rounded-lg capitalize transition-all ${
                  filter.orderStatus === s
                    ? "bg-[#fc8019] text-white shadow-md shadow-orange-500/20"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {s}
                {s !== "all" && (
                  <span
                    className={`ml-1.5 ${filter.orderStatus === s ? "text-orange-100" : "text-gray-400"}`}
                  >
                    {orders?.statusCount?.[s] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                  Order ID
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Customer
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Items
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Location
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Total
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Payment
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs">
                  Date
                </th>
                <th className="px-4 py-4 font-semibold uppercase tracking-wider text-xs text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.items?.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-800 text-sm">
                      {order.user.firstName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.user.email}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-700 font-medium truncate max-w-40">
                      {order.items[0].name}
                    </p>
                    {order.items.length > 1 && (
                      <p className="text-xs text-[#fc8019] font-bold mt-1 bg-orange-50 px-2 py-0.5 rounded w-fit">
                        +{order.items.length - 1} more items
                      </p>
                    )}
                  </td>
                  {/* Address */}
                  <td className="px-4 py-4 text-xs text-gray-600 font-medium">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-4">
                    <span className="font-bold text-gray-800 text-sm">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <p className="text-[10px] font-bold tracking-wider text-gray-400 mt-1 uppercase">
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
                  <td className="px-4 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">
                    {dayjs(order.createdAt).format("MMM D, YYYY")}
                    <p className="text-gray-400 mt-0.5">
                      {dayjs(order.createdAt).format("h:mm A")}
                    </p>
                  </td>

                  {/* View */}
                  <td className="px-4 py-4 text-right">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="p-2 inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-400 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                      title="View Order Details"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {(!orders.items || orders.items.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <PackageOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No orders found
            </h3>
            <p className="text-sm text-gray-500">
              Wait for new orders to arrive
            </p>
          </div>
        )}
      </div>

      {orders.pagination?.totalPages > 1 && (
        <div className="mt-6 flex justify-center pb-6">
          <Pagination
            count={orders.pagination?.totalPages}
            page={filter.page}
            onChange={(e, value) =>
              setFilter((prev) => ({ ...prev, page: value }))
            }
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
  );
};

export default AdminOrders;
