const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// The faulty class assignment looks something like: className={ \absolete right-0 mt-2 w-40 ... origin-top-right }
// Let's use a regex to capture it. It's the div inside the overview dropdown.
content = content.replace(
  /className=\{\s*[^}]*?right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right\s*[^}]*?\}/,
  'className={`absolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${isOverviewDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}'
);

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
