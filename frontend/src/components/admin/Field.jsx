import React from "react";

const Field = ({ label, children, full }) => (
  <div className={`flex flex-col gap-1.5 ${full ? "col-span-2" : ""}`}>
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {children}
  </div>
);

export default Field;
