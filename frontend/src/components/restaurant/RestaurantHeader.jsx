import React from "react";
import { SearchIcon } from "../../assets/icon/Icons";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const RestaurantHeader = () => {
  return (
    <div className="flex gap-14 items-center py-4 bg-[#fc8019] px-8">
      <NavLink to="/admin" className="flex shrink-0 items-center">
        <img src={assets.logo} alt="logo" className="h-8 w-auto" />
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
    </div>
  );
};

export default RestaurantHeader;
