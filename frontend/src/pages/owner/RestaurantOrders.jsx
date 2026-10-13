import React from "react";
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
import { useOwnerOrders } from "../../context/owner/OwnerOrdersContext";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifyError } from "../../utils/toast";

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
    className={`text-xs font-bold px-2.5 py-1 rounded-md capitalize border ${config.bg} ${config.color} ${config.border}`}
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
      className={`appearance-none text-xs font-bold px-3 py-1.5 pr-8 rounded-md border outline-none cursor-pointer capitalize transition-colors
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
const RestaurantOrders = () => {
  const { orders, setOrders, filter, setFilter } = useOwnerOrders();
  const { serverURL } = useAuth();

  const handleStatusChange = async (orderId, newStatus) => {
    setOrders((prev) => ({
      ...prev,
      items: prev.items.map((o) =>
        o._id === orderId
          ? {
              ...o,
              orderStatus: newStatus,
              paymentStatus:
                o.paymentMethod === "cod" && newStatus === "delivered"
                  ? "paid"
                  : o.paymentMethod,
            }
          : o,
      ),
    }));

    try {
      await axios.patch(
        `${serverURL}/api/owner/order/${orderId}`,
        { status: newStatus },
        { withCredentials: true },
      );
    } catch (error) {
      notifyError(error.response.data.message || "Failed to update status");
      setOrders(orders);
      console.log(error);
    }
  };

  const stats = {
    total: orders?.totalOrders,
    pending: orders?.statusCount?.placed || 0,
    preparing: orders?.statusCount?.preparing || 0,
    delivered: orders?.statusCount?.delivered || 0,
    revenue: orders?.totalRevenue || 0,
  };

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
            color: "text-orange-500",
            bg: "bg-orange-100",
          },
          {
            label: "New Orders",
            value: stats.pending,
            icon: Sparkles,
            color: "text-indigo-600",
            bg: "bg-indigo-100",
          },
          {
            label: "Preparing",
            value: stats.preparing,
            icon: ChefHat,
            color: "text-yellow-600",
            bg: "bg-yellow-100",
          },
          {
            label: "Delivered",
            value: stats.delivered,
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Revenue",
            value: `$${stats.revenue.toFixed(2)}`,
            icon: Banknote,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white p-5 rounded-md border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg ${s.bg} ${s.color} flex items-center justify-center shrink-0`}
              >
                <s.icon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-1">
                  {s.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                  {s.value}
                </h3>
              </div>
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
                    ({orders?.statusCount?.[s] || 0})
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
              {(orders?.items || []).map((order) => (
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
                      to={`/owner/orders/${order._id}`}
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
        {(orders?.items || []).length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="flex justify-center mb-3 text-gray-300">
              <Package size={40} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium">No orders found</p>
          </div>
        )}

        {/* Dummy Pagination UI for design */}
        {(orders?.items || []).length > 0 && (
          <div className="mt-6 flex justify-center pb-6 border-t border-gray-100 pt-6">
            <Pagination
              count={orders?.pagination?.totalPages || 1}
              page={filter.page || 1}
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
    </div>
  );
};

export default RestaurantOrders;
