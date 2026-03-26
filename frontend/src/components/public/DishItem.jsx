import React, { useState } from "react";
import VegBadge from "../../components/public/VegBadge";

const DishItem = ({ dish }) => {
  const [isDescTrimmed, setIsDescTrimmed] = useState(true);
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
        <img
          src={
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80"
          }
          // src={dish.image}
          alt={dish.name}
          className="w-29.5 h-25 object-cover rounded-xl"
        />
        <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-5 py-1.5 text-[13px] font-bold text-green-600 shadow-sm whitespace-nowrap hover:bg-green-50 transition-colors">
          ADD
        </button>
      </div>
    </div>
  );
};

export default DishItem;
