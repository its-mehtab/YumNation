import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import Pagination from "@mui/material/Pagination";
import {
  User,
  MapPin,
  Ticket,
  ShieldAlert,
  ShoppingBag,
  DollarSign,
  Ban,
  Trash2,
  ChevronLeft,
  Mail,
  Calendar,
  AlertCircle,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  Truck,
  Eye,
} from "lucide-react";
import { AdminCustomerDetailsSkeleton } from "../../components/skeleton/admin";
import { ConfirmationModal, ErrorState } from "../../components/common";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useAllUsers } from "../../context/admin/AllUsersContext";

// ─── Small reusable pieces ────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    active: {
      bg: "bg-[#fff2e8] text-green-700 border-green-200",
      label: "Active",
      icon: CheckCircle2,
    },
    inactive: {
      bg: "bg-gray-100 text-gray-600 border-gray-200",
      label: "Inactive",
      icon: Clock,
    },
    blocked: {
      bg: "bg-red-50 text-red-700 border-red-200",
      label: "Blocked",
      icon: Ban,
    },
    delivered: {
      bg: "bg-[#fff2e8] text-green-700 border-green-200",
      label: "Delivered",
      icon: CheckCircle2,
    },
    cancelled: {
      bg: "bg-red-50 text-red-700 border-red-200",
      label: "Cancelled",
      icon: XCircle,
    },
    "out for delivery": {
      bg: "bg-[#fff2e8] text-blue-700 border-blue-200",
      label: "Out for Delivery",
      icon: Truck,
    },
    pending: {
      bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
      label: "Pending",
      icon: Clock,
    },
  };

  // Need to import Truck if out_for_delivery is used, let's just use Clock for fallback
  const config = map[status] || {
    bg: "bg-gray-100 text-gray-600 border-gray-200",
    label: status,
    icon: AlertCircle,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-md border ${config.bg}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
};

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium w-36 shrink-0">
      {Icon && <Icon size={16} className="text-gray-400" />}
      <span>{label}</span>
    </div>
    <span className="text-sm text-gray-800 font-bold text-right truncate">
      {value}
    </span>
  </div>
);

