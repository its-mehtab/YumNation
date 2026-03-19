import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import { assets } from "../../assets/assets";

// ── Status config ────────────────────────────────────────────────────────────
const STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
];

const statusConfig = {
  placed: { color: "#6366f1", bg: "#eef2ff", label: "Order Placed" },
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

// ── Timeline Step ────────────────────────────────────────────────────────────
const TimelineStep = ({ label, icon, done, active, last }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="relative w-full flex items-center">
      {/* left line */}
      <div
        className={`flex-1 h-0.5 ${done && !active ? "bg-[#fc8019]" : "bg-gray-200"}`}
        style={{ visibility: label === STATUSES[0] ? "hidden" : "visible" }}
      />
      {/* dot */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-500 text-base
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
      {/* right line */}
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

const TIMELINE_ICONS = ["📋", "✅", "👨‍🍳", "🛵", "🎉"];

// ── Price Row ────────────────────────────────────────────────────────────────
const PriceRow = ({ label, value, highlight, strikethrough }) => (
  <div
    className={`flex justify-between py-1.5 text-sm ${highlight ? "font-bold text-[#fc8019] text-base border-t border-dashed border-gray-200 mt-1 pt-3" : "text-gray-600"}`}
  >
    <span>{label}</span>
    <span className={strikethrough ? "line-through text-gray-400" : ""}>
      {value}
    </span>
  </div>
);

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { serverURL } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${serverURL}/api/order/${id}`, {
          withCredentials: true,
        });
        setOrder(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    try {
      await axios.put(
        `${serverURL}/api/order/${id}/cancel`,
        {},
        { withCredentials: true },
      );
      setOrder((prev) => ({ ...prev, orderStatus: "cancelled" }));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-32 bg-gray-100 rounded-2xl" />
        <div className="h-48 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{error}</h2>
        <Link
          to="/orders"
          className="text-[#fc8019] text-sm font-medium underline"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const status = order.orderStatus;
  const isCancelled = status === "cancelled";
  const canCancel = status === "placed" || status === "confirmed";
  const currentIdx = STATUSES.indexOf(status);
  const cfg = statusConfig[status] || statusConfig.placed;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-8 space-y-5 fade-up">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#fc8019] transition-colors font-medium"
        >
          ← Back to Orders
        </button>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full capitalize bg-orange-100 text-[#fc8019]">
          {cfg.label}
        </span>
      </div>

      {/* ── Order meta ── */}
      <div className="bg-white rounded-2xl border border-gray-300 p-5">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
              Order ID
            </p>
            <p className="text-sm font-bold text-gray-700 font-mono">
              #{order._id?.slice(-10).toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
              Placed on
            </p>
            <p className="text-sm font-medium text-gray-600">
              {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
        </div>
      </div>

      {!isCancelled && (
        <div className="bg-white rounded-2xl border border-gray-300 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
            Delivery Progress
          </p>
          <div className="flex items-start">
            {STATUSES.map((s, i) => (
              <TimelineStep
                key={s}
                label={s}
                icon={TIMELINE_ICONS[i]}
                done={i <= currentIdx}
                active={i === currentIdx}
                last={i === STATUSES.length - 1}
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-300 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Items ({order.items.length})
        </p>
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <Link
                to={`/dish/${item.dish?.slug}`}
                className="w-14 h-14 min-w-14 p-1.5 rounded-md border border-orange-100 bg-orange-50 flex items-center justify-center overflow-hidden"
              >
                {item.image ? (
                  <img
                    src={assets.dish2}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-2xl">🍽️</span>
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/dish/${item.dish?.slug}`}>
                  <p className="text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-colors truncate">
                    {item.name}
                  </p>
                </Link>
                {item.variant && (
                  <p className="text-xs text-gray-400 mt-0.5">{item.variant}</p>
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
      </div>

      <div className="bg-white rounded-2xl border border-gray-300 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Bill Summary
        </p>
        <PriceRow label="Subtotal" value={`$${order.subtotal?.toFixed(2)}`} />
        <PriceRow
          label="Delivery Fee"
          value={`$${order.deliveryFee?.toFixed(2)}`}
        />
        <PriceRow label="Tax (5%)" value={`$${order.tax?.toFixed(2)}`} />
        {order.discount > 0 && (
          <PriceRow
            label={`Coupon Discount`}
            value={`-$${order.discount?.toFixed(2)}`}
          />
        )}
        <PriceRow
          label="Total"
          value={`$${order.totalAmount?.toFixed(2)}`}
          highlight
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-300 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Delivery Address
        </p>
        <p className="text-sm font-semibold text-gray-700">
          {order.deliveryAddress?.fullName}
        </p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          {order.deliveryAddress?.addressLine1}
          {order.deliveryAddress?.addressLine2 &&
            `, ${order.deliveryAddress.addressLine2}`}
          <br />
          {order.deliveryAddress?.city}, {order.deliveryAddress?.state} —{" "}
          {order.deliveryAddress?.pinCode} <br />
        </p>
        {order.deliveryAddress?.phoneNumber && (
          <p className="text-sm text-gray-500 mt-1">
            📞 {order.deliveryAddress.phoneNumber}
          </p>
        )}
      </div>

      {/* ── Payment ── */}
      <div className="bg-white rounded-2xl border border-gray-300 p-5 flex justify-between items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Payment Method
          </p>
          <p className="text-sm font-semibold text-gray-700 capitalize">
            {order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Card"}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${
            order.paymentStatus === "paid"
              ? "bg-green-50 text-green-600"
              : "bg-yellow-50 text-yellow-600"
          }`}
        >
          {order.paymentStatus || "pending"}
        </span>
      </div>

      {/* ── Cancel button ── */}
      {canCancel && (
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="w-full py-3 rounded-xl border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {cancelling ? "Cancelling..." : "Cancel Order"}
        </button>
      )}

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default OrderDetails;
