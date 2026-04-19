import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../../context/user/AuthContext";
import { DeleteIcon, ViewIcon } from "../../assets/icon/Icons";
import { useAllUsers } from "../../context/admin/AllUsersContext";
import { Link } from "react-router-dom";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
];

const avatarColor = (id) => AVATAR_COLORS[parseInt(id) % AVATAR_COLORS.length];

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, color, sub }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
    <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold" style={{ color: color || "#1f2937" }}>
      {value}
    </p>
    {sub && <p className="text-[11px] text-gray-400 mt-1">{sub}</p>}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-50 text-green-700 border border-green-100",
    inactive: "bg-gray-100 text-gray-400 border border-gray-200",
    blocked: "bg-red-50 text-red-500 border border-red-100",
  };
  const labels = {
    active: "● Active",
    inactive: "● Inactive",
    blocked: "● Blocked",
  };
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles[status] || styles.inactive}`}
    >
      {labels[status] || status}
    </span>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("joinedAt");

  const { allUsers, setAllUsers, fetchAllUsers, loading } = useAllUsers();

  // ── Stats ──
  const totalCustomer = allUsers.totalCustomer;
  const totalActive = allUsers.totalActive;
  const totalBlocked = allUsers.totalBlocked;
  const totalOrders = allUsers.totalActive;

  // ── Actions ──
  const handleToggleStatus = (customer) => {
    const next =
      customer.status === "blocked"
        ? "active"
        : customer.status === "active"
          ? "blocked"
          : "active";

    setAllUsers.items((prev) =>
      prev.map((c) => (c._id === customer._id ? { ...c, status: next } : c)),
    );
  };

  const handleDelete = (id) => {
    if (!confirm("Permanently delete this customer?")) return;
    setAllUsers.items((prev) => prev.filter((c) => c._id !== id));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) return "loading...";

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Customers</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            View and manage your customer accounts
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total customers" value={totalCustomer} />
        <StatCard label="Active" value={totalActive} color="#3b6d11" />
        <StatCard label="Blocked" value={totalBlocked} color="#ef4444" />
        <StatCard label="Total orders" value={totalOrders} color="#fc8019" />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-700">All Customers</h2>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="joinedAt">Newest first</option>
            <option value="lastOrderAt">Recent order</option>
            <option value="totalSpent">Highest spent</option>
            <option value="totalOrders">Most orders</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
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
                  className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50"
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
                  className="text-center py-10 text-sm text-gray-400"
                >
                  No customers found
                </td>
              </tr>
            ) : (
              allUsers?.items?.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-orange-50/30 transition-colors"
                >
                  {/* Customer */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(c._id)}`}
                      >
                        {c.firstName?.slice(0, 1).toUpperCase()}
                        {c.lastName?.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 text-[13px] capitalize">
                          {`${c.firstName} ${c.lastName}`}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {c._id.padStart(6, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3.5">
                    <p className="text-[12px] text-gray-600">{c.email}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {c.phone}
                    </p>
                  </td>

                  {/* Orders */}
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-700">
                      {c.totalOrders}
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-700">
                      ${c.totalSpent.toLocaleString()}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      avg ${(c.totalSpent / c.totalOrders).toLocaleString()}
                    </p>
                  </td>

                  {/* Last Order */}
                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(c.lastOrderAt).format("DD MMM YYYY")}
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(c.joinedAt).format("DD MMM YYYY")}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <button onClick={() => handleToggleStatus(c)}>
                      <StatusBadge status={c.status} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`${c._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                      >
                        <ViewIcon />
                      </Link>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
