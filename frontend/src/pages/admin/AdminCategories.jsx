import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useCategories } from "../../context/admin/CategoryAdminContext";
import dayjs from "dayjs";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import {
  Folder,
  CheckCircle,
  Ban,
  Image as ImageIcon,
  Utensils,
  FolderOpen,
  Edit2,
  Trash2,
  Plus,
  Search,
  X,
} from "lucide-react";

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
];

// ── Add/Edit Modal ───────────────────────────────────────────────────────────
const CategoryModal = ({ category, onClose, onSave, miniLoading }) => {
  const [name, setName] = useState(category?.name || "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(category?.image || null);
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-md shadow-xl border border-gray-200 w-full max-w-md mx-4 overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#fc8019] uppercase tracking-wider mb-1">
              {category ? "Edit" : "New"} Category
            </p>
            <h2 className="text-xl font-bold text-gray-800">
              {category ? `Editing ${category.name}` : "Add Category"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            {/* ── Icon Upload ── */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Icon
              </label>

              {iconPreview ? (
                // Preview state
                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="w-16 h-16 rounded-md border border-gray-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={iconPreview}
                      alt="icon preview"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {iconFile?.name || "Current icon"}
                    </p>
                    {iconFile && (
                      <p className="text-xs text-gray-500 mt-1">
                        {(iconFile.size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-[#fc8019] hover:underline"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveIcon}
                      className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors"
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
                  className={`cursor-pointer flex flex-col items-center justify-center gap-3 py-6 rounded-md border-2 border-dashed transition-colors ${
                    isDragging
                      ? "border-[#fc8019] bg-orange-50"
                      : "border-gray-200 bg-gray-50 hover:bg-orange-50/40"
                  }`}
                >
                  <div className="w-12 h-12 rounded-md bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
                    <ImageIcon size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-600">
                      Drop icon here or{" "}
                      <span className="text-[#fc8019]">browse</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pizza"
                className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                autoFocus
              />
            </div>

            {/* ── Status Toggle ── */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-200">
              <div>
                <p className="text-sm font-semibold text-gray-700">Status</p>
                <p className="text-xs text-gray-500 mt-1">
                  {isActive ? "Visible to customers" : "Hidden from customers"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive((p) => !p)}
                className={`relative w-12 h-6 rounded-md transition-colors duration-300 ${isActive ? "bg-[#fc8019]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-md bg-white shadow-sm transition-transform duration-300 ${isActive ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-md border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || miniLoading}
              className="flex-1 py-3 rounded-md bg-[#fc8019] hover:bg-[#e5721f] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-orange-500/20 transition-all"
            >
              {miniLoading
                ? "Loading..."
                : category
                  ? "Save Changes"
                  : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const AdminCategories = () => {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | { ...category }

  const [miniLoading, setMiniLoading] = useState(false);

  const { categories, setCategories } = useCategories();
  const { serverURL } = useAuth();

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async ({ name, isActive, iconFile }) => {
    setMiniLoading(true);

    const fd = new FormData();
    fd.append("name", name);
    if (iconFile) {
      fd.append("image", iconFile);
    }
    fd.append("isActive", isActive);

    if (modal === "add") {
      try {
        const { data } = await axios.post(
          `${serverURL}/api/admin/categories`,
          fd,
          { withCredentials: true },
        );

        setCategories((prev) => [...prev, data]);
        notifySuccess("Category Added Successfully");
      } catch (error) {
        notifyError(error?.response?.data || error.message);
      } finally {
        setMiniLoading(false);
      }
    } else {
      try {
        const { data } = await axios.put(
          `${serverURL}/api/admin/categories/${modal._id}`,
          fd,
          { withCredentials: true },
        );

        setCategories((prev) =>
          prev.map((c) => (c._id === modal._id ? data : c)),
        );
        notifySuccess("Category Update Successfully");
      } catch (error) {
        notifyError(error?.response?.data || error.message);
      } finally {
        setMiniLoading(false);
      }
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories((prev) => prev.filter((c) => c._id !== id));

    try {
      await axios.delete(`${serverURL}/api/admin/categories/${id}`, {
        withCredentials: true,
      });
      notifySuccess("Category Deleted");
    } catch (error) {
      notifyError(error?.response?.data || error.message);
      setCategories(categories);
    }
  };

  const handleToggleStatus = async (id) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === id ? { ...c, isActive: !c.isActive } : c)),
    );

    try {
      await axios.patch(
        `${serverURL}/api/admin/categories/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      notifySuccess("Status Changed");
    } catch (error) {
      setCategories(categories);
      notifyError(error?.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Categories
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage your restaurant categories
          </p>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            label: "Total Categories",
            value: categories.length,
            icon: Folder,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
          {
            label: "Active",
            value: categories.filter((c) => c.isActive).length,
            icon: CheckCircle,
            color: "text-[#fc8019]",
            bg: "bg-[#fff2e8]",
          },
          {
            label: "Inactive",
            value: categories.filter((c) => !c.isActive).length,
            icon: Ban,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-md  border border-gray-200 p-5 flex items-start justify-between transition-all hover:shadow-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800">{s.value}</p>
            </div>
            <div className={`p-2.5 rounded-md ${s.bg} ${s.color}`}>
              <s.icon size={18} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
        {/* Card header */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-b border-gray-50 gap-4">
          <h2 className="text-base font-semibold text-gray-900">All Categories</h2>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
               strokeWidth={1.5} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-[#fc8019] focus:ring-1 focus:ring-[#fc8019]/20 transition-all outline-none"
              />
            </div>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-md transition-all shadow-sm shadow-orange-500/10 whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={1.5} />
              Add Category
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                  #
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs">
                  Name
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs">
                  Slug
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs">
                  Dishes
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs">
                  Created
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="px-4 py-4 font-medium uppercase tracking-wider text-xs text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {filtered.map((cat, i) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-gray-400 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#fff2e8] border border-orange-100 flex items-center justify-center text-[#fc8019]">
                        <Utensils size={18} strokeWidth={1.5} />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono bg-gray-50 text-gray-500 px-2.5 py-1 rounded-md border border-gray-200">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/admin/dishes?category=${cat.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#fc8019] font-semibold hover:underline"
                    >
                      {cat.dishCount} dishes
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-gray-500 font-medium text-sm">
                    {dayjs(cat.createdAt).format("MMM DD, YYYY")}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleToggleStatus(cat._id)}
                      className="transition-transform active:scale-95"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border ${
                          cat.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {cat.isActive ? (
                          <CheckCircle size={14} strokeWidth={1.5} />
                        ) : (
                          <Ban size={14} strokeWidth={1.5} />
                        )}
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setModal(cat)}
                        className="p-2 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-[#fc8019] shadow-sm transition-all"
                        title="Edit"
                      >
                        <Edit2 size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="p-2 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 shadow-sm transition-all"
                        title="Delete"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
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
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
              <FolderOpen size={32} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              No categories found
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <CategoryModal
          category={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          miniLoading={miniLoading}
        />
      )}
    </div>
  );
};

export default AdminCategories;
