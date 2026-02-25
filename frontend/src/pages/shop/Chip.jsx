import React from "react";

const Chip = ({ chipName }) => {
  return (
    <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-sm flex gap-1 items-center text-sm capitalize">
      <svg
        width={12}
        height={12}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      {chipName}
    </span>
  );
};

export default Chip;
