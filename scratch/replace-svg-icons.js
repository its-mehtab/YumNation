const fs = require("fs");
const path = require("path");

const iconMap = {
  SearchIcon: "Search",
  UserIcon: "User",
  CartIcon1: "ShoppingCart",
  BurgerIcon: "Utensils",
  FriesIcon: "UtensilsCrossed",
  WishlistIcon: "Heart",
  WishlistIconRed: "Heart",
  EmptyWishlistIcon: "Heart",
  CartIcon: "ShoppingCart",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  FacebookIcon: "Facebook",
  GoogleIcon: "Globe",
  StarIcon: "Star",
  MinusIcon: "Minus",
  PlusIcon: "Plus",
  ChevronRightIcon: "ChevronRight",
  LocationIcon: "MapPin",
  HomeIcon: "Home",
  RestaurantIcon: "Store",
  FailedIcon: "XCircle",
  DishIcon: "Utensils",
  ViewIcon: "Eye",
  EditIcon: "Edit",
  DeleteIcon: "Trash2",
  FilterIcon: "Filter",
  DelhiveryBoxIcon: "Package",
  TimeIcon: "Clock",
  TagIcon: "Tag",
  PlacedIcon: "ClipboardList",
  ConfirmedIcon: "CheckCircle",
  PreparingIcon: "ChefHat",
  DeliveryIcon: "Bike",
  DeliveredIcon: "PartyPopper"
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== "assets" && file !== "dist") {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith(".jsx")) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // Find imports from Icons.jsx
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"](?:\.\.\/)+assets\/icon\/Icons['"];?/g;
  let match;
  let allUsedIcons = new Set();
  
  while ((match = importRegex.exec(content)) !== null) {
    const importedIcons = match[1].split(',').map(s => s.trim()).filter(Boolean);
    importedIcons.forEach(i => allUsedIcons.add(i));
    content = content.replace(match[0], "");
    modified = true;
  }

  if (!modified && !content.includes("assets/icon/Icons")) return;
  
  // If no direct regex match but file imports Icons.jsx somehow
  if (!modified && content.match(/from\s*['"](?:\.\.\/)+assets\/icon\/Icons['"]/)) {
     const manualRegex = /import\s*\{([^}]+)\}\s*from\s*['"](?:\.\.\/)+assets\/icon\/Icons['"];?/;
     const manualMatch = content.match(manualRegex);
     if (manualMatch) {
         const importedIcons = manualMatch[1].split(',').map(s => s.trim()).filter(Boolean);
         importedIcons.forEach(i => allUsedIcons.add(i));
         content = content.replace(manualMatch[0], "");
         modified = true;
     }
  }

  if (modified && allUsedIcons.size > 0) {
    // Replace JSX tags
    const lucideImports = new Set();
    
    for (const oldIcon of allUsedIcons) {
      const newIcon = iconMap[oldIcon];
      if (newIcon) {
        lucideImports.add(newIcon);
        // Replace <OldIcon /> with <NewIcon />
        const tagRegex = new RegExp(`<${oldIcon}\\b([^>]*)>`, "g");
        content = content.replace(tagRegex, (match, props) => {
           // We might need to map some props like `color` if we want, but lucide supports `color`
           return `<${newIcon} ${props}>`;
        });
      }
    }
    
    // Add lucide imports at the top
    if (lucideImports.size > 0) {
      const importStr = `import { ${Array.from(lucideImports).join(", ")} } from "lucide-react";\n`;
      // Insert after the first import or at top
      const firstImportIndex = content.indexOf("import");
      if (firstImportIndex !== -1) {
          const endOfFirstImport = content.indexOf(";", firstImportIndex);
          content = content.slice(0, endOfFirstImport + 1) + "\n" + importStr + content.slice(endOfFirstImport + 1);
      } else {
          content = importStr + content;
      }
    }
    
    fs.writeFileSync(filePath, content);
    console.log("Updated", filePath);
  }
}

const frontendSrc = path.join(__dirname, "..", "frontend", "src");
processDirectory(frontendSrc);
