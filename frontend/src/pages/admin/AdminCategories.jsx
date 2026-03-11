import React, { useState } from "react";
import { Link } from "react-router-dom";

// ── Mock data ────────────────────────────────────────────────────────────────
const mockCategories = [
  {
    _id: "1",
    name: "Pizza",
    slug: "pizza",
    dishCount: 12,
    isActive: true,
    createdAt: "2024-01-10",
  },
  {
    _id: "2",
    name: "Burger",
    slug: "burger",
    dishCount: 8,
    isActive: true,
    createdAt: "2024-01-12",
  },
  {
    _id: "3",
    name: "Noodles",
    slug: "noodles",
    dishCount: 5,
    isActive: false,
    createdAt: "2024-02-01",
  },
  {
    _id: "4",
    name: "Dessert",
    slug: "dessert",
    dishCount: 15,
    isActive: true,
    createdAt: "2024-02-14",
  },
  {
    _id: "5",
    name: "Drinks",
    slug: "drinks",
    dishCount: 10,
    isActive: true,
    createdAt: "2024-03-05",
  },
];

// ── Add/Edit Modal ───────────────────────────────────────────────────────────
const CategoryModal = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category?.name || "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, isActive });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-5">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pizza"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-500">
              Status
            </label>
            <button
              type="button"
              onClick={() => setIsActive((p) => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isActive ? "bg-[#fc8019]" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isActive ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors"
            >
              {category ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const AdminCategories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | { ...category }

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = ({ name, isActive }) => {
    if (modal === "add") {
      setCategories((prev) => [
        ...prev,
        {
          _id: Date.now().toString(),
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          dishCount: 0,
          isActive,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    } else {
      setCategories((prev) =>
        prev.map((c) => (c._id === modal._id ? { ...c, name, isActive } : c)),
      );
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  const handleToggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Categories</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Admin</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Categories</span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total Categories", value: categories.length, emoji: "📂" },
          {
            label: "Active",
            value: categories.filter((c) => c.isActive).length,
            emoji: "✅",
          },
          {
            label: "Inactive",
            value: categories.filter((c) => !c.isActive).length,
            emoji: "🚫",
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-700">All Categories</h2>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-48"
            />
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Add Category
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dishes
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Created
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
              {filtered.map((cat, i) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-base">
                        🍽️
                      </div>
                      <span className="font-semibold text-gray-700">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/admin/dishes?category=${cat.slug}`}
                      className="text-[#fc8019] font-semibold hover:underline"
                    >
                      {cat.dishCount} dishes
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-xs">
                    {cat.createdAt}
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleToggleStatus(cat._id)}>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}
                      >
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <button
                        onClick={() => setModal(cat)}
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
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(cat._id)}
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
            <div className="text-4xl mb-3">📂</div>
            <p className="text-sm font-medium">No categories found</p>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <CategoryModal
          category={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminCategories;
