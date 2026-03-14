import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { fetchAvailibility } from "../../utils/availibility";

const DishCardSm = ({ item, setIsSearchActive, setResults, setResultName }) => {
  const { isSoldOut, isUnavailable, statusText } = fetchAvailibility(item);

  return (
    <Link
      onClick={() => {
        setIsSearchActive(false);
        setResults([]);
        setResultName("");
      }}
      to={`dish/${item.slug}`}
      className={`border text-[#b2b2b2] p-3 rounded-lg text-xl cursor-pointer text-center min-h-34 block ${(isSoldOut || isUnavailable) && "grayscale"}`}
    >
      <div className="relative">
        <img src={assets.dish2} className="max-w-20 mx-auto" />
        {(isSoldOut || isUnavailable) && (
          <span className="bg-[#fc8019] text-white text-xs absolute top-1/2 -left-3 -translate-y-1/2 -right-3 text-center px-2.5 py-1.5">
            {statusText}
          </span>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-700 font-semibold">
        {item.name}
      </div>
    </Link>
  );
};

export default DishCardSm;
