import re

with open(r'C:\Users\CODECLOUDS-MEHTAB\.gemini\antigravity\brain\240cf3bd-39da-41af-aac5-94629d13268e\scratch\scratch_dashboard.txt', 'r', encoding='utf-16') as f:
    content = f.read()

# Clean up any potential BOM from earlier steps
content = content.lstrip('\ufeff')

# 1. Add states
content = content.replace('import React from "react";', 'import React, { useState } from "react";')
content = content.replace('const AdminDashboard = () => {', 'const AdminDashboard = () => {\n  const [isDropdownOpen, setIsDropdownOpen] = useState(false);\n  const [isOverviewDropdownOpen, setIsOverviewDropdownOpen] = useState(false);')

# 2. Container background
content = content.replace('className="space-y-6 max-w-[1600px] mx-auto bg-[#fafafa] p-1"', 'className="space-y-6 max-w-[1600px] mx-auto"')

# 3. Shadows
content = re.sub(r'bg-white p-5 rounded-xl border border-gray-100 shadow-\[0_2px_10px_-4px_rgba\(0,0,0,0\.05\)\]', 'bg-white p-5 rounded-md border border-gray-200', content)
content = re.sub(r'bg-white rounded-xl border border-gray-100 p-6\s+shadow-\[0_2px_10px_-4px_rgba\(0,0,0,0\.05\)\]', 'bg-white rounded-md border border-gray-200 p-6', content)

# 4. Header Dropdown
old_header = r'<div className=\"bg-white border border-gray-200 px-4 py-2\.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer(?: shadow-sm)?\">\s*<Calendar size=\{16\} className=\"text-gray-500\" \/>\s*Today \(Nov 26, 2024\)\s*<ChevronDown size=\{16\} className=\"text-gray-500 ml-1\" \/>\s*<\/div>'
new_header = r'''<div className="relative">
          <div 
            className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Calendar size={16} className="text-gray-500" />
            Today (Nov 26, 2024)
            <ChevronDown size={16} className="text-gray-500 ml-1" />
          </div>
          
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
              isDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
            }`}
          >
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Today</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Yesterday</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>Last 7 Days</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>This Month</button>
            </div>
          </div>
        </div>'''
content = re.sub(old_header, new_header, content)

# 5. Orders Overview Dropdown
old_overview = r'<div className=\"border border-gray-200 px-3 py-1\.5 rounded-md text-xs font-medium text-gray-600\s*cursor-pointer flex items-center gap-2\">\s*Last 7 Days <ChevronDown size=\{14\} \/>\s*<\/div>'
new_overview = r'''<div className="relative">
                <div 
                  className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => setIsOverviewDropdownOpen(!isOverviewDropdownOpen)}
                >
                  Last 7 Days <ChevronDown size={14} />
                </div>
                
                <div
                  className={`absolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                    isOverviewDropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  }`}
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Today</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Yesterday</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Last 7 Days</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>This Month</button>
                  </div>
                </div>
              </div>'''
content = re.sub(old_overview, new_overview, content)

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Finished rewrite")
