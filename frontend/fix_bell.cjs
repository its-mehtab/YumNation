const fs = require('fs');
let content = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace all ASCII bell characters globally
content = content.replace(/\x07/g, ''); // Replace it back to '' (wait, the original string was `bsolute so replacing \x07 with ` would fix it!)

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', content, 'utf8');
