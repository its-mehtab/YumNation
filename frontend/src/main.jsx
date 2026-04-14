import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import { AuthProvider } from "./context/user/AuthContext.jsx";
import { ValidateProvider } from "./context/public/ValidateContext.jsx";
import { CategoryProvider } from "./context/public/CategoryContext.jsx";
import { DishProvider } from "./context/owner/DishContext.jsx";
import { CartProvider } from "./context/user/CartContext.jsx";
import { WishlistProvider } from "./context/user/WishlistContext.jsx";
import { Theme } from "@radix-ui/themes";
import { AddressContextProvider } from "./context/user/AddressContext.jsx";
import { OrderContextProvider } from "./context/user/OrderContext.jsx";
import AppInit from "./context/AppInit.jsx";
import { RestaurantProvider } from "./context/owner/RestaurantContext.jsx";
import { RestaurantsProvider as AdminRestaurantsProvider } from "./context/admin/RestaurantsContext.jsx";
import { RestaurantsProvider } from "./context/public/RestaurantsContext.jsx";
import { CouponProvider } from "./context/admin/CouponContext.jsx";
import { AdminOrdersProvider } from "./context/admin/AdminOrdersContext.jsx";

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
                        <AdminOrdersProvider>
                          <RestaurantProvider>
                            <AdminRestaurantsProvider>
                              <CouponProvider>
                                <Theme accentColor="orange">
                                  <AppInit />
                                  <App />
                                </Theme>
                              </CouponProvider>
                            </AdminRestaurantsProvider>
                          </RestaurantProvider>
                        </AdminOrdersProvider>
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
