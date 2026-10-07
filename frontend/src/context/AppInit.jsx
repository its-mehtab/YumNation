import { useEffect } from "react";
import { useAuth } from "./user/AuthContext";
import { useAddress } from "./user/AddressContext";
import { useCart } from "./user/CartContext";
import { useOrders } from "./user/OrderContext";
import { useWishlist } from "./user/WishlistContext";
import { useRestaurant } from "./owner/RestaurantContext";
import { useRestaurants } from "./admin/RestaurantsContext";
import { useDish } from "./owner/DishContext";
import { useCoupon } from "./admin/CouponContext";
import { useAdminOrders } from "./admin/AdminOrdersContext";
import { useCategories } from "./admin/CategoryAdminContext";

const AppInit = () => {
  const { user } = useAuth();
  const { fetchAddress } = useAddress();
  const { fetchUserCart } = useCart();
  const { fetchOrders } = useOrders();
  const { fetchWishlist } = useWishlist();

  const { fetchRestaurant } = useRestaurant();
  const { getRestaurantDishes } = useDish();

  const { fetchRestaurants } = useRestaurants();
  const { fetchAdminOrders, filter } = useAdminOrders();
  const { fetchCoupon } = useCoupon();
  const { fetchCategories } = useCategories();

  useEffect(() => {
    if (!user) return;

    if (user.role === "user") {
      fetchUserCart();
      fetchAddress();
      fetchOrders();
      fetchWishlist();
    }

    if (user.role === "restaurant") {
      fetchRestaurant();
      getRestaurantDishes();
    }

    if (user.role === "admin") {
      fetchRestaurants();
      fetchCoupon();
      fetchCategories();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      fetchAdminOrders();
    }
  }, [
    filter.page,
    filter.orderStatus,
    filter.orderSearch,
    filter.sortBy,
    user,
  ]);

  return null;
};

export default AppInit;
