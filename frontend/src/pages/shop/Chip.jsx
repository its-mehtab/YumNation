import React from "react";

const Chip = ({ chipName }) => {
  return (
    <span className="px-3 py-2 bg-gray-200 flex gap-1.5 items-center text-md capitalize">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4"
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
