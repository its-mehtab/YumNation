import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Login from "./pages/login/Login";
import Signup from "./pages/sign-up/SignUp";
import Wishlist from "./pages/wishlist/Wishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
