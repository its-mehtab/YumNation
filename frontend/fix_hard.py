import re
with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace using string slices to avoid ANY regex issues
start_str = 'Orders Overview'
end_str = '</ResponsiveContainer>'
start_idx = content.find(start_str)
end_idx = content.find(end_str, start_idx)

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx + len(start_str)]
    after = content[end_idx:]
    
    middle = '''
                  </h3>
                  <p className="text-xs text-gray-500">
                    Track your platform performance over time.
                  </p>
                </div>
              </div>
              <div className="relative">
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
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
'''
    new_content = before + middle + after
    with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced!")
else:
    print("Could not find start or end")
