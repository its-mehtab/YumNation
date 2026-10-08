const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace shadows
content = content.replace(/bg-white rounded-xl border border-gray-100 p-6\s*shadow-\[0_2px_10px_-4px_rgba\(0,0,0,0\.05\)\]/g, 'bg-white rounded-md border border-gray-200 p-6');
content = content.replace(/bg-white rounded-xl border border-gray-100 p-6\s+shadow-\[0_2px_10px_-4px_rgba\(0,0,0,0\.05\)\] h-full/g, 'bg-white rounded-md border border-gray-200 p-6 h-full');

if (!content.includes('useState')) {
  content = content.replace('import React from \"react\";', 'import React, { useState } from \"react\";');
}

if (!content.includes('isDropdownOpen')) {
  content = content.replace('const AdminDashboard = () => {', 'const AdminDashboard = () => {\n  const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n');
}

const oldBtnRegex = /<div className=\"bg-white border border-gray-200 px-4 py-2\.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer(?: shadow-sm)?\">[\s\S]*?<\/div>/;
const newBtn = \
        <div className=\"relative\">
          <div 
            className=\"bg-white border border-gray-200 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50\"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Calendar size={16} className=\"text-gray-500\" />
            Today (Nov 26, 2024)
            <ChevronDown size={16} className=\"text-gray-500 ml-1\" />
          </div>
          
          {isDropdownOpen && (
            <div className=\"absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden\">
              <div className=\"py-1\">
                <button className=\"block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Today</button>
                <button className=\"block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Yesterday</button>
                <button className=\"block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Last 7 Days</button>
                <button className=\"block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">This Month</button>
              </div>
            </div>
          )}
        </div>\;

content = content.replace(oldBtnRegex, newBtn);

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
