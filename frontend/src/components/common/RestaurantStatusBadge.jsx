import React from "react";
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

const RestaurantStatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`text-xs font-bold px-3 py-1.5 rounded-md border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
};

export default RestaurantStatusBadge;
