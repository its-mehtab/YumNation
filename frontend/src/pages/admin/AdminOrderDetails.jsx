import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

// ── Mock order (replace with real API call) ──────────────────────────────────
const mockOrder = {
  _id: "64f3a2b1c9e1234567890abc",
  createdAt: "2026-03-08T20:18:48.990Z",
  orderStatus: "preparing",
  paymentMethod: "cod",
  paymentStatus: "pending",
  subtotal: 120,
  deliveryFee: 2.5,
  tax: 6,
  discount: 10,
  totalAmount: 118.5,
  couponCode: "SAVE10",
  user: {
    _id: "u1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
  },
  deliveryAddress: {
    fullName: "John Doe",
    addressLine1: "42 Baker Street",
    addressLine2: "Apt 3B",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700001",
    phoneNumber: "+91 9876543210",
  },
  items: [
    {
      _id: "i1",
      name: "Italian Pizza",
      variant: "Medium",
      quantity: 2,
      price: 45,
      image: null,
      product: { slug: "italian-pizza" },
    },
    {
      _id: "i2",
      name: "Veg Burger",
      variant: "Regular",
      quantity: 1,
      price: 30,
      image: null,
      product: { slug: "veg-burger" },
    },
  ],
};

// ── Status config ─────────────────────────────────────────────────────────────
const STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
];

const statusConfig = {
  placed: { color: "#6366f1", bg: "#eef2ff", label: "Placed" },
  confirmed: { color: "#f59e0b", bg: "#fffbeb", label: "Confirmed" },
  preparing: { color: "#fc8019", bg: "#fff7ed", label: "Preparing" },
  "out for delivery": {
    color: "#3b82f6",
    bg: "#eff6ff",
    label: "Out for Delivery",
  },
  delivered: { color: "#22c55e", bg: "#f0fdf4", label: "Delivered" },
  cancelled: { color: "#ef4444", bg: "#fef2f2", label: "Cancelled" },
};

// ── Timeline ──────────────────────────────────────────────────────────────────
const ICONS = ["📋", "✅", "👨‍🍳", "🛵", "🎉"];

