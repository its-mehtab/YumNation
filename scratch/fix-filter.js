const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrders.jsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(
  "{orders.filter((o) => o.orderStatus === s).length}",
  "{orders?.statusCount?.[s] || 0}"
);

fs.writeFileSync(filePath, content);
