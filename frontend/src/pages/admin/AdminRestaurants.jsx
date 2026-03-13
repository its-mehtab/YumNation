import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurants } from "../../context/admin/RestaurantsContext";
import { DeleteIcon } from "../../assets/icon/Icons";

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockRestaurants = [
  {
    _id: "1",
    name: "Pizza Palace",
    owner: "Marco Rossi",
    email: "marco@pizzapalace.com",
    phone: "+91 9876543210",
    city: "Kolkata",
    totalDishes: 24,
    totalOrders: 342,
    revenue: 18450,
    rating: 4.5,
    status: "active",
    joinedAt: "2024-01-10",
  },
  {
    _id: "2",
    name: "Burger Barn",
    owner: "Sarah Khan",
    email: "sarah@burgerbarn.com",
    phone: "+91 9123456780",
    city: "Mumbai",
    totalDishes: 18,
    totalOrders: 210,
    revenue: 9800,
    rating: 4.2,
    status: "active",
    joinedAt: "2024-02-15",
  },
  {
    _id: "3",
    name: "Noodle House",
    owner: "Lin Wei",
    email: "lin@noodlehouse.com",
    phone: "+91 9988776655",
    city: "Delhi",
    totalDishes: 0,
    totalOrders: 0,
    revenue: 0,
    rating: 0,
    status: "pending",
    joinedAt: "2024-03-01",
  },
  {
    _id: "4",
    name: "Sweet Tooth",
    owner: "Priya Sharma",
    email: "priya@sweettooth.com",
    phone: "+91 9871234560",
    city: "Bangalore",
    totalDishes: 30,
    totalOrders: 560,
    revenue: 31200,
    rating: 4.8,
    status: "active",
    joinedAt: "2024-03-22",
  },
  {
    _id: "5",
    name: "Spice Garden",
    owner: "Arjun Nair",
    email: "arjun@spicegarden.com",
    phone: "+91 9765432100",
    city: "Chennai",
    totalDishes: 0,
    totalOrders: 0,
    revenue: 0,
    rating: 0,
    status: "pending",
    joinedAt: "2024-04-05",
  },
  {
    _id: "6",
    name: "Taco Town",
    owner: "Raj Mehta",
    email: "raj@tacotown.com",
    phone: "+91 9000012345",
    city: "Hyderabad",
    totalDishes: 5,
    totalOrders: 12,
    revenue: 600,
    rating: 3.2,
    status: "rejected",
    joinedAt: "2024-04-10",
  },
  {
    _id: "7",
    name: "Sushi Stop",
    owner: "Kenji Tanaka",
    email: "kenji@sushistop.com",
    phone: "+91 9111122233",
    city: "Pune",
    totalDishes: 20,
    totalOrders: 130,
    revenue: 9100,
    rating: 4.1,
    status: "suspended",
    joinedAt: "2024-02-20",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusConfig = {
  active: { label: "Active", bg: "bg-green-50", text: "text-green-600" },
  pending: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-600" },
  rejected: { label: "Rejected", bg: "bg-red-50", text: "text-red-400" },
  suspended: { label: "Suspended", bg: "bg-gray-100", text: "text-gray-500" },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
};

const StarRating = ({ rating }) =>
  rating > 0 ? (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-xs">★</span>
      <span className="text-xs font-semibold text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  ) : (
    <span className="text-xs text-gray-300">—</span>
  );

// ── Reject modal ──────────────────────────────────────────────────────────────
const RejectModal = ({ restaurant, onConfirm, onCancel }) => {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        style={{ animation: "fadeUp 0.2s ease both" }}
      >
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
        <h3 className="text-base font-bold text-gray-700 mb-1">
          Reject Application
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Rejecting <strong className="text-gray-600">{restaurant.name}</strong>
          . Give a reason so the owner can reapply correctly.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Address could not be verified. Please provide a complete and accurate address."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-red-300 transition-colors resize-none mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim()}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-40"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminRestaurants = () => {
  const { restaurants, setRestaurants } = useRestaurants();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [rejectTarget, setRejectTarget] = useState(null);

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "active", label: "Active" },
    { key: "rejected", label: "Rejected" },
    { key: "suspended", label: "Suspended" },
  ];
  console.log(restaurants);

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

  const handleApprove = (id) => updateStatus(id, "active");
  const handleSuspend = (id) => {
    if (window.confirm("Suspend this restaurant?"))
      updateStatus(id, "suspended");
  };
  const handleDelete = (id) => {
    if (window.confirm("Permanently delete this restaurant?"))
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
  };
  const handleReject = (reason) => {
    updateStatus(rejectTarget._id, "rejected", { rejectionReason: reason });
    setRejectTarget(null);
  };

  const pendingCount = restaurants.filter((r) => r.status === "pending").length;
  const totalRevenue = restaurants
    .filter((r) => r.status === "active")
    .reduce((a, r) => a + r.revenue, 0);

  return (
    <div>
      {rejectTarget && (
        <RejectModal
          restaurant={rejectTarget}
          onConfirm={handleReject}
          onCancel={() => setRejectTarget(null)}
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
                <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg">
                        🏪
                      </div>
                      <p className="font-semibold text-gray-700">{r.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-700 text-xs">
                      {r.owner.firstName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.email}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-500 text-xs">
                    📍 {r.address.city}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    {r.totalDishes || "—"}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    {r.totalOrders > 0 ? r.totalOrders.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#fc8019]">
                    {r.revenue > 0 ? `$${r.revenue.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <StarRating rating={r.rating} />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {/* Pending actions */}
                      {r.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(r._id)}
                            className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => setRejectTarget(r)}
                            className="px-2.5 py-1 rounded-lg bg-red-50 text-red-400 text-xs font-semibold hover:bg-red-100 transition-colors"
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      {/* Active actions */}
                      {r.status === "active" && (
                        <button
                          onClick={() => handleSuspend(r._id)}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Suspend
                        </button>
                      )}
                      {/* Reinstate */}
                      {(r.status === "suspended" ||
                        r.status === "rejected") && (
                        <button
                          onClick={() => handleApprove(r._id)}
                          className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
                        >
                          Reinstate
                        </button>
                      )}
                      {/* View */}
                      <Link
                        to={`/admin/restaurants/${r._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <svg
                          width="14"
                          height="14"
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
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
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
