import React from "react";

const StatusBadge = ({ isAvailable }) => (
  <span
    className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-md border ${
      isAvailable
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-gray-100 text-gray-500 border-gray-200"
    }`}
  >
    {isAvailable ? "Published" : "Draft"}
  </span>
);

export default StatusBadge;
