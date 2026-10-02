import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  Store,
  Utensils,
  Package,
  Star,
  DollarSign,
  MapPin,
  Edit2,
  ArchiveX,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockRestaurant = {
  _id: "1",
  name: "Pizza Palace",
  slug: "pizza-palace",
  description:
    "Authentic Italian pizza made with fresh ingredients and wood-fired ovens. A family favourite since 2018.",
  owner: {
    _id: "u1",
    name: "Marco Rossi",
    email: "marco@pizza.com",
    phone: "+91 9876543210",
  },
  email: "contact@pizzapalace.com",
  phone: "+91 9876543210",
  logo: null,
  coverImage: null,
  address: {
    addressLine1: "42 Park Street",
    addressLine2: "Ground Floor",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700016",
  },
  openingHours: { open: 600, close: 1380 },
  isOpen: true,
  status: "pending",
  isPureVeg: false,
  deliveryTime: 35,
  minOrderAmount: 10,
  deliveryFee: 2.5,
  rating: 4.5,
  totalReviews: 128,
  totalOrders: 312,
  createdAt: "2024-01-10T10:00:00.000Z",
};

const mockDishes = [
  {
    _id: "d1",
    name: "Margherita Pizza",
    price: 12,
    isAvailable: true,
    foodType: "veg",
    stock: 20,
  },
  {
    _id: "d2",
    name: "Pepperoni Pizza",
    price: 15,
    isAvailable: true,
    foodType: "non-veg",
    stock: 15,
  },
  {
    _id: "d3",
    name: "BBQ Chicken Pizza",
    price: 18,
    isAvailable: false,
    foodType: "non-veg",
    stock: 0,
  },
  {
    _id: "d4",
    name: "Garlic Bread",
    price: 5,
    isAvailable: true,
    foodType: "veg",
    stock: 50,
  },
];

