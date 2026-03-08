import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ValidateProvider } from "./context/ValidateContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Theme } from "@radix-ui/themes";
import { AddressContextProvider } from "./context/AddressContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ProductProvider>
              <CategoryProvider>
                <AddressContextProvider>
                  <ValidateProvider>
                    <OrderContextProvider>
                      <Theme accentColor="orange">
                        <Header />
                        <App />
                      </Theme>
                    </OrderContextProvider>
                  </ValidateProvider>
                </AddressContextProvider>
              </CategoryProvider>
            </ProductProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
