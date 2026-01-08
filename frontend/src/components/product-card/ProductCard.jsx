import React, { useState } from "react";
import { assets, Icon } from "../../assets/assets";
import { Link } from "react-router-dom";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";

const ProductCard = ({ currProduct }) => {
  const [wishlistActive, setWishlistActive] = useState(false);
  // const [size, setSize] = useState("s");

  return (
    <div className="p-2 sm:p-4 mt-3.5">
      <div className="relative after:content-[''] after:absolute after:top-2/6 after:bottom-0 after:right-0 after:w-full after:rounded-3xl after:bg-[#FFF7EA] after:-z-10 hover:after:shadow-[2px_2px_0px_4px_rgba(0,0,0)] hover:after:top-0 after:transition-all after:duration-400">
        {/* <img src={currProduct.img} alt="" className="w-full" /> */}
        <img src={assets.product2} alt="" className="w-full" />
        <div className="p-8 pt-0">
          <div className="flex justify-between place-items-center">
            <Link to={"/product"}>
              <h3 className="text-xl text-[#000006] hover:text-[#fb9300] transition-all">
                {currProduct.name}
              </h3>
            </Link>
            <span
              onClick={() => setWishlistActive(!wishlistActive)}
              className="text-[#B7B7B7] hover:text-[#027a36] cursor-pointer"
            >
              {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
            </span>
          </div>
          <p className="text-sm text-[#66666A] my-3">
            {currProduct.description}
          </p>
          <div className="flex justify-between place-items-center">
            <h3 className="text-2xl text-[#ED1B2E]">
              <Link to={`/product`}>${currProduct.price.toFixed(2)}</Link>
            </h3>
            {/* <select
              name="size"
              className="text-lg w-13 h-12 outline-0 cursor-pointer px-2 py-2 border border-gray-300 rounded-lg capitalize ml-auto mr-3"
            >
              {["s", "m", "l"].map((curr) => {
                return (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                );
              })}
            </select> */}

            <span className="w-12 h-12 flex items-center justify-center bg-[#110A00] rounded-lg hover:bg-[#fb9300] cursor-pointer transition-all">
              {<Icon.CartIcon />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
