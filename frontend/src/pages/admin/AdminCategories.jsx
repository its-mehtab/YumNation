import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { notifyError } from "../../utils/toast";
import { useCategories } from "../../context/admin/CategoryAdminContext";

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
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(category?.icon || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notifyError("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      notifyError("Image must be under 2MB");
      return;
    }
    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    setIconPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, isActive, iconFile, iconPreview });
    // In your real handler, build a FormData:
    // const fd = new FormData();
    // fd.append("name", name);
    // fd.append("isActive", isActive);
    // if (iconFile) fd.append("icon", iconFile);
    // await axios.post("/api/categories", fd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 overflow-hidden">
        {/* ── Header ── */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {category ? "Edit" : "New"} Category
            </p>
            <p className="text-sm font-bold text-gray-700 mt-0.5">
              {category ? `Editing — ${category.name}` : "Add a new category"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-5 py-5 space-y-4">
            {/* ── Icon Upload ── */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                Category Icon
              </label>

              {iconPreview ? (
                // Preview state
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="w-14 h-14 rounded-xl border border-gray-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={iconPreview}
                      alt="icon preview"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">
                      {iconFile?.name || "Current icon"}
                    </p>
                    {iconFile && (
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {(iconFile.size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-semibold text-[#fc8019] hover:underline"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveIcon}
                      className="text-[11px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                // Drop zone
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed transition-colors ${
                    isDragging
                      ? "border-[#fc8019] bg-orange-50"
                      : "border-gray-200 bg-gray-50 hover:border-[#fc8019] hover:bg-orange-50/40"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-300 text-xl shadow-sm">
                    🖼
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-500">
                      Drop icon here or{" "}
                      <span className="text-[#fc8019]">browse</span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      PNG, JPG, SVG · max 2MB
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>

            {/* ── Category Name ── */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                Category Name *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pizza"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                autoFocus
              />
            </div>

            {/* ── Status Toggle ── */}
            <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-600">Status</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {isActive ? "Visible to customers" : "Hidden from customers"}
                </p>
              </div>
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
          </div>

          {/* ── Footer ── */}
          <div className="px-5 pb-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 rounded-xl bg-[#fc8019] hover:bg-[#e5721f] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              {category ? "Save Changes" : "Add Category"}
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

  const { categories: c } = useCategories();

  console.log(c);

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
