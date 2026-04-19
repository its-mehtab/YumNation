import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";

// ─── Mock Data (replace with API fetch by id) ─────────────────────────────────

const MOCK_CUSTOMER = {
  _id: "1",
  name: "Arjun Mehta",
  email: "arjun.mehta@gmail.com",
  phone: "+91 98765 43210",
  status: "active",
  joinedAt: "2024-03-12",
  lastOrderAt: "2026-04-10",
  totalOrders: 24,
  totalSpent: 4820,
  avgOrderValue: 200,
  addresses: [
    {
      _id: "a1",
      label: "Home",
      address: "12, Park Street, Kolkata, WB 700016",
      isDefault: true,
    },
    {
      _id: "a2",
      label: "Office",
      address: "45, Sector V, Salt Lake, Kolkata, WB 700091",
      isDefault: false,
    },
  ],
  orders: [
    {
      _id: "ORD-001",
      restaurant: "Behrouz Biryani",
      items: 3,
      total: 340,
      status: "delivered",
      date: "2026-04-10",
      paymentMethod: "UPI",
      coupon: "SAVE99",
    },
    {
      _id: "ORD-002",
      restaurant: "McDonald's",
      items: 2,
      total: 210,
      status: "delivered",
      date: "2026-03-28",
      paymentMethod: "Card",
      coupon: null,
    },
    {
      _id: "ORD-003",
      restaurant: "Pizza Hut",
      items: 4,
      total: 580,
      status: "cancelled",
      date: "2026-03-15",
      paymentMethod: "UPI",
      coupon: null,
    },
    {
      _id: "ORD-004",
      restaurant: "KFC",
      items: 1,
      total: 195,
      status: "delivered",
      date: "2026-03-01",
      paymentMethod: "COD",
      coupon: "FEAST20",
    },
    {
      _id: "ORD-005",
      restaurant: "Domino's",
      items: 2,
      total: 420,
      status: "delivered",
      date: "2026-02-18",
      paymentMethod: "UPI",
      coupon: null,
    },
    {
      _id: "ORD-006",
      restaurant: "Barbeque Nation",
      items: 5,
      total: 890,
      status: "delivered",
      date: "2026-02-05",
      paymentMethod: "Card",
      coupon: "WELCOME50",
    },
    {
      _id: "ORD-007",
      restaurant: "Subway",
      items: 1,
      total: 145,
      status: "delivered",
      date: "2026-01-22",
      paymentMethod: "UPI",
      coupon: null,
    },
    {
      _id: "ORD-008",
      restaurant: "The Bowl Company",
      items: 2,
      total: 310,
      status: "cancelled",
      date: "2026-01-10",
      paymentMethod: "Card",
      coupon: null,
    },
  ],
  couponsUsed: ["SAVE99", "FEAST20", "WELCOME50"],
  favouriteRestaurant: "Behrouz Biryani",
  deviceInfo: "Android 13 · Samsung Galaxy S23",
};

