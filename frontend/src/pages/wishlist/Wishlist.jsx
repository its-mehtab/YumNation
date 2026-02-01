import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <section className="py-20 my-20 lg:py-30">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <ul className="border border-gray-200 p-8 rounded-4xl">
            {wishlist?.map((currProd) => {
              return (
                <li key={currProd._id} className="flex gap-4 items-center mb-2">
                  <div className="w-20 min-w-20 h-20 rounded-xl">
                    {/* <img src={currProd.img} alt="" className="w-full" /> */}
                    <img src={assets.product2} alt="" className="w-full" />
                  </div>
                  <div>
                    <h3 className="text-lg">{currProd.name}</h3>
                    <div>${currProd.price.toFixed(2)}</div>
                  </div>
                  <div className="ml-auto flex gap-5 md:gap-10 items-center">
                    <div className="hidden md:block px-8 py-4 rounded-xl font-[bangers] bg-[#FB9300] text-white cursor-pointer hover:bg-[#c57300] transition">
                      Move to Cart
                    </div>
                    <span className="cursor-pointer p-1 text-gray-600 hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
