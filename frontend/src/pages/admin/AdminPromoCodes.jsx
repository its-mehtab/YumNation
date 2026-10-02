import React, { useState } from "react";
import { useAuth } from "../../context/user/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import dayjs from "dayjs";
import UsageBar from "../../components/admin/UsageBar";
import PromoModal from "../../components/admin/PromoModal";
import PreviewModal from "../../components/common/PreviewModal";
import { useCoupon } from "../../context/admin/CouponContext";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import axios from "axios";
import {
  Ticket,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  TrendingUp,
  Percent,
} from "lucide-react";

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon: Icon, bg, color }) => (
  <div className="bg-white rounded-md  border border-gray-200 p-6 flex items-center justify-between transition-all hover:shadow-md">
    <div>
      <p className="text-sm font-semibold text-gray-500 mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`p-4 rounded-md ${bg} ${color}`}>
      <Icon size={28} strokeWidth={1.5} />
    </div>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const Badge = ({ children, variant }) => {
  const styles = {
    active: "bg-[#fff2e8] text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
    flat: "bg-[#fff2e8] text-blue-700 border-blue-200",
    percentage: "bg-[#fff2e8] text-orange-700 border-orange-200",
  };
  return (
    <span
      className={`flex items-center text-[11px] font-bold px-3 py-1 rounded-md border ${styles[variant] || styles.inactive} transition-colors`}
    >
      {children}
    </span>
  );
};

// ─── Main AdminPromoCodes Page ─────────────────────────────────────────────────────

const AdminPromoCodes = () => {
  const { serverURL } = useAuth();
  const { coupons, setCoupons } = useCoupon();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterdiscountType, setFilterdiscountType] = useState("");

  // ── Stats ──
  const total = coupons.length;
  const active = coupons.filter((p) => p.status === "active").length;
  const totalUses = coupons.reduce((s, p) => s + (p.uses || 0), 0);
  const flatCount = coupons.filter((p) => p.discountType === "flat").length;

  // ── Filter ──
  const filtered = coupons.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.code.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q);
    const matchS = !filterStatus || p.status === filterStatus;
    const matchT = !filterdiscountType || p.discountType === filterdiscountType;
    return matchQ && matchS && matchT;
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverURL}/api/admin/coupon/${id}`, {
        withCredentials: true,
      });
      setCoupons((p) => p.filter((x) => x._id !== id));
      notifySuccess("Promo code deleted");
    } catch {
      notifyError("Failed to delete promo code");
    }
  };

  const handleToggleStatus = async (promo) => {
    const next = promo.status === "active" ? "inactive" : "active";
    setCoupons((p) =>
      p.map((x) => (x._id === promo._id ? { ...x, status: next } : x)),
    );
    try {
      await axios.patch(
        `${serverURL}/api/admin/coupon/${promo._id}`,
        { status: next },
        { withCredentials: true },
      );
      notifySuccess(`Promo ${next === "active" ? "activated" : "deactivated"}`);
    } catch {
      setCoupons(coupons);
      notifyError("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Promo Codes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage discount codes and promotional offers
          </p>
        </div>
        <PromoModal
          btn={
            <button className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-bold px-4 py-2.5 rounded-md shadow-md shadow-orange-500/20 transition-all">
              <Plus size={18} strokeWidth={1.5} />
              New Promo Code
            </button>
          }
        />
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total codes"
          value={total}
          icon={Ticket}
          bg="bg-blue-50"
          color="text-[#fc8019]"
        />
        <StatCard
          label="Active"
          value={active}
          icon={CheckCircle}
          bg="bg-green-50"
          color="text-[#fc8019]"
        />
        <StatCard
          label="Total uses"
          value={totalUses.toLocaleString()}
          icon={TrendingUp}
          bg="bg-orange-50"
          color="text-[#fc8019]"
        />
        <StatCard
          label="Flat discounts"
          value={flatCount}
          icon={Percent}
          bg="bg-purple-50"
          color="text-[#fc8019]"
        />
      </div>

      <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-5 border-b border-gray-200 gap-4">
          <h2 className="text-lg font-bold text-gray-800">All Promo Codes</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
               strokeWidth={1.5} />
              <input
                placeholder="Search code or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterdiscountType}
              onChange={(e) => setFilterdiscountType(e.target.value)}
              className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none focus:bg-white focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
            >
              <option value="">All Types</option>
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr className="border-b border-gray-200">
                {[
                  "Code",
                  "Title",
                  "Discount",
                  "Usage",
                  "Valid Till",
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
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-20 text-sm text-gray-500 font-medium"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
                        <Ticket size={32} className="text-gray-400"  strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        No promo codes found
                      </h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your filters or search
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold bg-[#fff2e8] text-orange-700 border border-orange-200 px-3 py-1.5 rounded-md tracking-wider">
                        {p.code}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <p
                        className="font-bold text-gray-800 text-sm max-w-[200px] truncate"
                        title={p.title}
                      >
                        {p.title}
                      </p>
                      <p
                        className="text-xs text-gray-500 mt-1 max-w-[200px] truncate"
                        title={p.subTitle}
                      >
                        {p.subTitle}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={p.discountType}>
                          {p.discountType === "flat" ? "Flat" : "%"}
                        </Badge>
                        <span className="font-bold text-gray-800">
                          {p.discountType === "flat"
                            ? `$${p.value}`
                            : `${p.value}%`}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 w-48">
                      <UsageBar uses={p.uses || 0} maxUses={p.maxUses} />
                    </td>

                    <td className="px-4 py-4 text-xs font-medium text-gray-500">
                      {dayjs(p.expiresAt).format("DD MMM YYYY") || "—"}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className="active:scale-95 transition-transform"
                      >
                        <Badge variant={p.status}>
                          {p.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </button>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <PreviewModal promo={p} />
                        <PromoModal
                          initial={p}
                          btn={
                            <button
                              className="p-2 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-[#fc8019] shadow-sm transition-all"
                              title="Edit"
                            >
                              <Edit2 size={16}  strokeWidth={1.5} />
                            </button>
                          }
                        />
                        <ConfirmationModal
                          button={
                            <button
                              className="p-2 rounded-md bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-400 shadow-sm transition-all"
                              title="Delete"
                            >
                              <Trash2 size={16}  strokeWidth={1.5} />
                            </button>
                          }
                          heading="Delete this promo code?"
                          description={
                            "Are you sure you want to delete this coupon? This action cannot be undone and the Coupon will be removed from the list."
                          }
                          onClick={async () => await handleDelete(p._id)}
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
    </div>
  );
};

export default AdminPromoCodes;
