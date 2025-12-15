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

  return (
    <header className="absolute z-50 top-0 left-0 right-0">
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
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
                    1
                  </span>
                </Link>
              </li>

              <li
                onClick={() => setOpenCartModal(true)}
                className="relative text-white hover:text-[#3f9065] transition-all cursor-pointer flex gap-0.5"
              >
                <CartIcon1 />
                <span className="w-4 h-4 rounded-full text-xs flex justify-center items-center bg-[#3f9065] text-white font-bold mt-0.5">
                  0
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* SearchModal */}
      <div
        className={`${
          !openSearchModal ? "-translate-y-[calc(100%+1px)]" : "translate-y-0"
        } fixed top-0 left-0 right-0 p-4 bg-white h-1/2 min-h-full md:min-h-[75vh] z-999 transition-all duration-500 overflow-hidden`}
      >
        <div className="flex items-center justify-end">
          <div
            onClick={() => setOpenSearchModal(false)}
            className="w-10 h-10 bg-[#fb9300] hover:bg-orange-500 text-white rounded-lg cursor-pointer flex justify-center items-center transition-all duration-300"
          >
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
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 relative mt-6 md:mt-15">
            <span className="absolute top-1/2 left-6 -translate-1/2 text-gray-300">
              <SearchIcon />
            </span>
            <input
              type="email"
              placeholder="Search..."
              className="px-12 pe-8 py-4 rounded-xl bg-white text-[#66666A] w-full outline-0 border border-gray-200"
            />
            {/* <button className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10 bg-[#3f9065] text-white hover:bg-[#fb9300] rounded-lg cursor-pointer">
              <ArrowRight />
            </button> */}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 md:mt-8 max-w-5xl mx-auto h-full md:max-h-50 overflow-y-scroll">
          {products.map((currProd) => {
            return (
              <div key={currProd._id} className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-xl">
                  <img src={currProd.img} alt="" className="w-full" />
                </div>
                <div>
                  <h3>{currProd.name}</h3>
                  <div>${currProd.price.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <span
        onClick={() => setOpenSearchModal(false)}
        className={`${
          !openSearchModal ? "-translate-y-full" : "translate-y-0"
        } fixed left-0 right-0 top-0 bottom-0 z-10 bg-[rgba(0,0,0,0.4)] transition-all duration-500`}
      ></span>

      <div
        className={`${
          !openCartModal ? "translate-x-full" : "translate-x-0"
        } fixed top-0 bottom-0 right-0 w-full max-w-lg bg-white z-999 transition-all duration-500`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-300">
          <h3 className="text-2xl">Shopping cart</h3>
          <div
            onClick={() => setOpenCartModal(false)}
            className="w-10 h-10 bg-[#fb9300] hover:bg-orange-500 text-white rounded-lg cursor-pointer flex justify-center items-center transition-all duration-300"
          >
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
          </div>
        </div>
        <div className="px-5 pt-3 h-[calc(100%-170px)] overflow-y-scroll">
          <ul>
            {products.map((currProd) => {
              return (
                <li key={currProd._id} className="flex gap-4 items-center mb-2">
                  <div className="w-20 min-w-20 h-20 rounded-xl">
                    <img src={currProd.img} alt="" className="w-full" />
                  </div>
                  <div>
                    <h3 className="text-lg">{currProd.name}</h3>
                    <div>${currProd.price.toFixed(2)}</div>
                  </div>
                  <span className="cursor-pointer p-1 ml-auto text-gray-600 hover:text-black">
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
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-300 bg-white flex gap-2 justify-between items-center">
          <div className="flex gap-2 flex-col">
            <span className="text-xl font-extrabold">Subtotal:</span>
            <span className="text-xl font-medium">$88.00</span>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <Button btnName="Checkout" />
            {/* <Button /> */}
          </div>
        </div>
      </div>

      <span
        onClick={() => setOpenCartModal(false)}
        className={`${
          !openCartModal ? "translate-x-full" : "translate-x-0"
        } fixed left-0 right-0 top-0 bottom-0 z-10 bg-[rgba(0,0,0,0.4)] transition-all duration-500`}
      ></span>
    </header>
  );
};

export default Header;
