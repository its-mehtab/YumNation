const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrderDetails.jsx");
let content = fs.readFileSync(filePath, "utf-8");

const oldTimeline = `const TimelineStep = ({ label, icon, done, active, last }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="relative w-full flex items-center">
      <div
        className={\`flex-1 h-0.5 \${done && !active ? "bg-[#fc8019]" : "bg-gray-200"}\`}
        style={{ visibility: label === STATUSES[0] ? "hidden" : "visible" }}
      />
      <div
        className={\`w-9 h-9 rounded-md flex items-center justify-center z-10 border-2 transition-all duration-300 text-sm
        \${
          active
            ? "border-[#fc8019] bg-[#fc8019] text-white scale-110 shadow-lg shadow-orange-200"
            : done
              ? "border-[#fc8019] bg-white text-[#fc8019]"
              : "border-gray-200 bg-white text-gray-300"
        }\`}
      >
        {icon}
      </div>
      <div
        className={\`flex-1 h-0.5 \${done && !last ? "bg-[#fc8019]" : "bg-gray-200"}\`}
        style={{ visibility: last ? "hidden" : "visible" }}
      />
    </div>
    <p
      className={\`text-xs mt-2 font-medium capitalize text-center leading-tight
      \${active ? "text-[#fc8019]" : done ? "text-gray-600" : "text-gray-300"}\`}
    >
      {label}
    </p>
  </div>
);`;

const newTimeline = `const TimelineStep = ({ label, icon, done, active, last }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="relative w-full flex items-center">
      <div
        className={\`flex-1 h-0.5 \${done ? "bg-[#fc8019]" : "bg-gray-200"}\`}
        style={{ visibility: label === STATUSES[0] ? "hidden" : "visible" }}
      />
      <div
        className={\`w-9 h-9 rounded-md flex items-center justify-center z-10 border-2 transition-all duration-300 text-sm
        \${
          done
            ? "border-[#fc8019] bg-[#fc8019] text-white scale-110 shadow-lg shadow-orange-200"
            : "border-gray-200 bg-white text-gray-300"
        }\`}
      >
        {icon}
      </div>
      <div
        className={\`flex-1 h-0.5 \${done && !last ? "bg-[#fc8019]" : "bg-gray-200"}\`}
        style={{ visibility: last ? "hidden" : "visible" }}
      />
    </div>
    <p
      className={\`text-xs mt-2 font-medium capitalize text-center leading-tight
      \${active ? "text-[#fc8019]" : done ? "text-gray-600" : "text-gray-300"}\`}
    >
      {label}
    </p>
  </div>
);`;

content = content.replace(oldTimeline, newTimeline);
fs.writeFileSync(filePath, content);
