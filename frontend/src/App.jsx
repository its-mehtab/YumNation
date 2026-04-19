import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import RestaurantRoutes from "./routes/RestaurantRoutes";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminRestaurantDetails from "./pages/admin/AdminRestaurantDetails";
import AdminPromoCodes from "./pages/admin/AdminPromoCodes";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCustomerDetails from "./pages/admin/AdminCustomerDetails";

import RestaurantDashboard from "./pages/owner/RestaurantDashboard";
import RestaurantOrders from "./pages/owner/RestaurantOrders";
import RestaurantOrderDetails from "./pages/owner/RestaurantOrderDetails";
import RestaurantDishes from "./pages/owner/RestaurantDishes";
import RestaurantAddDish from "./pages/owner/RestaurantAddDish";
import RestaurantDishDetails from "./pages/owner/RestaurantDishDetails";
import RestaurantSettings from "./pages/owner/RestaurantSettings";
import RestaurantEditDish from "./pages/owner/RestaurantEditDish";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />

        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<AdminDashboard />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route
            path="restaurants/:slug"
            element={<AdminRestaurantDetails />}
          />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="promo" element={<AdminPromoCodes />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/:id" element={<AdminCustomerDetails />} />
        </Route>

        <Route path="/owner" element={<RestaurantRoutes />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="orders/:id" element={<RestaurantOrderDetails />} />
          <Route path="dishes" element={<RestaurantDishes />} />
          <Route path="dish/:id" element={<RestaurantDishDetails />} />
          <Route path="dish/add" element={<RestaurantAddDish />} />
          <Route path="dish/edit/:id" element={<RestaurantEditDish />} />
          <Route path="settings" element={<RestaurantSettings />} />
        </Route>
      </Routes>

      <ToastContainer
        toastClassName="custom-toast"
        position="top-center"
        autoClose={5000}
        // closeButton={true}
        hideProgressBar={true}
        newestOnTop={false}
        // closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
