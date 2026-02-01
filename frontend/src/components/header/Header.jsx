import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowRight,
  CartIcon1,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "../../assets/icon/Icons";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import CartModal from "./CartModal";
import SearchModal from "./SearchModal";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const navigations = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const products = [
  {
    _id: 1,
    name: "LOADED FRIES",
    price: 2.26,
    img: assets.product1,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 2,
    name: "ORIGINAL RECIPE CHICKEN",
    price: 5.0,
    img: assets.product2,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 3,
    name: "WHOPPER BURGER KING",
    price: 12.39,
    img: assets.product3,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 4,
    name: "TACO SUPREME",
    price: 8.32,
    img: assets.product4,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 5,
    name: "SPICY CHICKEN SANDWICH",
    price: 12.46,
    img: assets.product5,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 6,
    name: "LOADED FRIES",
    price: 2.26,
    img: assets.product1,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 7,
    name: "ORIGINAL RECIPE CHICKEN",
    price: 5.0,
    img: assets.product2,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 8,
    name: "WHOPPER BURGER KING",
    price: 12.39,
    img: assets.product3,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 9,
    name: "TACO SUPREME",
    price: 8.32,
    img: assets.product4,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 10,
    name: "SPICY CHICKEN SANDWICH",
    price: 12.46,
    img: assets.product5,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
];

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="absolute z-50 top-0 left-0 right-0 bg-[#fb9300]">
      <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
        <nav>
          <div className="relative flex items-center justify-between py-4 md:py-8">
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

              <div
                className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer ml-5"
                onClick={() => setOpenSearchModal(true)}
              >
                <SearchIcon />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start mx-5 md:mx-0">
              <Link to="/" className="flex shrink-0 items-center">
                <img src={assets.logo} alt="logo" className="h-8 w-auto" />
              </Link>

              <div
                className={`
                      md:static md:block mx-auto font-[Bangers]
                      bg-[#fc9401] md:bg-transparent
      
                      absolute top-full left-0 right-0
                      overflow-hidden transition-all duration-500 ease-in-out
      
                      ${
                        navActive
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
                      }
                    `}
              >
                <div className="block md:flex space-y-4 md:space-y-0 md:space-x-6 lg:space-x-10 p-5 md:p-0">
                  {navigations.map((currOpion) => (
                    <NavLink
                      key={currOpion.href}
                      to={currOpion.href}
                      className={({ isActive }) =>
                        isActive
                          ? "text-lg text-white block border-b border-white"
                          : "text-lg text-white block"
                      }
                    >
                      {currOpion.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <ul className="flex items-center gap-3 sm:gap-6">
              <li
                onClick={() => setOpenSearchModal(true)}
                className="hidden md:block relative text-white hover:text-[#3f9065] transition-all cursor-pointer"
              >
                <SearchIcon />
              </li>
              <li className="hidden md:block relative text-white transition-all cursor-pointer">
                <Dropdown />
              </li>

              {/* <li className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer">
                <Link to="/login">
                  <UserIcon />
                </Link>
              </li> */}

              <li className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer">
                <Link to="/wishlist" className="flex gap-0.5">
                  <WishlistIcon />
                  <span className="w-4 h-4 rounded-full text-xs flex justify-center items-center bg-[#3f9065] text-white font-bold mt-0.5">
                    {wishlist?.length || "0"}
                  </span>
                </Link>
              </li>

              <li
                onClick={() => setOpenCartModal(true)}
                className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer flex gap-0.5"
              >
                <CartIcon1 />
                <span className="w-4 h-4 rounded-full text-xs flex justify-center items-center bg-[#3f9065] text-white font-bold mt-0.5">
                  {cart?.length || "0"}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* SearchModal */}
      <SearchModal
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
        products={products}
      />

      <CartModal
        openCartModal={openCartModal}
        setOpenCartModal={setOpenCartModal}
        products={products}
      />
    </header>
  );
};

export default Header;
