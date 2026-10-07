import React from "react";
import { ClipboardList, CheckCircle, ChefHat, Bike, PartyPopper } from "lucide-react";

// ── Status config ────────────────────────────────────────────────────────────
const STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "out for delivery",
  "delivered",
];

const ICONS = [
  <ClipboardList size={18} />,
  <CheckCircle size={18} strokeWidth={1.5} />,
  <ChefHat size={18} />,
  <Bike size={18} />,
  <PartyPopper size={18} />,
];

const TimelineStep = ({ label, icon, done, active, last }) => (
  <div className="flex flex-col items-center flex-1">
    {/* {console.log(last)} */}
    <div className="relative w-full flex items-center">
      <div
        className={`flex-1 h-0.5 ${done ? "bg-[#fc8019]" : "bg-gray-200"}`}
        style={{ visibility: label === STATUSES[0] ? "hidden" : "visible" }}
      />
      <div
        className={`w-9 h-9 rounded-md flex items-center justify-center z-10 border-2 transition-all duration-300 text-sm
        ${
          done
            ? "border-[#fc8019] bg-[#fc8019] text-white scale-110 shadow-lg shadow-orange-200"
            : "border-gray-200 bg-white text-gray-300"
        }`}
      >
        {icon}
      </div>
      <div
        className={`flex-1 h-0.5 ${done && !last ? "bg-[#fc8019]" : "bg-gray-200"}`}
        style={{ visibility: last ? "hidden" : "visible" }}
      />
    </div>
    <p
      className={`text-xs mt-2 font-medium capitalize text-center leading-tight
      ${active ? "text-[#fc8019]" : done ? "text-gray-600" : "text-gray-300"}`}
    >
      {label}
    </p>
  </div>
);

export default TimelineStep;
