import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import Contact from "../pages/contact/Contact";
import Shop from "../pages/shop/Shop";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Wishlist from "../pages/wishlist/Wishlist";
import ThankYou from "../pages/thank-you/ThankYou";
import OrderDetails from "../pages/order-details/OrderDetails";
import Orders from "../pages/orders/Orders";
import Checkout from "../pages/checkout/Checkout";
import UserLayout from "../layout/UserLayout";

const UserRoutes = () => {
  const { isLoggedIn, user } = useAuth();

  if (user?.role === "admin") return <Navigate to="/admin" />;

  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
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
  );
};

export default UserRoutes;