// ─── Small reusable pieces ────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    active: "bg-green-50 text-green-700 border-green-100",
    inactive: "bg-gray-100 text-gray-400 border-gray-200",
    blocked: "bg-red-50 text-red-500 border-red-100",
    delivered: "bg-green-50 text-green-700 border-green-100",
    cancelled: "bg-red-50 text-red-500 border-red-100",
    out_for_delivery: "bg-blue-50 text-blue-600 border-blue-100",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
  };
  const label = {
    active: "● Active",
    inactive: "● Inactive",
    blocked: "● Blocked",
    delivered: "Delivered",
    cancelled: "Cancelled",
    out_for_delivery: "Out for Delivery",
    pending: "Pending",
  };
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${map[status] || "bg-gray-100 text-gray-400 border-gray-200"}`}
    >
      {label[status] || status}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-xs text-gray-400 font-medium w-32 shrink-0">
      {label}
    </span>
    <span className="text-xs text-gray-700 font-semibold text-right">
      {value}
    </span>
  </div>
);

const StatBox = ({ label, value, color, small }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-1">
    <p className="text-[11px] text-gray-400 font-medium">{label}</p>
    <p
      className={`font-bold ${small ? "text-lg" : "text-2xl"}`}
      style={{ color: color || "#1f2937" }}
    >
      {value}
    </p>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
      {title}
    </span>
    <div className="flex-1 h-px bg-gray-100" />
  </div>
);

// ─── Order Row ────────────────────────────────────────────────────────────────

const OrderRow = ({ order }) => (
  <tr className="hover:bg-orange-50/20 transition-colors">
    <td className="px-4 py-3">
      <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-lg">
        {order._id}
      </span>
    </td>
    <td className="px-4 py-3">
      <p className="text-[13px] font-semibold text-gray-700">
        {order.restaurantSnapshot.name}
      </p>
      <p className="text-[11px] text-gray-400 mt-0.5">
        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
      </p>
    </td>
    <td className="px-4 py-3 text-[12px] text-gray-500">
      {dayjs(order.createdAt).format("DD MMM YYYY")}
    </td>
    <td className="px-4 py-3">
      <StatusBadge status={order.orderStatus} />
    </td>
    <td className="px-4 py-3 text-[12px] text-gray-500 uppercase">
      {order.paymentMethod}
    </td>
    <td className="px-4 py-3">
      {order.couponCode ? (
        <span className="font-mono text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg border border-gray-200">
          {order.couponCode}
        </span>
      ) : (
        <span className="text-[11px] text-gray-300">—</span>
      )}
    </td>
    <td className="px-4 py-3 text-right">
      <span className="text-[13px] font-bold text-gray-700">
        ${order.totalAmount.toLocaleString()}
      </span>
    </td>
  </tr>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { serverURL } = useAuth();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/admin/user/${id}`, {
        withCredentials: true,
      });

      console.log(data);

      setCustomer(data);
    } catch (error) {
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  // const customer = MOCK_CUSTOMER;

  const [status, setStatus] = useState(customer?.status);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("");

  if (loading) return "loading...";

  const deliveredOrders = customer?.orders.items.filter(
    (o) => o.status === "delivered",
  );
  const cancelledOrders = customer?.orders.items.filter(
    (o) => o.status === "cancelled",
  );
  const cancelRate = customer?.orders.items.length
    ? Math.round((cancelledOrders.length / customer?.orders.items.length) * 100)
    : 0;

  const filteredOrders = customer?.orders.items.filter((o) => {
    const q = orderSearch.toLowerCase();
    const matchQ =
      !q ||
      o._id.toLowerCase().includes(q) ||
      o.restaurant.toLowerCase().includes(q);
    const matchF = !orderFilter || o.status === orderFilter;
    return matchQ && matchF;
  });

  const handleToggleStatus = () => {
    const next = status === "blocked" ? "active" : "blocked";
    setStatus(next);
    // await axios.patch(`/api/customers/${customer?._id}`, { status: next });
  };

  return (
    <div className="max-w-6xl">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
        <button
          onClick={() => navigate("/admin/customers")}
          className="hover:text-[#fc8019] transition-colors font-medium"
        >
          Customers
        </button>
        <span>/</span>
        <span className="text-gray-600 font-semibold capitalize">
          {customer?.firstName} {customer?.lastName}
        </span>
      </div>

      {/* ── Top Header Card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-[#fc8019] text-xl font-bold">
            {customer?.firstName.slice(0, 1).toUpperCase()}
            {customer?.lastName.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-lg font-bold text-gray-800 capitalize">
                {customer?.firstName} {customer?.lastName}
              </h1>
              <StatusBadge status={customer?.status} />
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{customer?.email}</span>
              <span>•</span>
              {/* <span>{customer?.phone}</span>
              <span>•</span> */}
              <span>
                Joined {dayjs(customer?.joinedAt).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              status === "blocked"
                ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100"
                : "bg-red-50 text-red-500 border-red-100 hover:bg-red-100"
            }`}
          >
            {status === "blocked" ? "Unblock" : "Block Customer"}
          </button>
          {/* <button className="px-4 py-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Send Message
          </button> */}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        <StatBox
          label="Total Orders"
          value={customer?.totalOrders}
          color="#fc8019"
        />
        <StatBox
          label="Total Spent"
          value={`$${customer?.totalSpent.toLocaleString()}`}
          color="#1f2937"
        />
        <StatBox
          label="Avg Order Value"
          value={`$${(customer?.totalSpent / customer?.totalOrders).toLocaleString()}`}
        />
        <StatBox
          label="Cancelled Orders"
          value={cancelledOrders?.length}
          color="#ef4444"
        />
        <StatBox
          label="Cancellation Rate"
          value={`${cancelRate}%`}
          color={cancelRate > 20 ? "#ef4444" : "#3b6d11"}
        />
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Left — Profile Info */}
        <div className="col-span-1 flex flex-col gap-5">
          {/* Account Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <SectionHeader title="Account Info" />
            <InfoRow
              label="Customer ID"
              value={`#${customer?._id.padStart(6, "0")}`}
            />
            <InfoRow label="Email" value={customer?.email} />
            {/* <InfoRow label="Phone" value={customer?.phone} /> */}
            <InfoRow
              label="Status"
              value={<StatusBadge status={customer?.status} />}
            />
            <InfoRow
              label="Joined"
              value={dayjs(customer?.createdAt).format("DD MMM YYYY")}
            />
            <InfoRow
              label="Last Order"
              value={dayjs(customer?.lastOrderAt).format("DD MMM YYYY")}
            />
            {/* <InfoRow label="Device" value={customer?.deviceInfo} /> */}
          </div>

          {/* Delivery Addresses */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <SectionHeader title="Saved Addresses" />
            <div className="flex flex-col gap-2">
              {customer?.addresses.length === 0 ? (
                <p className="text-xs text-gray-400">No address added yet</p>
              ) : (
                customer?.addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`p-3 rounded-xl border text-xs ${
                      addr.isDefault
                        ? "bg-orange-50 border-orange-100"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-bold text-[10px] uppercase tracking-wider ${addr.isDefault ? "text-[#fc8019]" : "text-gray-400"}`}
                      >
                        {addr.addressType}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-semibold text-[#fc8019]">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {addr.addressLine1}, {addr.addressLine2}, {addr.pinCode},
                      <br />
                      {addr.city}, {addr.state}, {addr.country}, {addr.pinCode}
                    </p>
                  </div>
                ))
              )}
              {/* {customer?.addresses.length > 0 &&
                } */}
            </div>
          </div>

          {/* Coupons Used */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <SectionHeader title="Coupons Used" />
            {customer?.couponsUsed?.length === 0 ? (
              <p className="text-xs text-gray-400">No coupons used yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {customer?.couponsUsed?.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-lg"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — Order History */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Order History
                </p>
                <p className="text-sm font-bold text-gray-700 mt-0.5">
                  {customer?.totalOrders} orders · {deliveredOrders?.length}{" "}
                  delivered
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search orders..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-[#fc8019] transition-colors w-40"
                />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-[#fc8019] bg-white"
                >
                  <option value="">All</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Order ID",
                    "Restaurant",
                    "Date",
                    "Status",
                    "Payment",
                    "Coupon",
                    "Total",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 ${h === "Total" ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-sm text-gray-400"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders?.map((order) => (
                    <OrderRow key={order._id} order={order} />
                  ))
                )}
              </tbody>

              {/* Footer summary */}
              {filteredOrders?.length > 0 && (
                <tfoot>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td
                      colSpan={6}
                      className="px-4 py-3 text-xs font-semibold text-gray-400"
                    >
                      {filteredOrders.length} order
                      {filteredOrders.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-700">
                      $
                      {filteredOrders
                        .reduce((s, o) => s + o.totalAmount, 0)
                        .toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-2xl border border-red-100 p-5">
        <SectionHeader title="Danger Zone" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Delete this account
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Permanently removes the customer and all their data. This cannot
              be undone.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Permanently delete this customer?")) {
                // await axios.delete(`/api/customers/${customer?._id}`);
                // navigate("/admin/customers");
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors shrink-0"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetails;
