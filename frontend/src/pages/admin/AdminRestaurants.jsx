import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurants } from "../../context/admin/RestaurantsContext";
import { DeleteIcon } from "../../assets/icon/Icons";
import AdminRestaurantsItem from "../../components/admin/AdminRestaurantItem";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import RejectModal from "../../components/admin/RejectModal";

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminRestaurants = () => {
  const { restaurants, setRestaurants } = useRestaurants();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [rejectTarget, setRejectTarget] = useState(null);

  console.log(restaurants);

  const { serverURL } = useAuth();

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "active", label: "Active" },
    { key: "rejected", label: "Rejected" },
    { key: "suspended", label: "Suspended" },
  ];

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.owner.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id, status, extra = {}) =>
    setRestaurants((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status, ...extra } : r)),
    );

  const pendingCount = restaurants.filter((r) => r.status === "pending").length;
  const totalRevenue = restaurants
    .filter((r) => r.status === "active")
    .reduce((a, r) => a + r.revenue, 0);

  return (
    <div>
      {rejectTarget && (
        <RejectModal
          updateStatus={updateStatus}
          restaurant={rejectTarget}
          setRejectTarget={setRejectTarget}
        />
      )}

      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Restaurants</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Admin</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Restaurants</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          {
            label: "Total Restaurants",
            value: restaurants.length,
            emoji: "🏪",
          },
          {
            label: "Pending Review",
            value: pendingCount,
            emoji: "⏳",
            highlight: pendingCount > 0,
          },
          {
            label: "Total Orders",
            value: restaurants
              .reduce((a, r) => a + r.totalOrders, 0)
              .toLocaleString(),
            emoji: "📦",
          },
          {
            label: "Active Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            emoji: "💰",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] border-l-4 px-5 py-4 flex items-center justify-between ${s.highlight ? "border-l-yellow-400" : "border-l-[#fc8019]"}`}
          >
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">
                {s.label}
              </p>
              <p
                className={`text-2xl font-bold ${s.highlight ? "text-yellow-500" : "text-gray-700"}`}
              >
                {s.value}
              </p>
            </div>
            <span className="text-3xl">{s.emoji}</span>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-700">
              All Restaurants
            </h2>
            <span className="text-xs bg-orange-50 text-[#fc8019] font-semibold px-2 py-0.5 rounded-full">
              {filtered.length}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1 text-xs font-semibold">
              {tabs.map((t) => {
                const count =
                  t.key !== "all"
                    ? restaurants.filter((r) => r.status === t.key).length
                    : null;
                return (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5
                      ${filter === t.key ? "bg-white text-[#fc8019] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {t.label}
                    {count > 0 && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-bold leading-none
                        ${t.key === "pending" ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-500"}`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, owner, city..."
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-56"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Restaurant",
                  "Owner",
                  "City",
                  "Dishes",
                  "Orders",
                  "Revenue",
                  "Rating",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider first:px-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => (
                <AdminRestaurantsItem
                  key={r._id}
                  r={r}
                  setRejectTarget={setRejectTarget}
                  updateStatus={updateStatus}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🏪</div>
            <p className="text-sm font-medium">No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRestaurants;
