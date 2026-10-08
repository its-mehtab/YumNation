const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace any corrupted className using a wildcard matcher for the whole line or segment
content = content.replace(
  /className=\{\s*[^}]*?bsolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right\s*\}/g,
  'className={bsolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right }'
);

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
