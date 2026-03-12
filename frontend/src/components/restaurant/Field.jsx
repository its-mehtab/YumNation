import React from "react";

const Field = ({ label, hint, required, children }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
};

export default Field;
