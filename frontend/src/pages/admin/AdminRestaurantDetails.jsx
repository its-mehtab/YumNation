import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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
  openingHours: { open: 600, close: 1380 }, // minutes since midnight
  isOpen: true,
  status: "active", // active | pending | rejected | suspended
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
  active: { label: "Approved ✅", bg: "bg-green-50", text: "text-green-600" },
  pending: {
    label: "Pending Review ⏳",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
  },
  rejected: { label: "Rejected ❌", bg: "bg-red-50", text: "text-red-400" },
  suspended: {
    label: "Suspended 🚫",
    bg: "bg-gray-100",
    text: "text-gray-500",
  },
};

const orderStatusConfig = {
  placed: "bg-indigo-50 text-indigo-500",
  confirmed: "bg-yellow-50 text-yellow-500",
  preparing: "bg-orange-50 text-[#fc8019]",
  "out for delivery": "bg-blue-50 text-blue-500",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-400",
};

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
    {(title || action) && (
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {title}
          </p>
        )}
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-700 font-semibold text-right max-w-48">
      {value}
    </span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminRestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Replace with: axios.get(`${serverURL}/api/admin/restaurant/${id}`, { withCredentials: true })
    setTimeout(() => {
      setRestaurant(mockRestaurant);
      setDishes(mockDishes);
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleToggleOpen = () =>
    setRestaurant((prev) => ({ ...prev, isOpen: !prev.isOpen }));

  const handleStatusChange = (e) =>
    setRestaurant((prev) => ({ ...prev, status: e.target.value }));
  // Replace with: axios.put(`${serverURL}/api/admin/restaurant/${id}/status`, { status: e.target.value }, { withCredentials: true })

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
    );

  const tabs = ["overview", "dishes", "orders"];
  const statusMeta = statusConfig[restaurant.status] || statusConfig.pending;

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/restaurants")}
            className="text-sm text-gray-400 hover:text-[#fc8019] transition-colors font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-700">
            Restaurant Details
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/admin/restaurants"
            className="hover:text-[#fc8019] transition-colors"
          >
            Restaurants
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">{restaurant.name}</span>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden mb-5">
        {/* Cover */}
        <div className="h-36 bg-gradient-to-r from-orange-100 to-orange-50 relative">
          {restaurant.coverImage && (
            <img
              src={restaurant.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <Link
            to={`/admin/restaurants/edit/${restaurant._id}`}
            className="absolute top-3 right-3 flex items-center gap-1.5 bg-white text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg
              width="12"
              height="12"
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
            Edit
          </Link>
        </div>

        {/* Info row */}
        <div className="px-6 pb-5 pt-3 flex items-end justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl bg-orange-50 border-2 border-white shadow-md flex items-center justify-center text-3xl -mt-8 overflow-hidden">
              {restaurant.logo ? (
                <img
                  src={restaurant.logo}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                "🍽️"
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-gray-700">
                  {restaurant.name}
                </h2>
                {restaurant.isPureVeg && (
                  <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full">
                    Pure Veg
                  </span>
                )}
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusMeta.bg} ${statusMeta.text}`}
                >
                  {statusMeta.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                📍 {restaurant.address.city}, {restaurant.address.state}
                &nbsp;·&nbsp; ⏱ {restaurant.deliveryTime} min &nbsp;·&nbsp; ⭐{" "}
                {restaurant.rating} ({restaurant.totalReviews} reviews)
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Open today toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                Open Today
              </span>
              <Toggle checked={restaurant.isOpen} onChange={handleToggleOpen} />
            </div>
            {/* Status updater */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 font-medium">
                Application Status
              </span>
              <select
                value={restaurant.status}
                onChange={handleStatusChange}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white cursor-pointer"
              >
                <option value="pending">⏳ Pending</option>
                <option value="active">✅ Active</option>
                <option value="rejected">❌ Rejected</option>
                <option value="suspended">🚫 Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          {
            label: "Total Orders",
            value: restaurant.totalOrders.toLocaleString(),
            emoji: "📦",
          },
          { label: "Total Dishes", value: dishes.length, emoji: "🍽️" },
          { label: "Rating", value: `${restaurant.rating} / 5`, emoji: "⭐" },
          {
            label: "Min Order",
            value: `$${restaurant.minOrderAmount}`,
            emoji: "💵",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] border-l-4 border-l-[#fc8019] px-5 py-4 flex items-center justify-between"
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

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all
              ${activeTab === tab ? "bg-white text-[#fc8019] shadow-sm" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Overview tab ── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-7 space-y-5">
            <Card title="About">
              <p className="text-sm text-gray-500 leading-relaxed">
                {restaurant.description || "No description added."}
              </p>
            </Card>

            <Card title="Address">
              <InfoRow
                label="Street"
                value={`${restaurant.address.addressLine1}${restaurant.address.addressLine2 ? `, ${restaurant.address.addressLine2}` : ""}`}
              />
              <InfoRow label="City" value={restaurant.address.city} />
              <InfoRow label="State" value={restaurant.address.state} />
              <InfoRow label="Pin Code" value={restaurant.address.pinCode} />
            </Card>

            <Card title="Opening Hours">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Mon – Sun</p>
                <p className="text-sm font-bold text-gray-700">
                  {toTimeString(restaurant.openingHours.open)} –{" "}
                  {toTimeString(restaurant.openingHours.close)}
                </p>
              </div>
            </Card>
          </div>

          <div className="col-span-5 space-y-5">
            <Card title="Owner">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-base font-bold text-[#fc8019]">
                  {restaurant.owner.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {restaurant.owner.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {restaurant.owner.email}
                  </p>
                </div>
              </div>
              <InfoRow label="Phone" value={restaurant.owner.phone} />
              <Link
                to={`/admin/customers/${restaurant.owner._id}`}
                className="mt-3 block text-center text-xs font-semibold text-[#fc8019] border border-orange-200 rounded-lg py-2 hover:bg-orange-50 transition-colors"
              >
                View Profile →
              </Link>
            </Card>

            <Card title="Contact">
              <InfoRow label="Email" value={restaurant.email} />
              <InfoRow label="Phone" value={restaurant.phone} />
            </Card>

            <Card title="Delivery Settings">
              <InfoRow
                label="Delivery Fee"
                value={`$${restaurant.deliveryFee}`}
              />
              <InfoRow
                label="Delivery Time"
                value={`${restaurant.deliveryTime} min`}
              />
              <InfoRow
                label="Min Order"
                value={`$${restaurant.minOrderAmount}`}
              />
              <InfoRow
                label="Pure Veg"
                value={restaurant.isPureVeg ? "Yes ✅" : "No"}
              />
            </Card>

            <Card title="Meta">
              <InfoRow
                label="Joined"
                value={dayjs(restaurant.createdAt).format("MMM D, YYYY")}
              />
              <InfoRow label="Status" value={statusMeta.label} />
              <InfoRow
                label="Open Today"
                value={restaurant.isOpen ? "Open 🟢" : "Closed 🔴"}
              />
              <InfoRow
                label="Slug"
                value={
                  <span className="font-mono text-xs">{restaurant.slug}</span>
                }
              />
            </Card>
          </div>
        </div>
      )}

      {/* ── Dishes tab ── */}
      {activeTab === "dishes" && (
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Dishes ({dishes.length})
            </p>
            <Link
              to={`/admin/dishes/add?restaurant=${restaurant._id}`}
              className="flex items-center gap-1.5 bg-[#fc8019] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#e5721f] transition-colors"
            >
              + Add Dish
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Dish", "Price", "Stock", "Type", "Status", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-base">
                        🍽️
                      </div>
                      <span className="font-medium text-gray-700 text-sm">
                        {dish.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-700">
                    ${dish.price}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{dish.stock}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dish.foodType === "veg" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"}`}
                    >
                      {dish.foodType}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dish.isAvailable ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}
                    >
                      {dish.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/admin/dishes/edit/${dish._id}`}
                      className="text-xs text-[#fc8019] font-semibold hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dishes.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="text-sm font-medium">No dishes added yet</p>
            </div>
          )}
        </div>
      )}

      {/* ── Orders tab ── */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Recent Orders ({orders.length})
            </p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Order ID", "Customer", "Total", "Status", "Date", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-500">
                    #{order._id.toUpperCase()}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">
                    {order.user}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#fc8019]">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${orderStatusConfig[order.orderStatus]}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-xs text-[#fc8019] font-semibold hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">📭</div>
              <p className="text-sm font-medium">No orders yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRestaurantDetails;
