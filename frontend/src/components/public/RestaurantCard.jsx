import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";
import { assets, Icon } from "../../assets/assets";
import { StarIcon } from "../../assets/icon/Icons";

const RestaurantCard = ({ restaurant = {} }) => {
  const [wishlistActive, setWishlistActive] = useState(false);

  const isUnavailable = false;
  const statusText = "Currently Unavailable";

  const handleWishlist = () => {
    setWishlistActive((prev) => !prev);
  };

  const handleAddCart = () => {
    console.log("Added to cart");
  };

  return (
    <div className={`relative ${isUnavailable ? "grayscale" : ""}`}>
      <span
        onClick={handleWishlist}
        className="text-[#B7B7B7] hover:text-[#027a36] cursor-pointer absolute top-4 right-4 z-10"
      >
        {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
      </span>

      <Link className="relative block" to={`/restaurant/${restaurant.slug}`}>
        {isUnavailable && (
          <span className="bg-[#fc8019] text-white text-md absolute top-1/2 -left-4 -translate-y-1/2 -right-4 text-center">
            {statusText}
          </span>
        )}

        <img
          src={assets.restaurant}
          alt={restaurant.name}
          className="w-full h-34 mx-auto object-cover rounded-md"
        />
      </Link>

      <div className="pt-3 pb-4 px-0">
        <div className="flex gap-2 items-center mb-1">
          <StarIcon size={18} />
          <div className="w-full flex font-medium items-center gap-3 after:content-[''] after:block rounded-2xl text-gray-800 text-sm">
            4.5 • 35-40 mins
          </div>
        </div>

        <Link to={`/restaurant/${restaurant.slug}`}>
          <h3 className="font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
            {restaurant.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-0.5">
          Burgers, Fast Food, Rolls & Wraps <br /> Howrah Railway Station
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
