import re

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Replace the corrupted greeting line.
# It looks something like: <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">Good morning, Test ...</h1>
# We'll use a regex to match the h1 tag content.
content = re.sub(r'<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">\s*Good morning, Test.*?\s*</h1>', r'<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">\n            Good morning, Admin \U0001F44B\n          </h1>', content, flags=re.DOTALL)

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Greeting Fixed!")
