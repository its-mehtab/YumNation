import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import { TargetIcon } from "@radix-ui/react-icons";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  ViewIcon,
} from "../../assets/icon/Icons";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

// ─── Static seed data — replace with API fetch ───────────────────────────────

const SEED = [
  {
    _id: "1",
    code: "SAVE99",
    title: "Items At ₹99",
    subtitle: "ON SELECT ITEMS",
    type: "flat",
    value: 99,
    minOrder: 199,
    maxDiscount: null,
    maxUses: 500,
    uses: 312,
    validTill: "2026-12-31",
    status: "active",
    terms: [
      "Offer will be applicable automatically.",
      "Offer is applicable only on items with discount tags.",
      "This offer cannot be combined with other coupons.",
      "Offer is only valid on select restaurants.",
      "Offer valid till Dec 31, 2026 11:59 PM",
    ],
  },
  {
    _id: "2",
    code: "WELCOME50",
    title: "50% Off First Order",
    subtitle: "FOR NEW USERS",
    type: "percentage",
    value: 50,
    minOrder: 149,
    maxDiscount: 100,
    maxUses: 1000,
    uses: 876,
    validTill: "2026-06-30",
    status: "active",
    terms: [
      "Valid only on your first order.",
      "Max discount capped at ₹100.",
      "Cannot be combined with other offers.",
    ],
  },
  {
    _id: "3",
    code: "FREESHIP",
    title: "Free Delivery",
    subtitle: "NO DELIVERY FEE",
    type: "flat",
    value: 0,
    minOrder: 99,
    maxDiscount: null,
    maxUses: 200,
    uses: 200,
    validTill: "2026-03-31",
    status: "inactive",
    terms: [
      "Valid on orders above ₹99.",
      "Not valid on premium restaurants.",
      "One use per user.",
    ],
  },
  {
    _id: "4",
    code: "FEAST20",
    title: "Get 20% Off",
    subtitle: "ON ORDERS ABOVE ₹299",
    type: "percentage",
    value: 20,
    minOrder: 299,
    maxDiscount: 80,
    maxUses: 300,
    uses: 145,
    validTill: "2026-09-30",
    status: "active",
    terms: [
      "Valid on select restaurants only.",
      "Discount capped at ₹80.",
      "Offer valid once per user per day.",
    ],
  },
];

