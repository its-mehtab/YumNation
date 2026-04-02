import React, { useState } from "react";
import VegBadge from "../../components/public/VegBadge";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";
import { useWishlist } from "../../context/user/WishlistContext";
import AddToCartModal from "./AddToCartModal";

const DishItem = ({ dish, restaurant }) => {
  const [isDescTrimmed, setIsDescTrimmed] = useState(true);

  const { serverURL } = useAuth();
  const { wishlist, setWishlist } = useWishlist();
  const restaurantWishlst = wishlist?.find(
    (w) => w.restaurant._id === restaurant._id,
  );

  const [wishlistActive, setWishlistActive] = useState(
    restaurantWishlst?.dishes?.some((d) => d.dish._id === dish._id),
  );

  const handleWishlist = async () => {
    setWishlistActive(!wishlistActive);
    try {
      const { data } = await axios.post(
        `${serverURL}/api/wishlist`,
        { dishId: dish._id, restaurantId: restaurant._id },
        { withCredentials: true },
      );

      setWishlist(data);
      notifySuccess(`${dish.name} added to wishlist`);
    } catch (error) {
      setWishlistActive(wishlistActive);
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError("Add wishlist failed");
    }
  };

  return (
    <div className="flex justify-between items-start py-5 border-b border-gray-100 gap-4 last:border-b-0">
      {/* Left */}
      <div className="flex-1 min-w-0">
        <VegBadge isNonVeg={dish.foodType === "non-veg"} />
        <h3 className="text-[15px] font-semibold text-gray-900 mt-1.5 mb-1 leading-snug">
          {dish.name}
        </h3>
        <p className="text-[15px] font-bold text-gray-900 mb-1.5">
          ${dish.price}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="text-amber-400">★</span>
          <span>
            {dish.rating} ({dish.totalReviews})
          </span>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {isDescTrimmed && dish.shortDescription.length > 30 ? (
            <>
              {dish.shortDescription.slice(0, 30)}
              {"..."}
              <span
                onClick={() => setIsDescTrimmed(false)}
                className="text-orange-500 cursor-pointer font-medium hover:underline"
              >
                more
              </span>
            </>
          ) : (
            dish.shortDescription
          )}
        </p>
      </div>

      <div className="relative shrink-0 pb-4">
        <span
          onClick={handleWishlist}
          className="text-white hover:text-[#cccccc] cursor-pointer absolute top-2 right-2 z-10 drop-shadow-[0_0_4px_rgba(0,0,0)]"
        >
          {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
        </span>
        <img
          src={
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80"
          }
          // src={dish.image}
          alt={dish.name}
          className="w-29.5 h-25 object-cover rounded-xl"
        />
        {(dish.variants.length > 0 || dish.addOns > 0) && (
          <AddToCartModal dish={dish} restaurant={restaurant}>
            <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-5 py-1.5 text-[13px] font-bold text-orange-600 shadow-sm whitespace-nowrap hover:bg-orange-50 transition-colors">
              ADD
            </button>
          </AddToCartModal>
        )}
      </div>
    </div>
  );
};

export default DishItem;
