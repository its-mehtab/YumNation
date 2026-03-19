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
import { DishProvider } from "./context/owner/DishContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Theme } from "@radix-ui/themes";
import { AddressContextProvider } from "./context/AddressContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";
import AppInit from "./context/AppInit.jsx";
import { RestaurantProvider } from "./context/owner/RestaurantContext.jsx";
import { RestaurantsProvider as AdminRestaurantsProvider } from "./context/admin/RestaurantsContext.jsx";
import { RestaurantsProvider } from "./context/public/RestaurantsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <DishProvider>
              <RestaurantsProvider>
                <CategoryProvider>
                  <AddressContextProvider>
                    <ValidateProvider>
                      <OrderContextProvider>
                        <RestaurantProvider>
                          <AdminRestaurantsProvider>
                            <Theme accentColor="orange">
                              <AppInit />
                              <App />
                            </Theme>
                          </AdminRestaurantsProvider>
                        </RestaurantProvider>
                      </OrderContextProvider>
                    </ValidateProvider>
                  </AddressContextProvider>
                </CategoryProvider>
              </RestaurantsProvider>
            </DishProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
