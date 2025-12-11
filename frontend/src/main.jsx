import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ValidateProvider } from "./context/ValidateContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ValidateProvider>
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </ValidateProvider>
    </AuthProvider>
  </StrictMode>
);
