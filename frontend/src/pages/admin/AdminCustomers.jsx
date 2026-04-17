import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../../context/user/AuthContext";
import { DeleteIcon, ViewIcon } from "../../assets/icon/Icons";
import { useAllUsers } from "../../context/admin/AllUsersContext";

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_CUSTOMERS = [
  {
    _id: "1",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210",
    avatar: null,
    status: "active",
    totalOrders: 24,
    totalSpent: 4820,
    avgOrderValue: 200,
    joinedAt: "2024-03-12",
    lastOrderAt: "2026-04-10",
    address: "12, Park Street, Kolkata, WB 700016",
    recentOrders: [
      {
        _id: "o1",
        total: 340,
        status: "delivered",
        date: "2026-04-10",
        restaurant: "Behrouz Biryani",
      },
      {
        _id: "o2",
        total: 210,
        status: "delivered",
        date: "2026-03-28",
        restaurant: "McDonald's",
      },
      {
        _id: "o3",
        total: 580,
        status: "cancelled",
        date: "2026-03-15",
        restaurant: "Pizza Hut",
      },
    ],
  },
  {
    _id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@outlook.com",
    phone: "+91 87654 32109",
    avatar: null,
    status: "active",
    totalOrders: 11,
    totalSpent: 1960,
    avgOrderValue: 178,
    joinedAt: "2025-01-05",
    lastOrderAt: "2026-04-14",
    address: "45, MG Road, Bangalore, KA 560001",
    recentOrders: [
      {
        _id: "o4",
        total: 195,
        status: "delivered",
        date: "2026-04-14",
        restaurant: "KFC",
      },
      {
        _id: "o5",
        total: 420,
        status: "delivered",
        date: "2026-04-01",
        restaurant: "Barbeque Nation",
      },
    ],
  },
  {
    _id: "3",
    name: "Rohan Das",
    email: "rohan.das@yahoo.com",
    phone: "+91 76543 21098",
    avatar: null,
    status: "blocked",
    totalOrders: 3,
    totalSpent: 540,
    avgOrderValue: 180,
    joinedAt: "2025-08-20",
    lastOrderAt: "2025-12-01",
    address: "7, Salt Lake, Kolkata, WB 700091",
    recentOrders: [
      {
        _id: "o6",
        total: 260,
        status: "delivered",
        date: "2025-12-01",
        restaurant: "Domino's",
      },
    ],
  },
  {
    _id: "4",
    name: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    phone: "+91 65432 10987",
    avatar: null,
    status: "active",
    totalOrders: 38,
    totalSpent: 9240,
    avgOrderValue: 243,
    joinedAt: "2023-11-03",
    lastOrderAt: "2026-04-15",
    address: "22, Anna Nagar, Chennai, TN 600040",
    recentOrders: [
      {
        _id: "o7",
        total: 510,
        status: "delivered",
        date: "2026-04-15",
        restaurant: "Paradise Biryani",
      },
      {
        _id: "o8",
        total: 145,
        status: "delivered",
        date: "2026-04-09",
        restaurant: "Subway",
      },
      {
        _id: "o9",
        total: 890,
        status: "delivered",
        date: "2026-03-30",
        restaurant: "The Bowl Company",
      },
    ],
  },
  {
    _id: "5",
    name: "Kabir Nair",
    email: "kabir.nair@proton.me",
    phone: "+91 54321 09876",
    avatar: null,
    status: "inactive",
    totalOrders: 1,
    totalSpent: 199,
    avgOrderValue: 199,
    joinedAt: "2026-02-14",
    lastOrderAt: "2026-02-14",
    address: "3, Jubilee Hills, Hyderabad, TS 500033",
    recentOrders: [
      {
        _id: "o10",
        total: 199,
        status: "delivered",
        date: "2026-02-14",
        restaurant: "Faasos",
      },
    ],
  },
  {
    _id: "6",
    name: "Meera Pillai",
    email: "meera.pillai@gmail.com",
    phone: "+91 43210 98765",
    avatar: null,
    status: "active",
    totalOrders: 17,
    totalSpent: 3180,
    avgOrderValue: 187,
    joinedAt: "2024-07-19",
    lastOrderAt: "2026-04-12",
    address: "8, Bandra West, Mumbai, MH 400050",
    recentOrders: [
      {
        _id: "o11",
        total: 320,
        status: "delivered",
        date: "2026-04-12",
        restaurant: "Taco Bell",
      },
      {
        _id: "o12",
        total: 450,
        status: "out_for_delivery",
        date: "2026-04-16",
        restaurant: "Social",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const AVATAR_COLORS = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
];

const avatarColor = (id) => AVATAR_COLORS[parseInt(id) % AVATAR_COLORS.length];

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, color, sub }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
    <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold" style={{ color: color || "#1f2937" }}>
      {value}
    </p>
    {sub && <p className="text-[11px] text-gray-400 mt-1">{sub}</p>}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-50 text-green-700 border border-green-100",
    inactive: "bg-gray-100 text-gray-400 border border-gray-200",
    blocked: "bg-red-50 text-red-500 border border-red-100",
  };
  const labels = {
    active: "● Active",
    inactive: "● Inactive",
    blocked: "● Blocked",
  };
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${styles[status] || styles.inactive}`}
    >
      {labels[status] || status}
    </span>
  );
};

const OrderStatusBadge = ({ status }) => {
  const styles = {
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-500",
    out_for_delivery: "bg-blue-50 text-blue-600",
    pending: "bg-yellow-50 text-yellow-600",
  };
  const labels = {
    delivered: "Delivered",
    cancelled: "Cancelled",
    out_for_delivery: "Out for delivery",
    pending: "Pending",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${styles[status] || "bg-gray-100 text-gray-500"}`}
    >
      {labels[status] || status}
    </span>
  );
};

