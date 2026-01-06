import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ValidateProvider } from "./context/ValidateContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
<<<<<<< HEAD
import { ProductProvider } from "./context/ProductContext.jsx";
=======
>>>>>>> d22451bbae1894d8bab3142a77f00122fbbd3d77

// Fixed
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CategoryProvider>
            <ValidateProvider>
              <Header />
              <App />
              <Footer />
            </ValidateProvider>
          </CategoryProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
