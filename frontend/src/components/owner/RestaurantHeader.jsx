import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, SearchIcon } from "../../assets/icon/Icons";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/user/AuthContext";

const RestaurantHeader = () => {
  const [navActive, setNavActive] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();

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

  return (
    <div className="flex gap-14 items-center py-4 bg-[#fc8019] px-8">
      <NavLink to="/admin" className="flex shrink-0 items-center">
        <img src={assets.logoWhite} alt="logo" className="h-8 w-auto" />
      </NavLink>
      <div
        className={`flex items-center w-full gap-3 px-3.5 py-1.5 [#fc8e32] border rounded-lg border-[#ffa052] max-w-xl relative`}
      >
        <span className="border-r-2 border-white pr-5 cursor-pointer">
          <SearchIcon />
        </span>
        <form className="w-full">
          <input
            type="text"
            placeholder="What do you want eat today"
            className="px-3 pe-8 py-2 text-white w-full outline-0 text-sm"
          />
        </form>
        {/* {isSearchActive && (
            <div className="rounded-b-lg bg-white text-gray-600 p-5 text-xl absolute top-full left-0 w-full border border-t-0 border-[#ffa052] z-50">
              {resultName && (
                <>
                  <h3 className="text-gray-700 text-base capitalize font-semibold mb-1">
                    Search Results
                  </h3>
                  <p className="text-gray-500 text-base mb-5">
                    {results.length > 0 ? results.length : "No"} Results found for
                    "{resultName}"
                  </p>
                </>
              )} */}

        {/* {results.length > 0 && (
                <>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    // breakpoints={{
                    //   640: { slidesPerView: 2 },
                    //   991: { slidesPerView: 3 },
                    // }}
                    className="mySwiper"
                  >
                    {results?.map((resultItem) => {
                      return (
                        <SwiperSlide key={resultItem._id}>
                          <DishCardSm
                            setResultName={setResultName}
                            setResults={setResults}
                            setIsSearchActive={setIsSearchActive}
                            item={resultItem}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </>
              )}
  
              {!results.length > 0 && (
                <RecentSearchWrap
                  resultName={resultName}
                  recentSearches={recentSearches}
                  setRecentSearches={setRecentSearches}
                  setIsSearchActive={setIsSearchActive}
                  handleSearchSubmit={handleSearchSubmit}
                />
              )}
  
              {results.length === 0 && (
                <>
                  <h3 className="text-gray-700 text-base capitalize font-semibold mb-2">
                    popular Cuisines
                  </h3>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    // breakpoints={{
                    //   640: { slidesPerView: 2 },
                    //   991: { slidesPerView: 3 },
                    // }}
                    className="mySwiper"
                  >
                    {popularDishs?.map((resultItem) => {
                      return (
                        <SwiperSlide key={resultItem._id}>
                          <DishCardSm
                            resultName={resultName}
                            setResultName={setResultName}
                            setIsSearchActive={setIsSearchActive}
                            item={resultItem}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </>
              )}
           </div> */}
        {/* )} */}
      </div>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
