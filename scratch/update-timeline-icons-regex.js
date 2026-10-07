const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "context", "public", "TimelineStep.jsx");
let content = fs.readFileSync(filePath, "utf-8");

// replace imports
content = content.replace(
  /import\s*\{\s*ConfirmedIcon,\s*DeliveredIcon,\s*DeliveryIcon,\s*PlacedIcon,\s*PreparingIcon,?\s*\}\s*from\s*"[^"]+";/,
  'import { ClipboardList, CheckCircle, ChefHat, Bike, PartyPopper } from "lucide-react";'
);

// replace ICONS array
content = content.replace(
  /const ICONS = \[[^\]]+\];/,
  `const ICONS = [
  <ClipboardList size={18} />,
  <CheckCircle size={18} strokeWidth={1.5} />,
  <ChefHat size={18} />,
  <Bike size={18} />,
  <PartyPopper size={18} />,
];`
);

fs.writeFileSync(filePath, content);