const mockOrders = [
  {
    _id: "o1",
    user: "John Doe",
    totalAmount: 34.5,
    orderStatus: "delivered",
    createdAt: "2026-03-08T10:00:00.000Z",
  },
  {
    _id: "o2",
    user: "Priya S.",
    totalAmount: 22.0,
    orderStatus: "preparing",
    createdAt: "2026-03-09T14:30:00.000Z",
  },
  {
    _id: "o3",
    user: "Ravi K.",
    totalAmount: 47.0,
    orderStatus: "placed",
    createdAt: "2026-03-10T09:15:00.000Z",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const toTimeString = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  pending: {
    label: "Pending Review",
    icon: Clock,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  suspended: {
    label: "Suspended",
    icon: Ban,
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};

const orderStatusConfig = {
  placed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  confirmed: "bg-amber-50 text-amber-700 border-amber-200",
  preparing: "bg-[#fff2e8] text-orange-700 border-orange-200",
  "out for delivery": "bg-[#fff2e8] text-blue-700 border-blue-200",
  delivered: "bg-[#fff2e8] text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-11 h-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#fc8019]/50 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 rounded-md bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-md  border border-gray-200 overflow-hidden h-full">
    {(title || action) && (
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        {title && <h3 className="text-sm font-bold text-gray-800">{title}</h3>}
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0 text-sm">
    <div className="flex items-center gap-2 text-gray-500 font-medium">
      {Icon && <Icon size={16} className="text-gray-400" />}
      <span>{label}</span>
    </div>
    <div className="text-gray-800 font-semibold text-right max-w-[60%]">
      {value}
    </div>
  </div>
);

// ── Status actions ─────────────────────────────────────────────────────────────
// pending   → Approve + Reject
// active    → Suspend
// suspended → Reinstate
// rejected  → Reinstate
const StatusActions = ({
  status,
  onApprove,
  onReject,
  onSuspend,
  onReinstate,
}) => {
  if (status === "pending")
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={onApprove}
          className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-md transition-all shadow-md shadow-green-500/20"
        >
          <CheckCircle2 size={16} strokeWidth={1.5} /> Approve
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-4 py-2 rounded-md transition-all"
        >
          <XCircle size={16} strokeWidth={1.5} /> Reject
        </button>
      </div>
    );

  if (status === "active")
    return (
      <button
        onClick={onSuspend}
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-md transition-all"
      >
        <Ban size={16} strokeWidth={1.5} /> Suspend
      </button>
    );

  if (status === "suspended" || status === "rejected")
    return (
      <button
        onClick={onReinstate}
        className="flex items-center gap-1.5 bg-[#fff2e8] hover:bg-green-100 text-green-700 border border-green-200 text-xs font-bold px-4 py-2 rounded-md transition-all"
      >
        <CheckCircle2 size={16} strokeWidth={1.5} /> Reinstate
      </button>
    );

  return null;
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminRestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const { serverURL } = useAuth();

  const fetchRestaurantData = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/restaurant`, {
        params: {
          restaurantId: id,
        },
        withCredentials: true,
      });
      setRestaurant(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurantDishes = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/dish`, {
        params: {
          restaurantId: id,
        },
        withCredentials: true,
      });

      setDishes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
    fetchRestaurantDishes();
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleToggleOpen = () =>
    setRestaurant((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  // Replace with: axios.patch(`${serverURL}/api/admin/restaurant/${id}`, { isOpen: !restaurant.isOpen }, { withCredentials: true })

  const handleStatusUpdate = (status) =>
    setRestaurant((prev) => ({ ...prev, status }));
  // Replace with: axios.patch(`${serverURL}/api/admin/restaurant/${id}/status`, { status }, { withCredentials: true })

  if (loading)
    return (
      <div className="space-y-6 animate-pulse p-2">
        <div className="h-48 bg-gray-100 rounded-md" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-md" />
          ))}
        </div>
        <div className="h-96 bg-gray-100 rounded-md" />
      </div>
    );

  const tabs = ["overview", "dishes", "orders"];
  const statusMeta = statusConfig[restaurant.status] || statusConfig.pending;
  const StatusIcon = statusMeta.icon;

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/restaurants")}
            className="p-2 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-[#fc8019] transition-all"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Restaurant Details
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Link
                to="/admin/restaurants"
                className="hover:text-[#fc8019] transition-colors"
              >
                Restaurants
              </Link>
              <ChevronRight
                size={14}
                className="text-gray-400"
                strokeWidth={1.5}
              />
              <span className="text-[#fc8019] font-medium">
                {restaurant.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 relative">
          {restaurant.coverImage && (
            <img
              src={restaurant.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* <Link
            to={`/admin/restaurants/edit/${restaurant._id}`}
            className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-sm font-bold text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-white transition-all"
          >
            <Edit2 size={16} className="text-[#fc8019]" strokeWidth={1.5} />
            Edit Profile
          </Link> */}
        </div>

        <div className="px-8 pb-6 pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-md bg-white p-2 shadow-lg -mt-16 relative z-10">
              <div className="w-full h-full rounded-md bg-[#fff2e8] border border-orange-100 flex items-center justify-center text-orange-400 overflow-hidden">
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store size={40} strokeWidth={1.5} />
                )}
              </div>
            </div>
            <div className="space-y-1.5 -mt-4 sm:mt-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-800">
                  {restaurant.name}
                </h2>
                {restaurant.isPureVeg && (
                  <span className="text-xs bg-[#fff2e8] text-green-700 border border-green-200 font-bold px-3 py-1 rounded-md">
                    Pure Veg
                  </span>
                )}
                <span
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                >
                  <StatusIcon size={14} />
                  {statusMeta.label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={16}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                  {restaurant.address.city}, {restaurant.address.state}
                </span>
                <span className="w-1 h-1 rounded-md bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <Clock
                    size={16}
                    className="text-gray-400"
                    strokeWidth={1.5}
                  />
                  {restaurant.deliveryTime} min
                </span>
                <span className="w-1 h-1 rounded-md bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="text-[#fc8019]"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                  <span className="text-gray-800 font-bold">
                    {restaurant.rating}
                  </span>
                  <span>({restaurant.totalReviews} reviews)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            {/* Open today toggle — only relevant when active */}
            {restaurant.status === "active" && (
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-md border border-gray-200">
                <span className="text-sm text-gray-600 font-bold">
                  Accepting Orders
                </span>
                <Toggle
                  checked={restaurant.isOpen}
                  onChange={handleToggleOpen}
                />
              </div>
            )}
            {/* Contextual status actions */}
            <StatusActions
              status={restaurant.status}
              onApprove={() => handleStatusUpdate("active")}
              onReject={() => handleStatusUpdate("rejected")}
              onSuspend={() => handleStatusUpdate("suspended")}
              onReinstate={() => handleStatusUpdate("active")}
            />
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Orders",
            value: restaurant.totalOrders.toLocaleString(),
            icon: Package,
            color: "text-[#fc8019]",
            bg: "bg-blue-50",
          },
          {
            label: "Total Dishes",
            value: dishes.length,
            icon: Utensils,
            color: "text-[#fc8019]",
            bg: "bg-orange-50",
          },
          {
            label: "Rating",
            value: `${restaurant.rating} / 5`,
            icon: Star,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            label: "Min Order",
            value: `$${restaurant.minOrderAmount}`,
            icon: DollarSign,
            color: "text-[#fc8019]",
            bg: "bg-green-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-md  border border-gray-200 p-6 flex flex-col justify-between transition-all hover:shadow-md gap-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-md ${s.bg} ${s.color}`}>
                <s.icon size={24} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1 tracking-wide uppercase">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 bg-white border border-gray-200 p-1.5 rounded-md w-fit shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-md text-sm font-bold capitalize transition-all
              ${activeTab === tab ? "bg-[#fc8019] text-white shadow-md shadow-orange-500/20" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Overview tab ── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Card title="About Restaurant">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {restaurant.description || "No description added."}
              </p>
            </Card>

            <Card title="Address Details">
              <div className="space-y-1">
                <InfoRow
                  label="Street Address"
                  value={`${restaurant.address.addressLine1}${restaurant.address.addressLine2 ? `, ${restaurant.address.addressLine2}` : ""}`}
                />
                <InfoRow label="City" value={restaurant.address.city} />
                <InfoRow label="State" value={restaurant.address.state} />
                <InfoRow
                  label="Postal Code"
                  value={restaurant.address.pinCode}
                />
              </div>
            </Card>

            <Card title="Operating Hours">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                  <div className="w-10 h-10 rounded-md bg-[#fff2e8] flex items-center justify-center text-[#fc8019]">
                    <Clock size={20} strokeWidth={1.5} />
                  </div>
                  Monday – Sunday
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
                  <p className="text-sm font-bold text-gray-800">
                    {restaurant.openingHours.open} –{" "}
                    {restaurant.openingHours.close}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card title="Owner Details">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-14 h-14 rounded-md bg-orange-100 flex items-center justify-center text-xl font-bold text-[#fc8019]">
                  {restaurant.owner.firstName.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold text-gray-800">
                    {restaurant.owner.firstName}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Owner & Manager
                  </p>
                </div>
              </div>
              <div className="space-y-1 mb-6">
                <InfoRow
                  label="Email"
                  value={restaurant.owner.email}
                  icon={Mail}
                />
                <InfoRow
                  label="Phone"
                  value={restaurant.owner.phone}
                  icon={Phone}
                />
              </div>
              <Link
                to={`/admin/customers/${restaurant.owner._id}`}
                className="flex items-center justify-center gap-2 w-full text-sm font-bold text-[#fc8019] bg-[#fff2e8] hover:bg-orange-100 rounded-md py-3 transition-colors"
              >
                <Eye size={16} /> View Full Profile
              </Link>
            </Card>

            <Card title="Restaurant Contact">
              <div className="space-y-1">
                <InfoRow label="Email" value={restaurant.email} icon={Mail} />
                <InfoRow label="Phone" value={restaurant.phone} icon={Phone} />
              </div>
            </Card>

            <Card title="Delivery & Settings">
              <div className="space-y-1">
                <InfoRow
                  label="Delivery Fee"
                  value={`$${restaurant.deliveryFee}`}
                />
                <InfoRow
                  label="Est. Delivery Time"
                  value={`${restaurant.deliveryTime} min`}
                />
                <InfoRow
                  label="Minimum Order"
                  value={`$${restaurant.minOrderAmount}`}
                />
                <InfoRow
                  label="Pure Veg Only"
                  value={
                    restaurant.isPureVeg ? (
                      <span className="flex items-center gap-1.5 text-green-700 bg-[#fff2e8] px-2 py-1 rounded-md text-xs font-bold w-fit ml-auto">
                        <CheckCircle2 size={14} strokeWidth={1.5} /> Yes
                      </span>
                    ) : (
                      "No"
                    )
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── Dishes tab ── */}
      {activeTab === "dishes" && (
        <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Menu Items{" "}
              <span className="text-gray-400 text-sm font-medium ml-2">
                ({dishes.length})
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-500">
                <tr className="border-b border-gray-200">
                  {["Dish", "Price", "Type", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-semibold uppercase tracking-wider text-xs"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dishes.map((dish) => (
                  <tr
                    key={dish._id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-[#fff2e8] border border-orange-100 flex items-center justify-center text-[#fc8019]">
                          <Utensils size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-gray-800 text-sm">
                          {dish.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      ${dish.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-md border ${dish.foodType === "veg" ? "bg-[#fff2e8] text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                      >
                        {dish.foodType === "veg" ? "Veg" : "Non-Veg"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`flex items-center gap-1.5 w-fit text-xs font-bold px-3 py-1 rounded-md border ${dish.isAvailable ? "bg-[#fff2e8] text-blue-700 border-blue-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                      >
                        {dish.isAvailable ? (
                          <CheckCircle2 size={12} strokeWidth={1.5} />
                        ) : (
                          <Ban size={12} strokeWidth={1.5} />
                        )}
                        {dish.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    {/* View only — admin does not edit dishes */}
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/dishes/${dish._id}`}
                        className="p-2 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-400 hover:text-[#fc8019] hover:border-blue-400 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                        title="View Dish"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dishes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
                <Utensils
                  size={32}
                  className="text-gray-400"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                No dishes added yet
              </h3>
              <p className="text-sm text-gray-500">
                This restaurant hasn't added any menu items.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Orders tab ── */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Recent Orders{" "}
              <span className="text-gray-400 text-sm font-medium ml-2">
                ({orders.length})
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-500">
                <tr className="border-b border-gray-200">
                  {[
                    "Order ID",
                    "Customer",
                    "Total",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 font-semibold uppercase tracking-wider text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-md">
                        #{order._id.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {order.user}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-md border capitalize ${orderStatusConfig[order.orderStatus]}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-500">
                      {dayjs(order.createdAt).format("MMM D, YYYY")}
                      <p className="text-gray-400 mt-0.5">
                        {dayjs(order.createdAt).format("h:mm A")}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="p-2 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-400 hover:text-[#fc8019] hover:border-blue-400 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                        title="View Order"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center mb-4">
                <ArchiveX size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                No orders yet
              </h3>
              <p className="text-sm text-gray-500">
                This restaurant hasn't received any orders.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRestaurantDetails;
