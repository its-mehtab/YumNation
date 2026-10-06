import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {
  CheckCircle2,
  Package,
  Clock,
  Truck,
  MapPin,
  Star,
  Banknote,
  CreditCard,
  Phone,
  Store,
  Utensils,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from "lucide-react";
import { useAuth } from "../../context/user/AuthContext";
import TimelineStep from "../../context/public/TimelineStep";
import { Skeleton } from "@radix-ui/themes";

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
      dish: { slug: "italian-pizza" },
    },
    {
      _id: "i2",
      name: "Veg Burger",
      variant: "Regular",
      quantity: 1,
      price: 30,
      image: null,
      dish: { slug: "veg-burger" },
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
  placed: {
    color: "#4f46e5",
    bg: "#eef2ff",
    label: "Placed",
    border: "border-indigo-200",
  },
  confirmed: {
    color: "#d97706",
    bg: "#fffbeb",
    label: "Confirmed",
    border: "border-amber-200",
  },
  preparing: {
    color: "#c2410c",
    bg: "#fff7ed",
    label: "Preparing",
    border: "border-orange-200",
  },
  "out for delivery": {
    color: "#1d4ed8",
    bg: "#eff6ff",
    label: "Out for Delivery",
    border: "border-blue-200",
  },
  delivered: {
    color: "#15803d",
    bg: "#f0fdf4",
    label: "Delivered",
    border: "border-green-200",
  },
  cancelled: {
    color: "#b91c1c",
    bg: "#fef2f2",
    label: "Cancelled",
    border: "border-red-200",
  },
};

// ── Timeline ──────────────────────────────────────────────────────────────────
const ICONS = [
  <Package size={20} strokeWidth={1.5} />,
  <CheckCircle2 size={20} strokeWidth={1.5} />,
  <Clock size={20} strokeWidth={1.5} />,
  <Truck size={20} strokeWidth={1.5} />,
  <CheckCircle2 size={20} strokeWidth={1.5} />,
];

// ── Section card wrapper ──────────────────────────────────────────────────────
const Card = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-md  border border-gray-200 overflow-hidden h-full">
    {title && (
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        {Icon && <Icon size={18} className="text-gray-400" />}
        <h3 className="text-sm font-bold text-gray-800 tracking-wide">
          {title}
        </h3>
      </div>
    )}
    <div className={title ? "p-6" : "p-6"}>{children}</div>
  </div>
);

