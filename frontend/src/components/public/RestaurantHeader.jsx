import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const RestaurantHeader = () => {
  const [restaurant, setRestaurant] = useState({});

  const { serverURL } = useAuth();
  const { slug } = useParams();

  const fetchRestaurant = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/restaurant/${slug}`);

      setRestaurant(data);
    } catch (error) {
      console.log("Restaurant Error:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <section className="mb-7">
      <h1 className="text-[28px] font-bold tracking-tight text-gray-900 mb-4">
        {restaurant?.name}
      </h1>
      <div className="border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-2">
          <span className="text-green-600 text-base">★</span>
          <span className="font-semibold">
            {restaurant?.rating} ({restaurant?.totalReviews}+ ratings)
          </span>
          <span className="text-gray-300 text-lg leading-none">·</span>
          <span className="text-gray-600">
            ${restaurant?.costForTwo} for two
          </span>
        </div>

        {/* Category links */}
        <div className="flex items-center gap-1 flex-wrap mb-3">
          {restaurant?.cuisine?.map((cat, i) => (
            <span key={cat} className="flex items-center gap-1">
              <button className="text-orange-500 font-medium text-sm underline hover:text-orange-600 transition-colors">
                {cat}
              </button>
              {i < restaurant?.cuisine.length - 1 && (
                <span className="text-gray-300 text-sm">,</span>
              )}
            </span>
          ))}
        </div>

        {/* Outlet */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
          <span className="text-gray-400">Outlet</span>
          <span className="font-medium text-gray-700">
            {restaurant?.address?.city}
          </span>
        </div>

        {/* Delivery time */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
          <span>
            {restaurant?.deliveryTime}-{restaurant?.deliveryTime + 5} mins
          </span>
        </div>
      </div>
    </section>
  );
};

export default RestaurantHeader;
