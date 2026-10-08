import re

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the corrupted class name. The corruption is: \x07bsolute instead of `bsolute
# Let's just match the surrounding text and replace it properly.
# We will use raw strings in python r'...' to avoid this issue.
content = re.sub(r'className=\{\x07bsolute right-0 mt-2 w-40', r'className={bsolute right-0 mt-2 w-40', content)

with open(r'C:\MehtabDesk\GitHub\YumNation\frontend\src\pages\admin\AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed corruption')
