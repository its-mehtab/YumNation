const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrderDetails.jsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(/\/admin\/orders/g, "/owner/orders");
content = content.replace(/"admin"/g, '"restaurant"'); // For breadcrumbs text if any

fs.writeFileSync(filePath, content);
