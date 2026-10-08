const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace the classes for the Last 7 Days trigger
content = content.replace(
  'className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"',
  'className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer flex items-center gap-1"'
);

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
