const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrders.jsx");
let lines = fs.readFileSync(filePath, "utf-8").split("\n");

lines = lines.filter(line => {
  return !(line.includes('import { useEffect }') || line.includes('import axios') || line.includes('import { useAuth }'));
});

let content = lines.join("\n");
content = content.replace("const { orders, setOrders, loading, filter, setFilter } = useOwnerOrders();", "const { orders, setOrders, filter, setFilter } = useOwnerOrders();");

fs.writeFileSync(filePath, content);
