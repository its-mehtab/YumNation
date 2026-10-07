const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "components", "owner", "RestaurantSidebar.jsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(
  'import { RestaurantIcon } from "../../assets/icon/Icons";',
  'import { LayoutDashboard, ShoppingBag, Utensils, Settings } from "lucide-react";'
);

content = content.replace(
  /<RestaurantIcon size=\{20\} className=\{isActive \? "text-white" : "text-gray-400"\} \/>\s*Dashboard/g,
  '<LayoutDashboard size={20} className={isActive ? "text-white" : "text-gray-400"} />\n                  Dashboard'
);
content = content.replace(
  /<RestaurantIcon size=\{20\} className=\{isActive \? "text-white" : "text-gray-400"\} \/>\s*Orders/g,
  '<ShoppingBag size={20} className={isActive ? "text-white" : "text-gray-400"} />\n                  Orders'
);
content = content.replace(
  /<RestaurantIcon size=\{20\} className=\{isActive \? "text-white" : "text-gray-400"\} \/>\s*My Menu/g,
  '<Utensils size={20} className={isActive ? "text-white" : "text-gray-400"} />\n                  My Menu'
);
content = content.replace(
  /<RestaurantIcon size=\{20\} className=\{isActive \? "text-white" : "text-gray-400"\} \/>\s*Settings/g,
  '<Settings size={20} className={isActive ? "text-white" : "text-gray-400"} />\n                  Settings'
);

fs.writeFileSync(filePath, content);
