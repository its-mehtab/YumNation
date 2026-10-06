import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurants } from "../../context/admin/RestaurantsContext";
import AdminRestaurantsItem from "../../components/admin/AdminRestaurantItem";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import RejectModal from "../../components/admin/RejectModal";
import { Store, Clock, Package, DollarSign, Search } from "lucide-react";

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminRestaurants = () => {
  const { restaurants, setRestaurants } = useRestaurants();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [rejectTarget, setRejectTarget] = useState(null);

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
    <div className="space-y-6">
      {rejectTarget && (
        <RejectModal
          updateStatus={updateStatus}
          restaurant={rejectTarget}
          setRejectTarget={setRejectTarget}
        />
      )}

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Restaurants
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review restaurant applications
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Restaurants",
            value: restaurants.length,
            icon: Store,
            color: "text-[#fc8019]",
            bg: "bg-blue-50",
          },
          {
            label: "Pending Review",
            value: pendingCount,
            icon: Clock,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            highlight: pendingCount > 0,
          },
          {
            label: "Total Orders",
            value: restaurants
              .reduce((a, r) => a + r.totalOrders, 0)
              .toLocaleString(),
            icon: Package,
            color: "text-[#fc8019]",
            bg: "bg-purple-50",
          },
          {
            label: "Active Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-[#fc8019]",
            bg: "bg-green-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-white rounded-md  border border-gray-200 p-6 flex items-center justify-between transition-all ${
              s.highlight ? "ring-2 ring-yellow-400 ring-offset-2" : ""
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                {s.label}
              </p>
              <p
                className={`text-3xl font-bold ${s.highlight ? "text-yellow-600" : "text-gray-800"}`}
              >
                {s.value}
              </p>
            </div>
            <div className={`p-4 rounded-md ${s.bg} ${s.color}`}>
              <s.icon size={28} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
        {/* Card header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-5 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">All Restaurants</h2>
            <span className="text-xs bg-[#fff2e8] text-[#fc8019] font-bold px-2.5 py-1 rounded-md">
              {filtered.length}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Tabs */}
            <div className="flex bg-gray-50 rounded-md p-1 w-full sm:w-auto overflow-x-auto border border-gray-200">
              {tabs.map((t) => {
                const count =
                  t.key !== "all"
                    ? restaurants.filter((r) => r.status === t.key).length
                    : null;
                return (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className={`px-4 py-2 rounded-md transition-all flex items-center justify-center min-w-[100px] gap-2 text-sm font-semibold whitespace-nowrap
                      ${filter === t.key ? "bg-white text-[#fc8019] shadow-sm ring-1 ring-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                  >
                    {t.label}
                    {count > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold leading-none
                        ${t.key === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-600"}`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
               strokeWidth={1.5} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
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
                    className="px-4 py-4 font-semibold uppercase tracking-wider text-xs first:pl-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
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
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
              <Store size={32} className="text-gray-400"  strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No restaurants found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRestaurants;
