const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');
content = content.replace(
  'className={ bsolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right }',
  'className={`absolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${isOverviewDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}'
);
fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
