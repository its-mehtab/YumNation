import fs from 'fs';

let adminContent = fs.readFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\admin\\AdminDashboard.jsx', 'utf8');

// Replace component name
let ownerContent = adminContent.replace(/AdminDashboard/g, 'RestaurantDashboard');

// Replace greeting
ownerContent = ownerContent.replace(/Good morning, Test dY`<|Good morning, Admin ??/g, 'Good morning, Owner ??');

// Replace "Total Restaurants" with "Total Dishes"
ownerContent = ownerContent.replace(/Total Restaurants/g, 'Total Dishes');

// Replace store icon with something else for Total Dishes
ownerContent = ownerContent.replace(/<Store size=\{24\} strokeWidth=\{1\.5\} \/>/g, '<Package size={24} strokeWidth={1.5} />');

// Replace Top Restaurants table with Top Dishes
ownerContent = ownerContent.replace(/Top Restaurants/g, 'Top Dishes');
ownerContent = ownerContent.replace(/<th>Restaurant<\/th>/g, '<th>Dish</th>');
ownerContent = ownerContent.replace(/Biryani House/g, 'Chicken Biryani');
ownerContent = ownerContent.replace(/Kolkata/g, 'Main Course');

fs.writeFileSync('C:\\MehtabDesk\\GitHub\\YumNation\\frontend\\src\\pages\\owner\\RestaurantDashboard.jsx', ownerContent, 'utf8');
console.log("RestaurantDashboard created successfully");
