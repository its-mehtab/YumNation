import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useWishlist } from "../context/WishlistContext";
import { useRestaurant } from "./restaurant/RestaurantContext";
import { useRestaurants } from "./admin/RestaurantsContext";
import { useDish } from "./restaurant/DishContext";

const AppInit = () => {
  const { user } = useAuth();
  const { fetchAddress } = useAddress();
  const { fetchUserCart } = useCart();
  const { fetchOrders } = useOrders();
  const { fetchWishlist } = useWishlist();

  const { fetchRestaurant } = useRestaurant();
  const { getRestaurantDishes } = useDish();

  const { fetchRestaurants } = useRestaurants();

  useEffect(() => {
    if (!user) return;

    if (user.role === "user") {
      fetchAddress();
      fetchUserCart();
      fetchOrders();
      fetchWishlist();
    }

    if (user.role === "restaurant") {
      fetchRestaurant();
      getRestaurantDishes();
    }

    if (user.role === "admin") {
      fetchRestaurants();
    }
  }, [user]);

  return null;
};

export default AppInit;
