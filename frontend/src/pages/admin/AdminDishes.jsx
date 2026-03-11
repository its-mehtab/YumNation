import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "../../assets/icon/Icons";

// ── Mock data ────────────────────────────────────────────────────────────────
const mockDishes = [
  {
    _id: "1",
    name: "Italian Pizza",
    category: "Pizza",
    price: 79,
    stock: 16,
    createdBy: "Admin",
    isAvailable: true,
    image: null,
  },
  {
    _id: "2",
    name: "Veg Burger",
    category: "Burger",
    price: 488,
    stock: 20,
    createdBy: "Restaurant",
    isAvailable: true,
    image: null,
  },
  {
    _id: "3",
    name: "Spaghetti",
    category: "Noodles",
    price: 23,
    stock: 10,
    createdBy: "Admin",
    isAvailable: true,
    image: null,
  },
  {
    _id: "4",
    name: "Red Velvet Cake",
    category: "Dessert",
    price: 350,
    stock: 230,
    createdBy: "Admin",
    isAvailable: false,
    image: null,
  },
];

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ isAvailable }) => (
  <span
    className={`text-xs font-semibold px-3 py-1 rounded-full ${isAvailable ? "bg-green-50 text-green-600" : "bg-pink-50 text-pink-500"}`}
  >
    {isAvailable ? "Published" : "Draft"}
  </span>
);

// ── Main Component ───────────────────────────────────────────────────────────
const AdminDishes = () => {
  const [sort, setSort] = useState("asc");
  const [dishes, setDishes] = useState(mockDishes);

  const sorted = [...dishes].sort((a, b) =>
    sort === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this dish?")) return;
    setDishes((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Dishes List</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dishes</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Dishes List</span>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
        {/* ── Card header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-700">Dishes List</h2>
          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 font-medium bg-white focus:outline-none cursor-pointer"
              >
                <option value="asc">Sort : Ascending</option>
                <option value="desc">Sort : Descending</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>

            {/* Add dish button */}
            <Link
              to="/admin/dishes/add"
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Add Dish
            </Link>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dish Name
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created By
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
              {sorted.map((dish) => (
                <tr
                  key={dish._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Name + image */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 min-w-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                        {dish.image ? (
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg">🍽️</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-700">
                        {dish.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{dish.category}</td>
                  <td className="px-4 py-4 text-gray-700 font-medium">
                    ${dish.price}
                  </td>
                  <td className="px-4 py-4 text-gray-500">{dish.stock}</td>
                  <td className="px-4 py-4 text-gray-500">{dish.createdBy}</td>
                  <td className="px-4 py-4">
                    <StatusBadge isAvailable={dish.isAvailable} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <Link
                        to={`/admin/dishes/edit/${dish._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        title="Edit"
                      >
                        <svg
                          width="16"
                          height="16"
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
                      {/* View */}
                      <Link
                        to={`/product/${dish._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View"
                      >
                        <svg
                          width="16"
                          height="16"
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
                        onClick={() => handleDelete(dish._id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <svg
                          width="16"
                          height="16"
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

        {/* ── Empty state ── */}
        {sorted.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-sm font-medium">No dishes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDishes;