// ── Price row ─────────────────────────────────────────────────────────────────
const PriceRow = ({ label, value, highlight, green }) => (
  <div
    className={`flex justify-between py-2.5 text-sm
    ${
      highlight
        ? "font-bold text-[#fc8019] text-lg border-t-2 border-dashed border-gray-200 mt-2 pt-4"
        : green
          ? "text-[#fc8019] font-bold"
          : "text-gray-600 font-medium"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminOrderDetails = () => {
  const { serverURL } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/order/${id}`, {
        withCredentials: true,
      });

      console.log(data);

      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    setTimeout(() => {
      // setOrder(mockOrder);
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
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-md w-1/4" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <div className="h-32 bg-gray-100 rounded-md" />
            <div className="h-44 bg-gray-100 rounded-md" />
            <div className="h-64 bg-gray-100 rounded-md" />
          </div>
          <div className="col-span-4 space-y-6">
            <div className="h-48 bg-gray-100 rounded-md" />
            <div className="h-48 bg-gray-100 rounded-md" />
          </div>
        </div>
      </div>
    );

  if (error || !order)
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-md border border-gray-200 shadow-sm">
        <AlertCircle
          size={48}
          className="text-gray-300 mb-4"
          strokeWidth={1.5}
        />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Order Not Found
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          {error || "The requested order could not be loaded."}
        </p>
        <Link
          to="/admin/orders"
          className="bg-[#fc8019] text-white px-6 py-2.5 rounded-md font-bold hover:bg-[#e5721f] transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );

  const status = order?.orderStatus;
  const isCancelled = status === "cancelled";
  const currentIdx = STATUSES.indexOf(status);
  const cfg = statusConfig[status] || statusConfig.placed;

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/orders")}
            className="p-2 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-[#fc8019] transition-all"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Order Details
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Link
                to="/admin/orders"
                className="hover:text-[#fc8019] transition-colors"
              >
                Orders
              </Link>
              <ChevronRight
                size={14}
                className="text-gray-400"
                strokeWidth={1.5}
              />
              <span className="text-[#fc8019] font-medium">
                #{order._id.slice(-8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left column ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order meta */}
          <div className="bg-white rounded-md  border border-gray-200 p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Order ID
              </p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-gray-800 font-mono">
                  #{order._id.slice(-10).toUpperCase()}
                </p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
                  {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
                </span>
              </div>
            </div>
            <span
              className={`text-sm font-bold px-4 py-2 rounded-md capitalize border ${cfg.border}`}
              style={{ color: cfg.color, background: cfg.bg }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Timeline */}
          {!isCancelled && (
            <Card title="Delivery Progress" icon={Truck}>
              <div className="flex items-start pt-2">
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

          {order && loading ? (
            <Skeleton loading={true} className="h-20 w-full rounded-md" />
          ) : (
            <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                <Store size={18} className="text-gray-400" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-gray-800 tracking-wide">
                  Ordering From
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-5">
                  <Link to={`/admin/restaurants/${order?.restaurant?._id}`}>
                    <div className="w-16 h-16 min-w-[4rem] rounded-md border border-orange-100 bg-[#fff2e8] shadow-sm overflow-hidden flex items-center justify-center text-orange-400">
                      {order?.restaurantSnapshot.logo ? (
                        <img
                          src={order?.restaurantSnapshot.logo}
                          alt={order?.restaurantSnapshot.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Store size={24} strokeWidth={1.5} />
                      )}
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        to={`/admin/restaurants/${order?.restaurant?._id}`}
                        className="font-bold text-gray-800 hover:text-[#fc8019] transition-colors text-lg"
                      >
                        {order?.restaurantSnapshot?.name}
                      </Link>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                          order?.restaurant?.isOpen
                            ? "bg-[#fff2e8] text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                      >
                        {order?.restaurant?.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                      {order?.restaurant?.cuisine?.map((c) => c).join(" · ")}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs font-medium text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <MapPin
                          size={14}
                          className="text-gray-400"
                          strokeWidth={1.5}
                        />
                        {order?.restaurant?.address.addressLine1},{" "}
                        {order?.restaurant?.address.city}
                      </span>
                      <span className="w-1 h-1 rounded-md bg-gray-300" />
                      <span className="flex items-center gap-1.5">
                        <Clock
                          size={14}
                          className="text-gray-400"
                          strokeWidth={1.5}
                        />{" "}
                        {order?.restaurant?.deliveryTime} min
                      </span>
                      <span className="w-1 h-1 rounded-md bg-gray-300" />
                      <span className="flex items-center gap-1.5 text-yellow-600">
                        <Star size={14} fill="currentColor" strokeWidth={1.5} />{" "}
                        {order?.restaurant?.rating}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/restaurants/${order?.restaurant?._id}`}
                    className="shrink-0 text-sm font-bold text-[#fc8019] bg-[#fff2e8] px-4 py-2 rounded-md hover:bg-orange-100 transition-colors hidden sm:flex items-center gap-2"
                  >
                    View <ChevronRight size={16} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          <Card title={`Order Items (${order.items.length})`} icon={Utensils}>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 rounded-md border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 min-w-[4rem] rounded-md border border-orange-100 bg-white flex items-center justify-center overflow-hidden text-orange-300 shadow-sm">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Utensils size={24} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-800 truncate">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-sm font-medium text-gray-500 mt-0.5">
                        {item.variant.name}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5 bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bill summary */}
          <Card title="Bill Summary" icon={Receipt}>
            <div className="space-y-1">
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
                  label={`Coupon Discount (${order.couponCode})`}
                  value={`-$${order.discount?.toFixed(2)}`}
                  green
                />
              )}
              <PriceRow
                label="Total Amount"
                value={`$${order.totalAmount?.toFixed(2)}`}
                highlight
              />
            </div>
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Update status */}
          <Card title="Update Status">
            <div className="space-y-2">
              {[...STATUSES, "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={updating || s === status}
                  className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-md text-sm font-bold capitalize transition-all border
                    ${
                      s === status
                        ? "border-[#fc8019] bg-[#fff2e8] text-[#fc8019] shadow-sm shadow-orange-500/10 cursor-default"
                        : s === "cancelled"
                          ? "border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    } disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${s === status ? "text-[#fc8019]" : s === "cancelled" ? "text-red-500" : "text-gray-400"}`}
                    >
                      {s === "cancelled" ? (
                        <XCircle size={18} strokeWidth={1.5} />
                      ) : (
                        ICONS[STATUSES.indexOf(s)]
                      )}
                    </span>
                    {s}
                  </div>
                  {s === status && (
                    <span className="text-[10px] uppercase tracking-wider bg-white px-2 py-1 rounded-md border border-orange-200">
                      Current
                    </span>
                  )}
                </button>
              ))}
            </div>
            {error && (
              <p className="text-sm font-bold text-red-500 mt-4 text-center bg-red-50 py-2 rounded-md">
                {error}
              </p>
            )}
          </Card>

          {/* Customer */}
          <Card title="Customer">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-md bg-orange-100 flex items-center justify-center text-xl font-bold text-[#fc8019] capitalize">
                {order.user.firstName.charAt(0)}
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">
                  {order.user.firstName} {order.user.lastName}
                </p>
                <p className="text-sm text-gray-500">{order.user.email}</p>
              </div>
            </div>
            {order.user.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-4">
                <Phone size={16} className="text-gray-400" strokeWidth={1.5} />
                {order.user.phone}
              </div>
            )}
            <Link
              to={`/admin/customers/${order.user._id}`}
              className="flex items-center justify-center gap-2 w-full text-sm font-bold text-[#fc8019] bg-[#fff2e8] hover:bg-orange-100 rounded-md py-2.5 transition-colors"
            >
              View Profile <ChevronRight size={16} strokeWidth={1.5} />
            </Link>
          </Card>

          {/* Delivery address */}
          <Card title="Delivery Address">
            <div className="flex gap-3">
              <MapPin
                size={20}
                className="text-gray-400 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">
                  {order.deliveryAddress?.fullName}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {order.deliveryAddress?.addressLine1}
                  {order.deliveryAddress?.addressLine2 &&
                    `, ${order.deliveryAddress.addressLine2}`}
                  <br />
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state}{" "}
                  — {order.deliveryAddress?.pinCode}
                </p>
                {order.deliveryAddress?.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-3 bg-gray-50 px-3 py-2 rounded-md w-fit border border-gray-200">
                    <Phone
                      size={14}
                      className="text-gray-400"
                      strokeWidth={1.5}
                    />
                    {order.deliveryAddress.phoneNumber}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card title="Payment Status">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-center gap-3">
                  {order.paymentMethod === "cod" ? (
                    <Banknote
                      size={24}
                      className="text-[#fc8019]"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <CreditCard
                      size={24}
                      className="text-[#fc8019]"
                      strokeWidth={1.5}
                    />
                  )}
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                      Method
                    </p>
                    <p className="text-sm font-bold text-gray-800 capitalize">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Card Payment"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </p>
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-md border capitalize
                  ${order.paymentStatus === "paid" ? "bg-[#fff2e8] text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}
                >
                  {order.paymentStatus || "pending"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