const EMPTY_FORM = {
  code: "",
  title: "",
  subtitle: "",
  type: "flat",
  value: "",
  minOrder: "",
  maxDiscount: "",
  maxUses: "",
  validTill: "",
  status: "active",
  terms: "",
};

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
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles[variant] || styles.inactive}`}
    >
      {children}
    </span>
  );
};

// ─── Usage Bar ────────────────────────────────────────────────────────────────

const UsageBar = ({ uses, maxUses }) => {
  const pct = maxUses ? Math.min(100, Math.round((uses / maxUses) * 100)) : 50;
  return (
    <div>
      <span className="text-xs text-gray-600">
        {uses} / {maxUses ?? "∞"}
      </span>
      <div className="mt-1 h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#fc8019] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─── Section Divider ──────────────────────────────────────────────────────────

const SectionDivider = ({ label }) => (
  <div className="col-span-2 flex items-center gap-3 pt-2">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

// ─── Preview Modal ────────────────────────────────────────────────────────────

const PreviewModal = ({ promo, onClose }) => {
  if (!promo) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 w-[340px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              User Preview
            </p>
            <p className="text-sm font-bold text-gray-700 mt-0.5">
              How customers see this
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Coupon card preview */}
        <div className="px-5 py-4 bg-orange-50/40 border-b border-dashed border-orange-100">
          <div className="flex items-center gap-3 bg-white border border-orange-100 rounded-xl p-3 shadow-sm">
            <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <TargetIcon className="text-[#fc8019]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{promo.title}</p>
              <p className="text-[10px] font-semibold text-gray-400 mt-0.5 tracking-wider uppercase">
                {promo.subtitle}
              </p>
            </div>
            <span className="ml-auto font-mono text-xs font-bold bg-orange-50 text-orange-500 border border-orange-100 px-2 py-1 rounded-lg">
              {promo.code}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-800 mb-1">{promo.title}</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {promo.type === "flat"
              ? `Get ₹${promo.value} off on orders above ₹${promo.minOrder || 0}`
              : `Get ${promo.value}% off (upto ₹${promo.maxDiscount ?? "∞"}) on orders above ₹${promo.minOrder || 0}`}
          </p>
        </div>

        {/* Terms */}
        <div className="px-5 py-4">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
            Terms & Conditions
          </p>
          <ul className="flex flex-col gap-2">
            {(promo.terms || []).map((t, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-xs text-gray-500 leading-relaxed"
              >
                <span className="text-[#fc8019] shrink-0 mt-px">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Create / Edit Modal ──────────────────────────────────────────────────────

const PromoModal = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          terms: (initial.terms || []).join("\n"),
          value: String(initial.value),
          minOrder: String(initial.minOrder ?? ""),
          maxDiscount: String(initial.maxDiscount ?? ""),
          maxUses: String(initial.maxUses ?? ""),
        }
      : EMPTY_FORM,
  );

  console.log(form);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    if (!form.code.trim() || !form.title.trim()) {
      notifyError("Code and title are required.");
      return;
    }
    onSave({
      ...form,
      code: form.code.toUpperCase().trim(),
      value: parseFloat(form.value) || 0,
      minOrder: parseFloat(form.minOrder) || 0,
      maxDiscount: form.maxDiscount ? parseFloat(form.maxDiscount) : null,
      maxUses: form.maxUses ? parseInt(form.maxUses) : null,
      terms: form.terms
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 w-[540px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {initial ? "Edit" : "Create"} Promo Code
            </p>
            <p className="text-base font-bold text-gray-700 mt-0.5">
              {initial ? `Editing — ${initial.code}` : "New discount offer"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* ── Form Body ── */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {/* Section: Identity */}
            <SectionDivider label="Identity" />

            <Field label="Promo Code *">
              <input
                className="field outline-none uppercase"
                value={form.code}
                onChange={(e) => set("code", e.target.value)}
                placeholder="e.g. SAVE99"
              />
            </Field>

            <Field label="Title *">
              <input
                className="field outline-none"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Items At ₹99"
              />
            </Field>

            <Field label="Subtitle (shown on card)" full>
              <input
                className="field outline-none"
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="e.g. ON SELECT ITEMS"
              />
            </Field>

            {/* Section: Discount */}
            <SectionDivider label="Discount Rules" />

            <Field label="Discount Type *">
              <select
                className="field outline-none"
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
              >
                <option value="flat">Flat (fixed amount)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </Field>

            <Field label="Discount Value *">
              <input
                className="field outline-none"
                type="number"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder={form.type === "flat" ? "e.g. 99" : "e.g. 20"}
              />
            </Field>

            <Field label="Min Order Amount">
              <input
                className="field outline-none"
                type="number"
                value={form.minOrder}
                onChange={(e) => set("minOrder", e.target.value)}
                placeholder="e.g. 199"
              />
            </Field>

            <Field label="Max Discount Cap (% type)">
              <input
                className="field outline-none"
                type="number"
                value={form.maxDiscount}
                onChange={(e) => set("maxDiscount", e.target.value)}
                placeholder="e.g. 150"
              />
            </Field>

            {/* Section: Validity */}
            <SectionDivider label="Validity & Limits" />

            <Field label="Max Total Uses">
              <input
                className="field outline-none"
                type="number"
                value={form.maxUses}
                onChange={(e) => set("maxUses", e.target.value)}
                placeholder="e.g. 500"
              />
            </Field>

            <Field label="Status">
              <select
                className="field outline-none"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>

            <Field label="Valid Till" full>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs()}
                  slotProps={{ textField: { fullWidth: true } }}
                  disablePast
                  minDate={dayjs().add(1, "day")}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Field>

            {/* Section: Terms */}
            <SectionDivider label="Terms & Conditions" />

            <Field label="One term per line" full>
              <textarea
                className="field outline-none resize-none"
                rows={4}
                value={form.terms}
                onChange={(e) => set("terms", e.target.value)}
                placeholder={
                  "Offer valid on select restaurants\nCannot be combined with other coupons\nOffer valid till Dec 31, 2026"
                }
              />
            </Field>
          </div>
        </div>

        {/* ── Modal Footer ── */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#fc8019] hover:bg-[#e5721f] rounded-xl transition-colors"
          >
            {initial ? "Save Changes" : "Create Promo Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Small helper wrapper for form fields
const Field = ({ label, children, full }) => (
  <div className={`flex flex-col gap-1.5 ${full ? "col-span-2" : ""}`}>
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {children}
  </div>
);

// ─── Main AdminPromoCodes Page ─────────────────────────────────────────────────────

const AdminPromoCodes = () => {
  const { serverURL } = useAuth();

  const [promos, setPromos] = useState(SEED);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [previewPromo, setPreviewPromo] = useState(null);

  // ── Stats ──
  const total = promos.length;
  const active = promos.filter((p) => p.status === "active").length;
  const totalUses = promos.reduce((s, p) => s + (p.uses || 0), 0);
  const flatCount = promos.filter((p) => p.type === "flat").length;

  // ── Filter ──
  const filtered = promos.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.code.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q);
    const matchS = !filterStatus || p.status === filterStatus;
    const matchT = !filterType || p.type === filterType;
    return matchQ && matchS && matchT;
  });

  // ── CRUD handlers ──

  const handleCreate = async (data) => {
    try {
      setPromos((p) => [
        { ...data, _id: Date.now().toString(), uses: 0 },
        ...p,
      ]);
      setShowCreate(false);
      notifySuccess("Promo code created");
    } catch {
      notifyError("Failed to create promo code");
    }
  };

  const handleEdit = async (data) => {
    try {
      setPromos((p) =>
        p.map((x) => (x._id === editPromo._id ? { ...x, ...data } : x)),
      );
      setEditPromo(null);
      notifySuccess("Promo code updated");
    } catch {
      notifyError("Failed to update promo code");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this promo code?")) return;
    try {
      setPromos((p) => p.filter((x) => x._id !== id));
      notifySuccess("Promo code deleted");
    } catch {
      notifyError("Failed to delete promo code");
    }
  };

  const handleToggleStatus = async (promo) => {
    const next = promo.status === "active" ? "inactive" : "active";
    try {
      setPromos((p) =>
        p.map((x) => (x._id === promo._id ? { ...x, status: next } : x)),
      );
      notifySuccess(`Promo ${next === "active" ? "activated" : "deactivated"}`);
    } catch {
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
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          <PlusIcon size="16" color={"#fff"} />
          New Promo Code
        </button>
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="">All types</option>
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
                "Min Order",
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
                      {p.subtitle}
                    </p>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Badge variant={p.type}>
                        {p.type === "flat" ? "Flat" : "%"}
                      </Badge>
                      <span className="font-semibold text-gray-700">
                        {p.type === "flat" ? `₹${p.value}` : `${p.value}%`}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-gray-500 text-[13px]">
                    ₹{p.minOrder || 0}
                  </td>

                  <td className="px-4 py-3.5">
                    <UsageBar uses={p.uses || 0} maxUses={p.maxUses} />
                  </td>

                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(p.validTill).format("DD MMM, YYYY") || "—"}
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
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        onClick={() => setPreviewPromo(p)}
                      >
                        <ViewIcon />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        onClick={() => setEditPromo(p)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        danger
                        onClick={() => handleDelete(p._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      {showCreate && (
        <PromoModal
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}
      {editPromo && (
        <PromoModal
          initial={editPromo}
          onClose={() => setEditPromo(null)}
          onSave={handleEdit}
        />
      )}
      {previewPromo && (
        <PreviewModal
          promo={previewPromo}
          onClose={() => setPreviewPromo(null)}
        />
      )}
    </div>
  );
};

export default AdminPromoCodes;
