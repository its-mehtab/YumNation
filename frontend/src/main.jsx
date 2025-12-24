import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ValidateProvider } from "./context/ValidateContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <ValidateProvider>
            <Header />
            <App />
            <Footer />
          </ValidateProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
