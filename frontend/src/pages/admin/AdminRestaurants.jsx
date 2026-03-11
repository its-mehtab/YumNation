import React, { useState } from "react";
import { Link } from "react-router-dom";

// ── Mock data ────────────────────────────────────────────────────────────────
const mockRestaurants = [
  {
    _id: "1",
    name: "Pizza Palace",
    owner: "Marco Rossi",
    email: "marco@pizzapalace.com",
    phone: "+91 9876543210",
    city: "Kolkata",
    category: "Pizza",
    totalDishes: 24,
    totalOrders: 342,
    revenue: 18450,
    rating: 4.5,
    isActive: true,
    joinedAt: "2024-01-10",
  },
  {
    _id: "2",
    name: "Burger Barn",
    owner: "Sarah Khan",
    email: "sarah@burgerbarn.com",
    phone: "+91 9123456780",
    city: "Mumbai",
    category: "Burger",
    totalDishes: 18,
    totalOrders: 210,
    revenue: 9800,
    rating: 4.2,
    isActive: true,
    joinedAt: "2024-02-15",
  },
  {
    _id: "3",
    name: "Noodle House",
    owner: "Lin Wei",
    email: "lin@noodlehouse.com",
    phone: "+91 9988776655",
    city: "Delhi",
    category: "Noodles",
    totalDishes: 12,
    totalOrders: 98,
    revenue: 4300,
    rating: 3.9,
    isActive: false,
    joinedAt: "2024-03-01",
  },
  {
    _id: "4",
    name: "Sweet Tooth",
    owner: "Priya Sharma",
    email: "priya@sweettooth.com",
    phone: "+91 9871234560",
    city: "Bangalore",
    category: "Dessert",
    totalDishes: 30,
    totalOrders: 560,
    revenue: 31200,
    rating: 4.8,
    isActive: true,
    joinedAt: "2024-03-22",
  },
  {
    _id: "5",
    name: "Spice Garden",
    owner: "Arjun Nair",
    email: "arjun@spicegarden.com",
    phone: "+91 9765432100",
    city: "Chennai",
    category: "Indian",
    totalDishes: 40,
    totalOrders: 720,
    revenue: 42000,
    rating: 4.6,
    isActive: true,
    joinedAt: "2024-04-05",
  },
];

// ── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    <span className="text-yellow-400 text-xs">★</span>
    <span className="text-xs font-semibold text-gray-700">
      {rating.toFixed(1)}
    </span>
  </div>
);

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ isActive }) => (
  <span
    className={`text-xs font-semibold px-3 py-1 rounded-full ${isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}
  >
    {isActive ? "Active" : "Inactive"}
  </span>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | inactive

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.owner.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "active" && r.isActive) ||
      (filter === "inactive" && !r.isActive);
    return matchSearch && matchFilter;
  });

  const handleToggleStatus = (id) => {
    setRestaurants((prev) =>
      prev.map((r) => (r._id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remove this restaurant?")) return;
    setRestaurants((prev) => prev.filter((r) => r._id !== id));
  };

  const totalRevenue = restaurants.reduce((acc, r) => acc + r.revenue, 0);
  const totalOrders = restaurants.reduce((acc, r) => acc + r.totalOrders, 0);

  return (
    <div>
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
            label: "Active",
            value: restaurants.filter((r) => r.isActive).length,
            emoji: "✅",
          },
          {
            label: "Total Orders",
            value: totalOrders.toLocaleString(),
            emoji: "📦",
          },
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            emoji: "💰",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-gray-700">{s.value}</p>
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
          <div className="flex items-center gap-3">
            {/* Filter tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1 text-xs font-semibold">
              {["all", "active", "inactive"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md capitalize transition-all ${filter === f ? "bg-white text-[#fc8019] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, owner, city..."
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-56"
            />
            {/* Add button */}
            <Link
              to="/admin/restaurant/add"
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Add Restaurant
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dishes
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  {/* Restaurant name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg">
                        🏪
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">{r.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {r.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Owner */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-700">{r.owner}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.email}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{r.city}</td>
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    {r.totalDishes}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    {r.totalOrders.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#fc8019]">
                    ${r.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <StarRating rating={r.rating} />
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleToggleStatus(r._id)}>
                      <StatusBadge isActive={r.isActive} />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      {/* View */}
                      <Link
                        to={`/admin/restaurants/${r._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
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
                      {/* Edit */}
                      <Link
                        to={`/admin/restaurants/edit/${r._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        title="Edit"
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
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
