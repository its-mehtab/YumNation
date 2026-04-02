import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../context/user/AuthContext";
import Home from "../pages/public/Home";
import Dish from "../pages/dish/Dish";
import Contact from "../pages/contact/Contact";
import Shop from "../pages/shop/Shop";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/SignUp";
import ForgotPassword from "../pages/public/ForgotPassword";
import Wishlist from "../pages/public/Wishlist";
import ThankYou from "../pages/user/ThankYou";
import OrderDetails from "../pages/user/OrderDetails";
import Orders from "../pages/user/Orders";
import Checkout from "../pages/checkout/Checkout";
import UserLayout from "../layout/UserLayout";
import Restaurants from "../pages/public/Restaurants";
import RestaurantDishes from "../pages/public/RestaurantDishes";
import FloatingCart from "../components/public/FloatingCart";

const PublicRoutes = () => {
  const { isLoggedIn, user } = useAuth();
  const { pathname } = useLocation();

  if (user?.role === "admin") return <Navigate to="/admin" />;
  if (user?.role === "restaurant") return <Navigate to="/owner" />;

  return (
    <>
      <UserLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:slug" element={<RestaurantDishes />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dish/:slug" element={<Dish />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </UserLayout>

      {pathname !== "/checkout" && <FloatingCart />}
    </>
  );
};

export default PublicRoutes;
