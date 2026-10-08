const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace header dropdown
const oldHeaderDropdownRegex = /\{isDropdownOpen && \([\s\S]*?<div className=\"absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden\">([\s\S]*?)<\/div>\s*<\/div>\s*\)\}/;
const newHeaderDropdown = \
            <div
              className={\\\bsolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right \\\\}
            >
              <div className="py-1"></div>
            </div>
\.trim();
content = content.replace(oldHeaderDropdownRegex, newHeaderDropdown);

// Replace "Last 7 Days" in Orders Overview
const oldOverviewDropdownRegex = /<div className=\"border border-gray-200 px-3 py-1\.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2\">[\s\S]*?Last 7 Days <ChevronDown size=\{14\} \/>[\s\S]*?<\/div>/;
const newOverviewDropdown = \
            <div className="relative">
              <div 
                className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                onClick={() => setIsOverviewDropdownOpen(!isOverviewDropdownOpen)}
              >
                Last 7 Days <ChevronDown size={14} />
              </div>
              
              <div
                className={\\\bsolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right \\\\}
              >
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Today</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Yesterday</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Last 7 Days</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>This Month</button>
                </div>
              </div>
            </div>
\.trim();
content = content.replace(oldOverviewDropdownRegex, newOverviewDropdown);

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
