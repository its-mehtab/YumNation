import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ChevronRightIcon, WishlistIcon } from "../../assets/icon/Icons";
import Dropdown from "../dropdown/Dropdown";
import { useWishlist } from "../../context/WishlistContext";
import SearchBox from "../search-box/SearchBox";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const { wishlist } = useWishlist();
  const { serverURL, user, setUser, isLoggedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await axios.post(serverURL + "/api/logout", {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-[#fc8019] fixed top-0 left-0 right-0 z-50">
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
            </div>

            <SearchBox />

            <div className="ml-auto">
              <div
                className={`rounded-lg px-3 py-2 flex gap-2 items-center relative cursor-pointer select-none ${isOpen ? "bg-white text-gray-600" : "bg-[#fc8e32] text-white"}`}
                onClick={() => setIsOpen(!isOpen)}
                ref={dropdownRef}
              >
                <img
                  className="rounded-full border-2 border-white w-10 h-10"
                  src={assets.avatar}
                  alt="avatar"
                />
                <div className="text-sm font-medium text-heading capitalize flex gap-2 items-center">
                  {user?.firstName}
                  <ChevronRightIcon
                    size={12}
                    addClass={`${isOpen ? "rotate-90" : ""}`}
                  />
                </div>

                <ul
                  className={`rounded-b-lg py-2 text-xs font-medium text-gray-400 absolute top-12.5 right-0 w-full bg-white z-20 transition-all duration-200 origin-top shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] min-w-36 ${!isOpen ? "scale-y-0" : "scale-y-100"}`}
                  aria-labelledby="dropdownInformationButton"
                >
                  {isLoggedIn && (
                    <>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeWidth={2}
                              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          Profile
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/wishlist"
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeLinecap="round"
                              strokeWidth={2}
                              d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                            />
                          </svg>
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                            />
                          </svg>
                          Orders
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeLinecap="round"
                              strokeWidth={2}
                              d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                            />
                          </svg>
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                            />
                          </svg>
                          Notifications
                        </a>
                      </li>
                      <li>
                        <div
                          onClick={logout}
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          <svg
                            className="me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#fc8019"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                            />
                          </svg>
                          Sign out
                        </div>
                      </li>
                    </>
                  )}

                  {!isLoggedIn && (
                    <>
                      <li>
                        <Link
                          to={"/login"}
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/signup"}
                          className="inline-flex items-center w-full p-2 hover:bg-gray-200 hover:text-gray-600 transition-all"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
