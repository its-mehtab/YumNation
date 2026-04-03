import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TimeIcon,
  WishlistIcon,
  WishlistIconRed,
} from "../../assets/icon/Icons";
import { assets, Icon } from "../../assets/assets";
import { StarIcon } from "../../assets/icon/Icons";

const RestaurantCard = ({ restaurant = {} }) => {
  const isUnavailable = false;
  const statusText = "Currently Unavailable";

  return (
    <div
      className={`relative border border-gray-200 rounded-2xl overflow-hidden hover:border-[#fc8019] hover:shadow-md transition-all group ${isUnavailable ? "grayscale" : ""}`}
    >
      <Link
        className="relative h-36 max-h-36 overflow-hidden"
        to={`/restaurant/${restaurant.slug}`}
      >
        {isUnavailable && (
          <span className="bg-[#fc8019] text-white text-md absolute top-1/2 -left-4 -translate-y-1/2 -right-4 text-center">
            {statusText}
          </span>
        )}

        {/* {!r.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
              Closed
            </span>
          </div>
        )} */}

        <img
          src={assets.restaurant}
          alt={restaurant.name}
          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="pt-3 pb-4 px-4">
        {/* <div className="flex gap-2 items-center mb-1">
          <StarIcon size={18} />
          <div className="w-full flex font-medium items-center gap-3 after:content-[''] after:block rounded-2xl text-gray-800 text-sm">
            4.5 • 35-40 mins
          </div>
        </div> */}

        <Link to={`/restaurant/${restaurant.slug}`}>
          <h3 className="font-bold text-gray-800 group-hover:text-[#fc8019] transition-all">
            {restaurant.name}
          </h3>
        </Link>

        {/* <p className="text-xs text-gray-600 mt-0.5">
          Burgers, Fast Food, Rolls & Wraps <br /> Howrah Railway Station
        </p> */}

        <p className="text-[11px] text-gray-400 mt-0.5">
          {restaurant.cuisine.join(" · ")}
        </p>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <StarIcon size={12} />
            {restaurant.rating} ({restaurant.totalReviews})
          </span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1">
            <TimeIcon size={12} />
            {restaurant.deliveryTime} min
          </span>
          <span className="text-gray-200">|</span>
          <span
            className={
              restaurant.deliveryFee === 0 ? "text-green-600 font-semibold" : ""
            }
          >
            {restaurant.deliveryFee === 0
              ? "Free delivery"
              : `$${restaurant.deliveryFee} delivery`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