// ─── Customer Detail Modal ────────────────────────────────────────────────────

const CustomerModal = ({ customer, onClose, onToggleStatus, onDelete }) => {
  if (!customer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Customer Profile
            </p>
            <p className="text-base font-bold text-gray-700 mt-0.5">
              {customer.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${avatarColor(customer._id)}`}
            >
              {getInitials(customer.name)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-gray-800">
                  {customer.name}
                </p>
                <StatusBadge status={customer.status} />
              </div>
              <p className="text-xs text-gray-500">{customer.email}</p>
              <p className="text-xs text-gray-500 mt-0.5">{customer.phone}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Delivery Address
            </p>
            <p className="text-xs text-gray-600">{customer.address}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Order Stats
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 rounded-xl p-3 border border-orange-100 text-center">
              <p className="text-xl font-bold text-[#fc8019]">
                {customer.totalOrders}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">Total Orders</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
              <p className="text-xl font-bold text-gray-700">
                ₹{customer.totalSpent.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">Total Spent</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
              <p className="text-xl font-bold text-gray-700">
                ₹{customer.avgOrderValue}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">Avg Order</p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>Joined {dayjs(customer.joinedAt).format("DD MMM YYYY")}</span>
            <span>•</span>
            <span>
              Last order {dayjs(customer.lastOrderAt).format("DD MMM YYYY")}
            </span>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="px-6 py-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Recent Orders
          </p>
          <div className="flex flex-col gap-2">
            {customer.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    {order.restaurant}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {dayjs(order.date).format("DD MMM YYYY")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <OrderStatusBadge status={order.status} />
                  <span className="text-xs font-bold text-gray-700">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => onDelete(customer._id)}
            className="px-4 py-2 text-xs font-semibold text-red-400 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
          >
            Delete Account
          </button>
          <button
            onClick={() => onToggleStatus(customer)}
            className={`px-5 py-2 text-xs font-semibold rounded-xl transition-colors border ${
              customer.status === "blocked"
                ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100"
                : "bg-red-50 text-red-500 border-red-100 hover:bg-red-100"
            }`}
          >
            {customer.status === "blocked"
              ? "Unblock Customer"
              : "Block Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(SEED_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("joinedAt");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { allUsers, fetchAllUsers } = useAllUsers();

  console.log(allUsers);

  // ── Stats ──
  const total = customers.length;
  const active = customers.filter((c) => c.status === "active").length;
  const blocked = customers.filter((c) => c.status === "blocked").length;
  const totalOrders = customers.reduce((s, c) => s + c.totalOrders, 0);

  // ── Filter + Sort ──
  const filtered = customers
    .filter((c) => {
      const q = search.toLowerCase();
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q);
      const matchS = !filterStatus || c.status === filterStatus;
      return matchQ && matchS;
    })
    .sort((a, b) => {
      if (sortBy === "totalSpent") return b.totalSpent - a.totalSpent;
      if (sortBy === "totalOrders") return b.totalOrders - a.totalOrders;
      if (sortBy === "joinedAt")
        return dayjs(b.joinedAt).unix() - dayjs(a.joinedAt).unix();
      if (sortBy === "lastOrderAt")
        return dayjs(b.lastOrderAt).unix() - dayjs(a.lastOrderAt).unix();
      return 0;
    });

  // ── Actions ──
  const handleToggleStatus = (customer) => {
    const next =
      customer.status === "blocked"
        ? "active"
        : customer.status === "active"
          ? "blocked"
          : "active";

    setCustomers((prev) =>
      prev.map((c) => (c._id === customer._id ? { ...c, status: next } : c)),
    );
    setSelectedCustomer((prev) =>
      prev?._id === customer._id ? { ...prev, status: next } : prev,
    );
  };

  const handleDelete = (id) => {
    if (!confirm("Permanently delete this customer?")) return;
    setCustomers((prev) => prev.filter((c) => c._id !== id));
    setSelectedCustomer(null);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Customers</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            View and manage your customer accounts
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total customers" value={total} />
        <StatCard label="Active" value={active} color="#3b6d11" />
        <StatCard label="Blocked" value={blocked} color="#ef4444" />
        <StatCard label="Total orders" value={totalOrders} color="#fc8019" />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-700">All Customers</h2>
        <div className="flex items-center gap-3">
          <input
            placeholder="Search name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#fc8019] bg-white"
          >
            <option value="joinedAt">Newest first</option>
            <option value="lastOrderAt">Recent order</option>
            <option value="totalSpent">Highest spent</option>
            <option value="totalOrders">Most orders</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "Customer",
                "Contact",
                "Orders",
                "Total Spent",
                "Last Order",
                "Joined",
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
                  No customers found
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-orange-50/30 transition-colors"
                >
                  {/* Customer */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(c._id)}`}
                      >
                        {getInitials(c.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 text-[13px]">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {c._id.padStart(6, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3.5">
                    <p className="text-[12px] text-gray-600">{c.email}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {c.phone}
                    </p>
                  </td>

                  {/* Orders */}
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-700">
                      {c.totalOrders}
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-gray-700">
                      ₹{c.totalSpent.toLocaleString()}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      avg ₹{c.avgOrderValue}
                    </p>
                  </td>

                  {/* Last Order */}
                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(c.lastOrderAt).format("DD MMM YYYY")}
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-3.5 text-[12px] text-gray-400">
                    {dayjs(c.joinedAt).format("DD MMM YYYY")}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <button onClick={() => handleToggleStatus(c)}>
                      <StatusBadge status={c.status} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                      >
                        <ViewIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
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

      {/* ── Detail Modal ── */}
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminCustomers;
