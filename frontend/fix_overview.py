import sys

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''<div className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2">
                Last 7 Days <ChevronDown size={14} />
              </div>'''

replacement = '''<div className="relative">
                <div 
                  className="border border-gray-200 px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => setIsOverviewDropdownOpen(!isOverviewDropdownOpen)}
                >
                  Last 7 Days <ChevronDown size={14} />
                </div>
                
                <div
                  className={bsolute right-0 mt-2 w-40 bg-white rounded-md border border-gray-200 shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top-right }
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Today</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Yesterday</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>Last 7 Days</button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOverviewDropdownOpen(false)}>This Month</button>
                  </div>
                </div>
              </div>'''

# Handle possible line breaks differently if exact string matching fails
import re
# We just use regex to match the outer div
pattern = re.compile(r'<div className="border border-gray-200 px-3 py-1\.5 rounded-md text-xs font-medium text-gray-600\s*cursor-pointer flex items-center gap-2">\s*Last 7 Days <ChevronDown size=\{14\} \/>\s*</div>')

content = pattern.sub(replacement, content)

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
