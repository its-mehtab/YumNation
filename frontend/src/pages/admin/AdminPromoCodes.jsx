import React, { useState } from "react";
import { useAuth } from "../../context/user/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { DeleteIcon, EditIcon, PlusIcon } from "../../assets/icon/Icons";
import dayjs from "dayjs";
import UsageBar from "../../components/admin/UsageBar";
import PromoModal from "../../components/admin/PromoModal";
import PreviewModal from "../../components/common/PreviewModal";
import { useCoupon } from "../../context/admin/CouponContext";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import axios from "axios";

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
    <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold" style={{ color: color || "#1f2937" }}>
      {value}
    </p>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const Badge = ({ children, variant }) => {
  const styles = {
    active: "bg-green-50 text-green-700 border border-green-100",
    inactive: "bg-gray-100 text-gray-400 border border-gray-200",
    flat: "bg-orange-50 text-[#fc8019] border border-orange-100",
    percentage: "bg-orange-50 text-orange-600 border border-orange-100",
  };
  return (
    <span
      className={`flex text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles[variant] || styles.inactive}`}
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
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Promo Codes</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage discount codes and promotional offers
          </p>
        </div>
        <PromoModal
          btn={
            <button
              // onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              <PlusIcon size="16" color={"#fff"} />
              New Promo Code
            </button>
          }
        />
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total codes" value={total} />
        <StatCard label="Active" value={active} color="#3b6d11" />
        <StatCard
          label="Total uses"
          value={totalUses.toLocaleString()}
          color="#fc8019"
        />
        <StatCard label="Flat discounts" value={flatCount} color="#185fa5" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-700">All Promo Codes</h2>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search code or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-56"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterdiscountType}
            onChange={(e) => setFilterdiscountType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="">All discountTypes</option>
            <option value="flat">Flat</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
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
                  className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50"
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
                  className="text-center py-10 text-sm text-gray-400"
                >
                  No promo codes found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-orange-50/30 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-lg">
                      {p.code}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-gray-700 text-[13px]">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {p.subTitle}
                    </p>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Badge variant={p.discountType}>
                        {p.discountType === "flat" ? "Flat" : "%"}
                      </Badge>
                      <span className="font-semibold text-gray-700">
                        {p.discountType === "flat"
                          ? `$${p.value}`
                          : `${p.value}%`}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <UsageBar uses={p.uses || 0} maxUses={p.maxUses} />
                  </td>

                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(p.expiresAt).format("DD MMM, YYYY") || "—"}
                  </td>

                  <td className="px-4 py-3.5">
                    <button onClick={() => handleToggleStatus(p)}>
                      <Badge variant={p.status}>
                        {p.status === "active" ? "● Active" : "● Inactive"}
                      </Badge>
                    </button>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <PreviewModal promo={p} />
                      <PromoModal
                        initial={p}
                        btn={
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors">
                            <EditIcon />
                          </button>
                        }
                      />
                      <ConfirmationModal
                        button={
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors">
                            <DeleteIcon />
                          </button>
                        }
                        heading="Delete this promo code?"
                        description={
                          "Are you sure you want to delete this coupons? This action cannot be undone and the Coupons will be removed from the list."
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
  );
};

export default AdminPromoCodes;
