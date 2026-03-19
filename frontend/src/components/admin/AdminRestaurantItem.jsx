import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRestaurants } from "../../context/admin/RestaurantsContext";
import { Link } from "react-router-dom";
import { DeleteIcon, ViewIcon } from "../../assets/icon/Icons";
import { notifyError, notifySuccess } from "../../utils/toast";
import ConfirmationModal from "../common/ConfirmationModal";

const statusConfig = {
  active: { label: "Active", bg: "bg-green-50", text: "text-green-600" },
  pending: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-600" },
  rejected: { label: "Rejected", bg: "bg-red-50", text: "text-red-400" },
  suspended: { label: "Suspended", bg: "bg-gray-100", text: "text-gray-500" },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
};

const StarRating = ({ rating }) =>
  rating > 0 ? (
    <div className="flex items-center gap-1">
      <span className="text-yellow-400 text-xs">★</span>
      <span className="text-xs font-semibold text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  ) : (
    <span className="text-xs text-gray-300">—</span>
  );

const AdminRestaurantItem = ({ r, setRejectTarget, updateStatus }) => {
  const [restaurantDishes, setRestaurantDishes] = useState(null);

  const { restaurants, setRestaurants } = useRestaurants();
  const { serverURL } = useAuth();

  const fetchRestaurantDishes = async () => {
    try {
      const { data } = await axios.get(
        `${serverURL}/api/admin/dish?restaurantId=${r._id}`,
        {
          withCredentials: true,
        },
      );

      setRestaurantDishes(data);
    } catch (error) {
      console.log(
        "Restaurant Dishes Error:",
        error?.response?.data || error.message,
      );
    }
  };

  const handleApprove = async (id) => {
    updateStatus(id, "active");

    try {
      await axios.patch(
        `${serverURL}/api/admin/restaurant/${id}`,
        { status: "active" },
        { withCredentials: true },
      );

      notifySuccess(`${r.name} is active now`);
    } catch (error) {
      setRestaurants(restaurants);
      notifyError(error?.response?.data || `${r.name} cannot be activated`);
      console.log("Approve Error:", error?.response?.data || error.message);
    }
  };

  const handleSuspend = async (id) => {
    try {
      await axios.patch(
        `${serverURL}/api/admin/restaurant/${id}`,
        { status: "suspended" },
        { withCredentials: true },
      );
      updateStatus(id, "suspended");
      notifySuccess(`${r.name} is suspended`);
    } catch (error) {
      notifyError(error?.response?.data || `${r.name} cannot be suspended`);
      console.log("Suspend Error:", error?.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverURL}/api/admin/restaurant/${id}`, {
        withCredentials: true,
      });

      setRestaurants((prev) => prev.filter((r) => r._id !== id));
      notifySuccess(`${r.name} is Deleted`);
    } catch (error) {
      notifyError(error?.response?.data || `${r.name} cannot be Deleted`);
      console.log("Delete Error:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRestaurantDishes();
  }, []);

  return (
    <tr key={r._id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg">
            🏪
          </div>
          <p className="font-semibold text-gray-700">{r.name}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="font-medium text-gray-700 text-xs">{r.owner.firstName}</p>
        <p className="text-xs text-gray-400 mt-0.5">{r.email}</p>
      </td>
      <td className="px-4 py-4 text-gray-500 text-xs">📍 {r.address.city}</td>
      <td className="px-4 py-4 text-gray-700 font-medium">
        {restaurantDishes?.length || "—"}
      </td>
      <td className="px-4 py-4 text-gray-700 font-medium">
        {r.totalOrders > 0 ? r.totalOrders.toLocaleString() : "—"}
      </td>
      <td className="px-4 py-4 font-semibold text-[#fc8019]">
        {r.revenue > 0 ? `$${r.revenue.toLocaleString()}` : "—"}
      </td>
      <td className="px-4 py-4">
        <StarRating rating={r.rating} />
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={r.status} />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Pending actions */}
          {r.status === "pending" && (
            <>
              <button
                onClick={() => handleApprove(r._id)}
                className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => setRejectTarget(r)}
                className="px-2.5 py-1 rounded-lg bg-red-50 text-red-400 text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                ✕ Reject
              </button>
            </>
          )}
          {/* Active actions */}
          {r.status === "active" && (
            <ConfirmationModal
              onClick={async () => await handleSuspend(r._id)}
              heading={"Suspend Restaurant"}
              description={
                <>
                  Are you sure you want to suspend{" "}
                  <span className="text-gray-600 font-semibold">{r.name}</span>{" "}
                  ? They will lose access to their dashboard and customers won't
                  be able to order from them.
                </>
              }
              button={
                <button className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-semibold hover:bg-gray-200 transition-colors">
                  Suspend
                </button>
              }
            />
          )}
          {(r.status === "suspended" || r.status === "rejected") && (
            <button
              onClick={() => handleApprove(r._id)}
              className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
            >
              Reinstate
            </button>
          )}
          {/* View */}
          <Link
            to={`/admin/restaurants/${r._id}`}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <ViewIcon />
          </Link>
          {/* Delete */}
          <ConfirmationModal
            onClick={async () => await handleDelete(r._id)}
            heading={"Delete Restaurant"}
            description={
              <>
                This will permanently delete{" "}
                <span className="text-gray-600 font-semibold">{r.name}</span>{" "}
                and all its dishes, orders, and data. This action{" "}
                <span className="text-gray-600 font-semibold">
                  cannot be undone
                </span>
                .
              </>
            }
            button={
              <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                <DeleteIcon />
              </button>
            }
          />
        </div>
      </td>
    </tr>
  );
};

export default AdminRestaurantItem;
