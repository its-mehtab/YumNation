import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Signup from "./pages/sign-up/SignUp";
import Wishlist from "./pages/wishlist/Wishlist";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Product from "./pages/product/Product";
import { Bounce, ToastContainer } from "react-toastify";
import Aside from "./components/aside/Aside";
// import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";

function App() {
  const { user } = useAuth();

  return (
    <>
      <main className="w-full h-dvh bg-white rounded-t-4xl rounded-tr-4xl mt-20">
        <div className="grid grid-cols-11">
          <Aside />
          <section className="grid-cols-9"></section>
        </div>
      </main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <ToastContainer
        toastClassName="custom-toast"
        position="bottom-left"
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
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
