const fs = require("fs");
const path = require("path");

const mainFile = path.join(__dirname, "..", "frontend", "src", "main.jsx");
let content = fs.readFileSync(mainFile, "utf-8");

if (!content.includes("OwnerOrdersProvider")) {
  const importStatement = `import { OwnerOrdersProvider } from "./context/owner/OwnerOrdersContext.jsx";\n`;
  content = importStatement + content;
  
  content = content.replace("<RestaurantProvider>", "<OwnerOrdersProvider>\n                              <RestaurantProvider>");
  content = content.replace("</RestaurantProvider>", "</RestaurantProvider>\n                            </OwnerOrdersProvider>");
  
  fs.writeFileSync(mainFile, content);
}
