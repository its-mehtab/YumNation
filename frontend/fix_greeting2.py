import re

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

repl = '<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">\n            Good morning, Admin ' + chr(0x1F44B) + '\n          </h1>'
content = re.sub(r'<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">\s*Good morning, Test.*?\s*</h1>', repl, content, flags=re.DOTALL)

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Greeting Fixed!")
