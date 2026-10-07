const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "frontend", "src", "pages", "owner", "RestaurantOrders.jsx");
let content = fs.readFileSync(filePath, "utf-8");

// Imports
content = content.replace(
  'import { useAuth } from "../../context/user/AuthContext";',
  'import { useAuth } from "../../context/user/AuthContext";\nimport { useOwnerOrders } from "../../context/owner/OwnerOrdersContext";'
);
content = content.replace('import { useEffect } from "react";\n', '');
content = content.replace('import axios from "axios";\n', '');
content = content.replace('import React, { useState } from "react";', 'import React from "react";');

// Remove mockOrders
content = content.replace(/\/\/ ── Mock data ──[\s\S]*?\];/g, '');

// The Component Body
const componentRegex = /const RestaurantOrders = \(\) => \{[\s\S]*?(?=return \()/;
const newComponentBody = `const RestaurantOrders = () => {
  const { orders, setOrders, loading, filter, setFilter } = useOwnerOrders();

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) => ({
      ...prev,
      items: prev.items.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o,
      ),
    }));
  };

  const stats = {
    total: orders?.items?.length || 0,
    pending: orders?.statusCount?.placed || 0,
    preparing: orders?.statusCount?.preparing || 0,
    delivered: orders?.statusCount?.delivered || 0,
    revenue: orders?.totalRevenue || 0,
  };

  `;

content = content.replace(componentRegex, newComponentBody);

// Table mappings and filtering replacements
content = content.replace(/filtered\.map/g, '(orders?.items || []).map');
content = content.replace(/filtered\.length/g, '(orders?.items || []).length');

// Fix status filter count in buttons
content = content.replace(
  /\(orders\.filter\(\(o\) => o\.orderStatus === s\)\.length\)/g,
  '(orders?.statusCount?.[s] || 0)'
);

// Fix Pagination
content = content.replace(
  /count=\{5\}\s*page=\{1\}/g,
  `count={orders?.pagination?.totalPages || 1}\n              page={filter.page || 1}\n              onChange={(e, value) => setFilter(prev => ({ ...prev, page: value }))}`
);

fs.writeFileSync(filePath, content);
