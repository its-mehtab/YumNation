import React from "react";

const VegBadge = ({ isNonVeg }) => {
  return (
    <div
      className={`w-4.5 h-4.5 rounded-sm flex items-center justify-center shrink-0 border-[1.5px] ${
        isNonVeg ? "border-orange-500" : "border-green-600"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isNonVeg ? "bg-orange-500" : "bg-green-600"
        }`}
      />
    </div>
  );
};

export default VegBadge;
