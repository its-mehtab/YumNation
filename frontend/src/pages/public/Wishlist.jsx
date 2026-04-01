import React, { useState } from "react";
import { Link } from "react-router-dom";
import VegBadge from "../../components/public/VegBadge";
import {
  DeleteIcon,
  DelhiveryBoxIcon,
  LocationIcon,
  StarIcon,
  TimeIcon,
} from "../../assets/icon/Icons";
import { useWishlist } from "../../context/user/WishlistContext";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";

const Wishlist = () => {
  const { wishlist, setWishlist } = useWishlist();
  const { serverURL } = useAuth();

  const totalDishes = wishlist.reduce((a, g) => a + g.dishes.length, 0);

  const handleRemoveDish = async (restaurantId, dishId) => {
    setWishlist((prev) =>
      prev
        .map((g) =>
          g.restaurant._id === restaurantId
            ? { ...g, dishes: g.dishes.filter((d) => d._id !== dishId) }
            : g,
        )
        .filter((g) => g.dishes.length > 0),
    );

    try {
      const { data } = await axios.delete(
        `${serverURL}/api/wishlist/${dishId}/${restaurantId}`,
        { withCredentials: true },
      );

      console.log(data);

      notifySuccess("Remove wishlist successfully");
    } catch (error) {
      setWishlist(wishlist);
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError("Remove wishlist failed");
    }
  };

  const handleRemoveRestaurant = (restaurantId) => {
    setWishlist((prev) =>
      prev.filter((g) => g.restaurant._id !== restaurantId),
    );
  };

  const handleAddToCart = (dish) => {
    console.log("Adding to cart:", dish.name);
    // replace with addToCart(dish) from useCart()
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">My Wishlist</h1>
          {wishlist.length > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              {totalDishes} saved dish{totalDishes > 1 ? "es" : ""} across{" "}
              {wishlist.length} restaurant{wishlist.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
        {wishlist.length > 0 && (
          <button
            onClick={() => setWishlist([])}
            className="text-xs font-semibold text-red-400 hover:text-red-500 border border-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ── Empty state ── */}
      {wishlist.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#fc8019] text-center py-20 px-4">
          <div className="text-5xl mb-4">🤍</div>
          <h2 className="text-base font-bold text-gray-700 mb-1">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Save dishes you love and order them anytime
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      )}

      {/* ── Wishlist groups ── */}
      <div className="space-y-5">
        {wishlist.map((group) => {
          const { restaurant, dishes } = group;
          return (
            <div
              key={restaurant._id}
              className="bg-white rounded-2xl border border-[#fc8019] overflow-hidden"
            >
              {/* ── Restaurant header ── */}
              <div className="flex items-center gap-4 px-6 py-4 border-b border-orange-100">
                <Link to={`/restaurants/${restaurant.slug}`}>
                  <div className="w-11 h-11 min-w-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl overflow-hidden hover:border-orange-200 transition-colors">
                    {group.logo ? (
                      <img
                        src={group.logo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🏪"
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to={`/restaurant/${restaurant.slug}`}
                      className="text-sm font-bold text-gray-700 hover:text-[#fc8019] transition-colors"
                    >
                      {group.name}
                    </Link>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${restaurant.isOpen ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}
                    >
                      {restaurant.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 flex gap-2 mt-1">
                    <span className="flex gap-1">
                      <LocationIcon size={17} /> {restaurant.address.city}
                    </span>
                    <span className="flex gap-1">
                      <StarIcon size={14} /> {restaurant.rating}
                    </span>
                    <span className="flex gap-1">
                      <TimeIcon size={14} /> {restaurant.deliveryTime} min
                    </span>
                    <span className="flex gap-1">
                      <DelhiveryBoxIcon size={14} /> ${restaurant.deliveryFee}{" "}
                      delivery
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to={`/restaurant/${restaurant.slug}`}
                    className="text-xs font-semibold text-[#fc8019] border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    View Menu
                  </Link>
                  <button
                    onClick={() => handleRemoveRestaurant(restaurant._id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                    title="Remove restaurant from wishlist"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              {/* ── Dishes table ── */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Dish
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                  {dishes.map((dish) => (
                    <tr
                      key={dish._id}
                      className="hover:bg-orange-50/40 transition-colors"
                    >
                      {/* Dish name + image */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 min-w-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-base overflow-hidden">
                            {dish.image ? (
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              "🍽️"
                            )}
                          </div>
                          <span className="font-medium text-gray-700">
                            {dish.name}
                          </span>
                        </div>
                      </td>
                      {/* Food type */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <VegBadge isNonVeg={dish.foodType === "non-veg"} />
                          <span className="text-xs text-gray-500 capitalize">
                            {dish.foodType}
                          </span>
                        </div>
                      </td>
                      {/* Price */}
                      <td className="px-4 py-3.5 font-bold text-[#fc8019]">
                        ${dish.price}
                      </td>
                      {/* Actions */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          {restaurant.isOpen ? (
                            <button
                              onClick={() => handleAddToCart(dish)}
                              className="flex items-center gap-1.5 bg-[#fc8019] hover:bg-[#e5721f] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              + Add to Cart
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium">
                              Restaurant closed
                            </span>
                          )}
                          <button
                            onClick={() =>
                              handleRemoveDish(restaurant._id, dish._id)
                            }
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
