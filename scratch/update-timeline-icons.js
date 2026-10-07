const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "context", "public", "TimelineStep.jsx");
let content = fs.readFileSync(filePath, "utf-8");

const oldImports = `import {
  ConfirmedIcon,
  DeliveredIcon,
  DeliveryIcon,
  PlacedIcon,
  PreparingIcon,
} from "../../assets/icon/Icons";`;

const newImports = `import {
  ClipboardList,
  CheckCircle,
  ChefHat,
  Bike,
  PartyPopper,
} from "lucide-react";`;

const oldIcons = `const ICONS = [
  <PlacedIcon size={"20px"} color="currentColor" />,
  <ConfirmedIcon size={"20px"} color="currentColor" />,
  <PreparingIcon size={"20px"} color="currentColor" />,
  <DeliveryIcon size={"20px"} color="currentColor" />,
  <DeliveredIcon size={"20px"} color="currentColor" />,
];`;

const newIcons = `const ICONS = [
  <ClipboardList size={18} />,
  <CheckCircle size={18} strokeWidth={1.5} />,
  <ChefHat size={18} />,
  <Bike size={18} />,
  <PartyPopper size={18} />,
];`;

content = content.replace(oldImports, newImports);
content = content.replace(oldIcons, newIcons);

fs.writeFileSync(filePath, content);
