const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "dish", "Dish.jsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace('import { Heart } from "lucide-react";\n\n', "");

fs.writeFileSync(filePath, content);
