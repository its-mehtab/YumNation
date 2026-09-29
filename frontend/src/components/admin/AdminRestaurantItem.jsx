import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/user/AuthContext";
import { useRestaurants } from "../../context/admin/RestaurantsContext";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/toast";
import ConfirmationModal from "../common/ConfirmationModal";
import {
  Store,
  MapPin,
  Star,
  Eye,
  Trash2,
  Check,
  X,
  ShieldAlert,
} from "lucide-react";

const statusConfig = {
  active: {
    label: "Active",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  pending: {
    label: "Pending",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  suspended: {
    label: "Suspended",
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
};

const StarRating = ({ rating }) =>
  rating > 0 ? (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-lg w-fit border border-yellow-100">
      <Star size={14} className="fill-yellow-400 stroke-yellow-500" />
      <span className="text-xs font-bold">{rating.toFixed(1)}</span>
    </div>
  ) : (
    <span className="text-xs font-medium text-gray-400">—</span>
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
    <tr key={r._id} className="hover:bg-gray-50/80 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#fc8019]">
            <Store size={20} />
          </div>
          <p className="font-bold text-gray-800">{r.name}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <p className="font-bold text-gray-700 text-sm">{r.owner.firstName}</p>
        <p className="text-xs text-gray-500 mt-0.5">{r.email}</p>
      </td>
      <td className="px-4 py-4 text-gray-600 text-xs">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-gray-400" />
          {r.address.city}
        </div>
      </td>
      <td className="px-4 py-4 text-gray-600 font-medium">
        {restaurantDishes?.length || "—"}
      </td>
      <td className="px-4 py-4 text-gray-600 font-medium">
        {r.totalOrders > 0 ? r.totalOrders.toLocaleString() : "—"}
      </td>
      <td className="px-4 py-4 font-bold text-[#fc8019]">
        {r.revenue > 0 ? `$${r.revenue.toLocaleString()}` : "—"}
      </td>
      <td className="px-4 py-4">
        <StarRating rating={r.rating} />
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={r.status} />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5 flex-wrap justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Pending actions */}
          {r.status === "pending" && (
            <>
              <button
                onClick={() => handleApprove(r._id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 hover:shadow-sm border border-green-200 transition-all"
              >
                <Check size={14} strokeWidth={3} /> Approve
              </button>
              <button
                onClick={() => setRejectTarget(r)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 hover:shadow-sm border border-red-200 transition-all"
              >
                <X size={14} strokeWidth={3} /> Reject
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
                  <span className="text-gray-800 font-bold">{r.name}</span> ?
                  They will lose access to their dashboard and customers won't
                  be able to order from them.
                </>
              }
              button={
                <button
                  className="flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-yellow-600 hover:border-yellow-400 shadow-sm transition-all"
                  title="Suspend"
                >
                  <ShieldAlert size={16} />
                </button>
              }
            />
          )}
          {(r.status === "suspended" || r.status === "rejected") && (
            <button
              onClick={() => handleApprove(r._id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 hover:shadow-sm border border-green-200 transition-all"
            >
              Reinstate
            </button>
          )}
          {/* View */}
          <Link
            to={`/admin/restaurants/${r._id}`}
            className="flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-400 shadow-sm transition-all"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          {/* Delete */}
          <ConfirmationModal
            onClick={async () => await handleDelete(r._id)}
            heading={"Delete Restaurant"}
            description={
              <>
                This will permanently delete{" "}
                <span className="text-gray-800 font-bold">{r.name}</span> and
                all its dishes, orders, and data. This action{" "}
                <span className="text-gray-800 font-bold">
                  cannot be undone
                </span>
                .
              </>
            }
            button={
              <button
                className="flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-400 shadow-sm transition-all"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            }
          />
        </div>
      </td>
    </tr>
  );
};

export default AdminRestaurantItem;