const StatBox = ({ label, value, icon: Icon, bgClass }) => (
  <div className="bg-white p-5 rounded-md border border-gray-200">
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-lg ${bgClass || "bg-gray-100 text-gray-600"} flex items-center justify-center shrink-0`}
      >
        {Icon && <Icon size={24} strokeWidth={1.5} />}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50/50">
    {Icon && <Icon size={18} className="text-gray-400" />}
    <h3 className="text-sm font-bold text-gray-800 tracking-wide">{title}</h3>
  </div>
);

// ─── Order Row ────────────────────────────────────────────────────────────────

const OrderRow = ({ order }) => (
  <tr className="hover:bg-gray-50/80 transition-colors group">
    <td className="px-6 py-4">
      <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-md group-hover:bg-white group-hover:border-gray-300 transition-colors">
        #{order._id.slice(-8).toUpperCase()}
      </span>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm font-bold text-gray-800 truncate max-w-[150px]">
        {order.restaurantSnapshot.name}
      </p>
      <p className="text-xs font-medium text-gray-500 mt-0.5">
        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
      </p>
    </td>
    <td className="px-6 py-4 text-xs font-medium text-gray-500">
      {dayjs(order.createdAt).format("MMM D, YYYY")}
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={order.orderStatus} />
    </td>
    <td className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">
      {order.paymentMethod}
    </td>
    <td className="px-6 py-4 text-right">
      <span className="text-sm font-bold text-gray-800">
        ${order.totalAmount.toFixed(2)}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <Link
        to={`/admin/orders/${order._id}`}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors inline-flex items-center justify-center"
        title="View Details"
      >
        <Eye size={16} strokeWidth={1.5} />
      </Link>
    </td>
  </tr>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    orderSearch: "",
    orderStatus: "",
    page: 1,
    limit: 15,
  });

  const { id } = useParams();
  const { serverURL } = useAuth();
  const { allUsers, setAllUsers } = useAllUsers();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/user/${id}`, {
        params: {
          search: filter.orderSearch,
          orderStatus: filter.orderStatus,
          page: filter.page,
          limit: filter.limit,
        },
        withCredentials: true,
      });

      setCustomer(data);
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id, filter.page, filter.orderStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserData();
    }, 500);
    return () => clearTimeout(timer);
  }, [id, filter.orderSearch]);

  const [status, setStatus] = useState(customer?.status);

  useEffect(() => {
    if (customer) setStatus(customer.status);
  }, [customer]);

  if (loading && !customer) return <AdminCustomerDetailsSkeleton />;

  if (error) return <ErrorState error={error} onRetry={fetchUserData} />;

  const deliveredOrders = customer?.orders?.statusCount.delivered;
  const cancelledOrders = customer?.orders?.statusCount.cancelled;

  const handleToggleStatus = async () => {
    const next = status === "blocked" ? "active" : "blocked";
    setStatus(next);

    try {
      await axios.patch(
        `${serverURL}/api/admin/user/${id}`,
        { status: next },
        { withCredentials: true },
      );

      notifySuccess(`${customer.firstName} is ${next}`);

      setAllUsers((prev) => ({
        ...prev,
        totalActive:
          next === "active" ? prev.totalActive + 1 : prev.totalActive - 1,
        totalBlocked:
          next === "blocked" ? prev.totalBlocked + 1 : prev.totalBlocked - 1,
        items: prev.items.map((user) =>
          user._id === id ? { ...user, status: next } : user,
        ),
      }));
    } catch (error) {
      notifyError(error?.response?.data.message || error.message);
      setStatus(status);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setAllUsers((prev) => ({
      ...prev,
      totalCustomer: prev.totalCustomer - 1,
      totalActive:
        status === "active" ? prev.totalActive - 1 : prev.totalActive,
      totalBlocked:
        status === "blocked" ? prev.totalBlocked - 1 : prev.totalBlocked,
      items: prev.items.filter((c) => c._id !== id),
    }));

    try {
      // await axios.delete(`${serverURL}/api/admin/usser/${id}`, {
      //   withCredentials: true,
      // });

      notifySuccess(`Successfully deleted`);
      navigate("/admin/customers");
    } catch (error) {
      setAllUsers(allUsers);
      console.log("User delete:", error?.response?.data || error.message);
      notifyError(`Failed to delete customer`);
    }
  };
  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/customers")}
            className="p-2 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-[#fc8019] transition-all"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Customer Details
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <button
                onClick={() => navigate("/admin/customers")}
                className="hover:text-[#fc8019] transition-colors"
              >
                Customers
              </button>
              <ChevronRight
                size={14}
                className="text-gray-400"
                strokeWidth={1.5}
              />
              <span className="text-[#fc8019] font-medium capitalize">
                {customer?.firstName} {customer?.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Header Card ── */}
      <div className="bg-white rounded-md  border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-md bg-orange-100 flex items-center justify-center text-[#fc8019] text-3xl font-bold shadow-sm border border-orange-200">
            {customer?.firstName?.slice(0, 1).toUpperCase()}
            {customer?.lastName?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {customer?.firstName} {customer?.lastName}
              </h2>
              <StatusBadge status={status || "active"} />
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Mail size={16} className="text-gray-400" /> {customer?.email}
              </span>
              <span className="w-1 h-1 rounded-md bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-gray-400" /> Joined{" "}
                {dayjs(customer?.joinedAt || customer?.createdAt).format(
                  "MMM D, YYYY",
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleToggleStatus}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-md border transition-all ${
              status === "blocked"
                ? "bg-[#fff2e8] text-green-700 border-green-200 hover:bg-green-100"
                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            }`}
          >
            <Ban size={18} strokeWidth={1.5} />
            {status === "blocked" ? "Unblock Customer" : "Block Customer"}
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox
          label="Total Orders"
          value={customer?.totalOrders || 0}
          icon={ShoppingBag}
          bgClass="bg-blue-100 text-blue-600"
        />
        <StatBox
          label="Total Spent"
          value={`$${(customer?.totalSpent || 0).toLocaleString()}`}
          icon={DollarSign}
          bgClass="bg-green-100 text-green-600"
        />
        <StatBox
          label="Avg Order Value"
          value={`$${customer?.totalOrders ? (customer.totalSpent / customer.totalOrders).toFixed(2) : "0.00"}`}
          icon={CheckCircle2}
          bgClass="bg-amber-100 text-amber-600"
        />
        <StatBox
          label="Cancelled Orders"
          value={cancelledOrders}
          icon={XCircle}
          bgClass="bg-red-100 text-red-600"
        />
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left — Profile Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Info */}
          <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
            <SectionHeader title="Account Details" icon={User} />
            <div className="p-6">
              <InfoRow
                label="Customer ID"
                value={`#${customer?._id?.slice(-8).toUpperCase() || "UNKNOWN"}`}
                icon={Hash}
              />
              <InfoRow
                label="Email Address"
                value={customer?.email}
                icon={Mail}
              />
              <InfoRow
                label="Current Status"
                value={<StatusBadge status={status || "active"} />}
              />
              <InfoRow
                label="Member Since"
                value={dayjs(customer?.createdAt).format("MMM D, YYYY")}
                icon={Calendar}
              />
              {customer?.lastOrderAt && (
                <InfoRow
                  label="Last Order"
                  value={dayjs(customer?.lastOrderAt).format("MMM D, YYYY")}
                  icon={Clock}
                />
              )}
            </div>
          </div>

          {/* Delivery Addresses */}
          <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
            <SectionHeader title="Saved Addresses" icon={MapPin} />
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {!customer?.addresses || customer.addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <MapPin
                      size={32}
                      className="text-gray-300 mb-2"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-bold text-gray-700">
                      No addresses
                    </p>
                    <p className="text-xs text-gray-500">
                      User hasn't saved any addresses.
                    </p>
                  </div>
                ) : (
                  customer?.addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`p-4 rounded-md border ${
                        addr.isDefault
                          ? "bg-[#fff2e8] border-orange-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-bold text-xs uppercase tracking-wider ${addr.isDefault ? "text-[#fc8019]" : "text-gray-500"}`}
                        >
                          {addr.addressType || "Address"}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-md border border-orange-200 text-[#fc8019]">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 && `, ${addr.addressLine2}`}
                        <br />
                        {addr.city}, {addr.state} {addr.pinCode}
                        {addr.country && (
                          <>
                            <br />
                            {addr.country}
                          </>
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Coupons Used */}
          <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
            <SectionHeader title="Coupons Used" icon={Ticket} />
            <div className="p-6">
              {!customer?.couponsUsed || customer.couponsUsed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Ticket
                    size={32}
                    className="text-gray-300 mb-2"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-bold text-gray-700">No coupons</p>
                  <p className="text-xs text-gray-500">
                    User hasn't used any coupons.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {customer.couponsUsed.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-xs font-bold text-orange-700 bg-[#fff2e8] border border-orange-200 px-3 py-1.5 rounded-md flex items-center gap-1.5"
                    >
                      <Ticket size={12} strokeWidth={1.5} /> {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Danger Zone ── */}
          <div className="bg-white rounded-md  border border-red-200 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-red-100 bg-red-50">
              <ShieldAlert size={18} className="text-red-500" />
              <h3 className="text-sm font-bold text-red-700 tracking-wide">
                Danger Zone
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Delete Customer Account
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed max-w-xs">
                    Permanently removes the customer and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <ConfirmationModal
                  button={
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors shrink-0 shadow-sm">
                      <Trash2 size={16} strokeWidth={1.5} /> Delete
                    </button>
                  }
                  heading={`Delete ${customer.firstName} from customers?`}
                  description="Are you sure you want to delete this customer? This action cannot be undone and the customer will be removed from the list."
                  onClick={async () => await handleDelete(customer._id)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Order History */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#fff2e8] text-[#fc8019] rounded-md">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Order History
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {customer?.orders?.totalOrders || 0} total orders ·{" "}
                    {deliveredOrders} delivered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  placeholder="Search orders..."
                  value={filter.orderSearch}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      orderSearch: e.target.value,
                    }))
                  }
                  className="w-full sm:w-48 border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all font-medium"
                />
                <select
                  value={filter.orderStatus}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      orderStatus: e.target.value,
                    }))
                  }
                  className="w-full sm:w-auto border border-gray-200 rounded-md px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out for delivery">Out For Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-500">
                  <tr className="border-b border-gray-200">
                    {[
                      "Order ID",
                      "Restaurant",
                      "Date",
                      "Status",
                      "Method",
                      "Total",
                      "action",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-6 py-4 font-semibold uppercase tracking-wider text-xs ${h === "Total" ? "text-right" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {!customer?.orders?.items ||
                  customer.orders.items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center">
                          <ShoppingBag
                            size={40}
                            className="text-gray-300 mb-3"
                            strokeWidth={1.5}
                          />
                          <p className="text-base font-bold text-gray-800">
                            No orders found
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Try adjusting the filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    customer.orders.items.map((order) => (
                      <OrderRow key={order._id} order={order} />
                    ))
                  )}
                </tbody>

                {/* Footer summary */}
                {customer?.orders?.items?.length > 0 && (
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-gray-50/50">
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-sm font-bold text-gray-500"
                      >
                        Showing {customer.orders.items.length} order
                        {customer.orders.items.length !== 1 ? "s" : ""} on this
                        page
                      </td>
                      <td className="px-6 py-4 text-right text-base font-bold text-gray-800">
                        $
                        {customer.orders.items
                          .reduce((s, o) => s + o.totalAmount, 0)
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {customer?.orders?.pagination?.totalPages > 1 && (
              <div className="p-6 flex justify-center border-t border-gray-200 bg-white">
                <Pagination
                  count={customer.orders.pagination.totalPages}
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
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetails;
