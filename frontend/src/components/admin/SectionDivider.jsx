import React from "react";

const SectionDivider = ({ label }) => {
  return (
    <div className="col-span-2 flex items-center gap-3 pt-2">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
};

export default SectionDivider;