const TimelineStep = ({ label, icon, done, active, last }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="relative w-full flex items-center">
      <div
        className={`flex-1 h-0.5 ${done && !active ? "bg-[#fc8019]" : "bg-gray-200"}`}
        style={{ visibility: label === STATUSES[0] ? "hidden" : "visible" }}
      />
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-300 text-sm
        ${
          active
            ? "border-[#fc8019] bg-[#fc8019] text-white scale-110 shadow-lg shadow-orange-200"
            : done
              ? "border-[#fc8019] bg-white text-[#fc8019]"
              : "border-gray-200 bg-white text-gray-300"
        }`}
      >
        {icon}
      </div>
      <div
        className={`flex-1 h-0.5 ${done && !last ? "bg-[#fc8019]" : "bg-gray-200"}`}
        style={{ visibility: last ? "hidden" : "visible" }}
      />
    </div>
    <p
      className={`text-xs mt-2 font-medium capitalize text-center leading-tight
      ${active ? "text-[#fc8019]" : done ? "text-gray-600" : "text-gray-300"}`}
    >
      {label}
    </p>
  </div>
);

// ── Section card wrapper ──────────────────────────────────────────────────────
const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-5">
    {title && (
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        {title}
      </p>
    )}
    {children}
  </div>
);

// ── Price row ─────────────────────────────────────────────────────────────────
const PriceRow = ({ label, value, highlight, green }) => (
  <div
    className={`flex justify-between py-1.5 text-sm
    ${
      highlight
        ? "font-bold text-[#fc8019] text-base border-t border-dashed border-gray-200 mt-1 pt-3"
        : green
          ? "text-green-600 font-medium"
          : "text-gray-600"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Replace with: axios.get(`${serverURL}/api/admin/order/${id}`, { withCredentials: true })
    setTimeout(() => {
      setOrder(mockOrder);
      setLoading(false);
    }, 600);
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      // await axios.put(`${serverURL}/api/admin/order/${id}/status`, { status: newStatus }, { withCredentials: true });
      setOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  // ── Loading ──
  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-44 bg-gray-100 rounded-2xl" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    );

  if (error && !order)
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-gray-500 text-sm">{error}</p>
        <Link
          to="/admin/orders"
          className="text-[#fc8019] text-sm underline mt-2 block"
        >
          Back to Orders
        </Link>
      </div>
    );

  const status = order.orderStatus;
  const isCancelled = status === "cancelled";
  const currentIdx = STATUSES.indexOf(status);
  const cfg = statusConfig[status] || statusConfig.placed;

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-sm text-gray-400 hover:text-[#fc8019] transition-colors font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-700">Order Details</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/admin/orders"
            className="hover:text-[#fc8019] transition-colors"
          >
            Orders
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">
            #{order._id.slice(-8).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* ── Left column ── */}
        <div className="col-span-8 space-y-5">
          {/* Order meta */}
          <Card>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
                  Order ID
                </p>
                <p className="text-sm font-bold text-gray-700 font-mono">
                  #{order._id.slice(-10).toUpperCase()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.label}
              </span>
            </div>
          </Card>

          {/* Timeline */}
          {!isCancelled && (
            <Card title="Delivery Progress">
              <div className="flex items-start">
                {STATUSES.map((s, i) => (
                  <TimelineStep
                    key={s}
                    label={s}
                    icon={ICONS[i]}
                    done={i <= currentIdx}
                    active={i === currentIdx}
                    last={i === STATUSES.length - 1}
                  />
                ))}
              </div>
            </Card>
          )}

          {/* Items */}
          <Card title={`Items (${order.items.length})`}>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <Link
                    to={`/product/${item.product?.slug}`}
                    className="w-14 h-14 min-w-14 rounded-xl border border-orange-100 bg-orange-50 flex items-center justify-center overflow-hidden"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">🍽️</span>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bill summary */}
          <Card title="Bill Summary">
            <PriceRow
              label="Subtotal"
              value={`$${order.subtotal?.toFixed(2)}`}
            />
            <PriceRow
              label="Delivery Fee"
              value={`$${order.deliveryFee?.toFixed(2)}`}
            />
            <PriceRow label="Tax (5%)" value={`$${order.tax?.toFixed(2)}`} />
            {order.discount > 0 && (
              <PriceRow
                label={`Coupon (${order.couponCode})`}
                value={`-$${order.discount?.toFixed(2)}`}
                green
              />
            )}
            <PriceRow
              label="Total"
              value={`$${order.totalAmount?.toFixed(2)}`}
              highlight
            />
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="col-span-4 space-y-5">
          {/* Update status */}
          <Card title="Update Status">
            <div className="space-y-2">
              {[...STATUSES, "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={updating || s === status}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all border
                    ${
                      s === status
                        ? "border-[#fc8019] bg-orange-50 text-[#fc8019] cursor-default"
                        : s === "cancelled"
                          ? "border-red-100 text-red-400 hover:bg-red-50"
                          : "border-gray-100 text-gray-500 hover:bg-gray-50"
                    } disabled:opacity-50`}
                >
                  <span className="mr-2">
                    {ICONS[STATUSES.indexOf(s)] || "❌"}
                  </span>
                  {s}
                  {s === status && (
                    <span className="float-right text-xs">● current</span>
                  )}
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </Card>

          {/* Customer */}
          <Card title="Customer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-base font-bold text-[#fc8019]">
                {order.user.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {order.user.name}
                </p>
                <p className="text-xs text-gray-400">{order.user.email}</p>
              </div>
            </div>
            {order.user.phone && (
              <p className="text-xs text-gray-500">📞 {order.user.phone}</p>
            )}
            <Link
              to={`/admin/customers/${order.user._id}`}
              className="mt-3 block text-center text-xs font-semibold text-[#fc8019] border border-orange-200 rounded-lg py-2 hover:bg-orange-50 transition-colors"
            >
              View Customer →
            </Link>
          </Card>

          {/* Delivery address */}
          <Card title="Delivery Address">
            <p className="text-sm font-semibold text-gray-700">
              {order.deliveryAddress?.fullName}
            </p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {order.deliveryAddress?.addressLine1}
              {order.deliveryAddress?.addressLine2 &&
                `, ${order.deliveryAddress.addressLine2}`}
              <br />
              {order.deliveryAddress?.city}, {order.deliveryAddress?.state} —{" "}
              {order.deliveryAddress?.pinCode}
            </p>
            {order.deliveryAddress?.phoneNumber && (
              <p className="text-sm text-gray-500 mt-1.5">
                📞 {order.deliveryAddress.phoneNumber}
              </p>
            )}
          </Card>

          {/* Payment */}
          <Card title="Payment">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700 capitalize">
                {order.paymentMethod === "cod"
                  ? "💵 Cash on Delivery"
                  : "💳 Card"}
              </p>
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize
                ${order.paymentStatus === "paid" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}
              >
                {order.paymentStatus || "pending"}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
