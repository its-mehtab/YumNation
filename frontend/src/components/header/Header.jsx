import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { WishlistIcon } from "../../assets/icon/Icons";
import Dropdown from "../dropdown/Dropdown";
import { useWishlist } from "../../context/WishlistContext";
import SearchBox from "../search-box/SearchBox";

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const { wishlist } = useWishlist();

  return (
    <header className="absolute z-50 top-0 left-0 right-0">
      <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
        <nav>
          <div className="relative flex items-center py-4 md:py-3.5">
            <div className="inset-y-0 flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setNavActive(!navActive)}
                aria-expanded={navActive}
                className="relative w-5 h-4 flex flex-col justify-between items-center md:hidden"
              >
                <span
                  className={`block h-0.5 w-full bg-white rounded-2xl transition-all duration-300 
            ${navActive ? "rotate-45 translate-y-1.5" : ""}
          `}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-2xl transition-all duration-300 
            ${navActive ? "opacity-0" : "opacity-100"}
          `}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-2xl transition-all duration-300 
            ${navActive ? "-rotate-45 -translate-y-1.5" : ""}
          `}
                ></span>
              </button>
            </div>
            <div className="flex items-center justify-center md:items-stretch md:justify-start mx-5 md:mx-0">
              <Link to="/" className="flex shrink-0 items-center">
                <img src={assets.logo} alt="logo" className="h-8 w-auto" />
              </Link>

              {/* <div
                className={`
                      md:static md:block mx-auto 
                      bg-[#fc9401] md:bg-transparent
      
                      absolute top-full left-0 right-0
                      overflow-hidden transition-all duration-500 ease-in-out
      
                      ${
                        navActive
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
                      }
                    `}
              ></div> */}
            </div>

            <SearchBox />

            <ul className="flex items-center gap-3 sm:gap-6 ml-auto">
              <li className="hidden md:block relative text-white transition-all cursor-pointer">
                <Dropdown />
              </li>

              <li className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer">
                <Link to="/wishlist" className="flex gap-0.5">
                  <WishlistIcon />
                  <span className="w-4 h-4 rounded-full text-xs flex justify-center items-center bg-[#3f9065] text-white font-bold mt-0.5">
                    {wishlist?.length || "0"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
