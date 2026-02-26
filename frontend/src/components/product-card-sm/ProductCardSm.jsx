import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const ProductCardSm = ({
  item,
  setIsSearchActive,
  setResults,
  setResultName,
}) => {
  return (
    <Link
      onClick={() => {
        setIsSearchActive(false);
        setResults([]);
        setResultName("");
      }}
      to={`product/${item.slug}`}
      className="border text-[#b2b2b2] p-3 rounded-lg text-xl cursor-pointer text-center min-h-34 block"
    >
      <img src={assets.product2} className="max-w-20 mx-auto" />
      <div className="mt-2 text-sm text-gray-700 font-semibold">
        {item.name}
      </div>
    </Link>
  );
};

export default ProductCardSm;
