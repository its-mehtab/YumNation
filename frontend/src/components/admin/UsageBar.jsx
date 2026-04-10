import React from "react";

const UsageBar = ({ uses, maxUses }) => {
  const pct = maxUses ? Math.min(100, Math.round((uses / maxUses) * 100)) : 50;
  return (
    <div>
      <span className="text-xs text-gray-600">
        {uses} / {maxUses ?? "∞"}
      </span>
      <div className="mt-1 h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#fc8019] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default UsageBar;
