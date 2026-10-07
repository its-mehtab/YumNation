const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrderDetails.jsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(
  /to=\{`\/admin\/customers\/\$\{order\.user\._id\}`\}/g,
  'to={"#"}'
);
content = content.replace(/\/api\/admin\/order/g, "/api/owner/order");

fs.writeFileSync(filePath, content);
