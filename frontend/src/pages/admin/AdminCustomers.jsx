import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { useAuth } from "../../context/user/AuthContext";
import { useAllUsers } from "../../context/admin/AllUsersContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Pagination from "@mui/material/Pagination";
import { Spinner } from "@radix-ui/themes";
import {
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  Search,
  Eye,
  Trash2,
} from "lucide-react";
import { AdminCustomersSkeleton } from "../../components/skeleton/admin";
import { ErrorState } from "../../components/common";

// ───pers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-[#fff2e8] text-[#fc8019] border-orange-100",
  "bg-[#fff2e8] text-[#fc8019] border-blue-100",
  "bg-[#fff2e8] text-[#fc8019] border-green-100",
  "bg-[#fff2e8] text-[#fc8019] border-purple-100",
  "bg-pink-50 text-pink-600 border-pink-100",
  "bg-teal-50 text-teal-600 border-teal-100",
];

const avatarColor = (id) => AVATAR_COLORS[parseInt(id) % AVATAR_COLORS.length];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-[#fff2e8] text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
    blocked: "bg-red-50 text-red-700 border-red-200",
  };
  const labels = {
    active: "Active",
    inactive: "Inactive",
    blocked: "Blocked",
  };
  return (
    <span
      className={`inline-block text-[11px] font-bold px-3 py-1 rounded-md border ${styles[status] || styles.inactive} transition-colors`}
    >
      {labels[status] || status}
    </span>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCustomers = () => {
  const {
    allUsers,
    setAllUsers,
    fetchAllUsers,
    loading,
    error,
    filter,
    setFilter,
  } = useAllUsers();
  const { serverURL } = useAuth();

  if (loading && !allUsers) return <AdminCustomersSkeleton />;

  if (!allUsers || error)
    return <ErrorState error={error.restaurantError} onRetry={fetchAllUsers} />;

  const totalCustomer = allUsers.totalCustomer;
  const totalActive = allUsers.totalActive;
  const totalBlocked = allUsers.totalBlocked;
  const totalOrders = allUsers.totalOrders;

  const handleToggleStatus = async (customer) => {
    const next = customer.status === "blocked" ? "active" : "blocked";

    setAllUsers((prev) => ({
      ...prev,
      totalActive:
        next === "active" ? prev.totalActive + 1 : prev.totalActive - 1,
      totalBlocked:
        next === "blocked" ? prev.totalBlocked + 1 : prev.totalBlocked - 1,
      items: prev.items.map((c) =>
        c._id === customer._id ? { ...c, status: next } : c,
      ),
    }));

    try {
      await axios.patch(
        `${serverURL}/api/admin/user/${customer._id}`,
        { status: next },
        {
          withCredentials: true,
        },
      );

      notifySuccess(`${customer.firstName} ${next}`);
    } catch (error) {
      setAllUsers(allUsers);
      console.log(
        "User Status Update:",
        error?.response?.data || error.message,
      );
      notifyError(
        `Failed to ${next === "active" ? "activate" : "block"} ${customer.firstName}`,
      );
    }
  };

  const handleDelete = async (id, status) => {
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
      // await axios.delete(`${serverURL}/api/admin/user/${id}`, {
      //   withCredentials: true,
      // });

      notifySuccess(`Successfully deleted`);
    } catch (error) {
      setAllUsers(allUsers);
      console.log("User delete:", error?.response?.data || error.message);
      notifyError(`Failed to delete customer`);
    }
  };

  const handlePageChange = (event, value) => {
    setFilter((prev) => ({ ...prev, page: value }));
  };

  return (
    <div className="relative space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Customers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your customer accounts
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Customers",
            value: totalCustomer,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            label: "Active",
            value: totalActive,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Blocked",
            value: totalBlocked,
            icon: UserX,
            color: "text-red-600",
            bg: "bg-red-100",
          },
          {
            label: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
            color: "text-orange-500",
            bg: "bg-orange-100",
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
                <h3 className="text-2xl font-bold text-gray-800">
                  {s.value || 0}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-5 border-b border-gray-200 gap-4">
          <h2 className="text-lg font-bold text-gray-800">All Customers</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                strokeWidth={1.5}
              />
              <input
                placeholder="Search name, email..."
                value={filter.search}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all outline-none"
              />
            </div>
            <select
              value={filter.filterStatus}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  filterStatus: e.target.value,
                }))
              }
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
            >
              <option value="latest_asc">Newest First</option>
              <option value="recent_order">Recent Order</option>
              <option value="highest_spent">Highest Spent</option>
              <option value="most_orders">Most Orders</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr className="border-b border-gray-200">
                {[
                  "Customer",
                  "Contact",
                  "Orders",
                  "Total Spent",
                  "Last Order",
                  "Joined",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-4 font-semibold uppercase tracking-wider text-xs first:pl-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allUsers?.items?.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-20 text-sm text-gray-500 font-medium"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
                        <Users
                          size={32}
                          className="text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        No customers found
                      </h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your filters or search
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                allUsers?.items?.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md border flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor(c._id)}`}
                        >
                          {c.firstName?.slice(0, 1).toUpperCase()}
                          {c.lastName?.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm capitalize">
                            {`${c.firstName} ${c.lastName}`}
                          </p>
                          <p className="text-xs font-mono text-gray-400 mt-0.5">
                            #{c._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <p className="text-xs font-medium text-gray-600">
                        {c.email}
                      </p>
                      <p className="text-xs font-medium text-gray-500 mt-1">
                        {c.phone}
                      </p>
                    </td>

                    {/* Orders */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                        {c.totalOrders}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-gray-800 text-sm">
                        ${c.totalSpent?.toLocaleString()}
                      </span>
                      <p className="text-xs font-medium text-gray-400 mt-1">
                        avg $
                        {(
                          c.totalSpent / Math.max(1, c.totalOrders)
                        ).toLocaleString()}
                      </p>
                    </td>

                    {/* Last Order */}
                    <td className="px-4 py-4 text-xs font-medium text-gray-500">
                      {c.lastOrderAt
                        ? dayjs(c.lastOrderAt).format("DD MMM YYYY")
                        : "Never"}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-xs font-medium text-gray-500">
                      {dayjs(c.createdAt).format("DD MMM YYYY")}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className="active:scale-95 transition-transform"
                      >
                        <StatusBadge status={c.status} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Link
                          to={`${c._id}`}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors inline-flex items-center justify-center"
                          title="View Details"
                        >
                          <Eye size={16} strokeWidth={1.5} />
                        </Link>
                        <ConfirmationModal
                          button={
                            <button
                              className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors inline-flex items-center justify-center"
                              title="Delete Customer"
                            >
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          }
                          heading={`Delete ${c.firstName} from customers?`}
                          description="Are you sure you want to delete this customer? This action cannot be undone and the customer will be removed from the list."
                          onClick={async () =>
                            await handleDelete(c._id, c.status)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {allUsers?.pagination?.totalPages > 1 && (
        <div className="mt-6 flex justify-center pb-6">
          <Pagination
            count={allUsers?.pagination?.totalPages || 1}
            page={filter.page}
            onChange={handlePageChange}
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

export default AdminCustomers;
