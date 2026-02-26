import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const RecentSearchWrap = ({
  recentSearches,
  setRecentSearches,
  setIsSearchActive,
  handleSearchSubmit,
}) => {
  useEffect(() => {
    localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  //   console.log(resultName);

  return (
    recentSearches?.length > 0 && (
      <>
        <div className="flex gap-2 justify-between">
          <h3 className="text-gray-700 text-base capitalize font-semibold mb-2">
            Recently Searched
          </h3>
          <p
            onClick={() => setRecentSearches([])}
            className="flex items-center gap-2 text-sm text-[#fc8019] cursor-pointer underline"
          >
            Clear all
          </p>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={12}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper mb-5"
        >
          {recentSearches?.slice(0, 15).map((item) => {
            return (
              <SwiperSlide
                onClick={(e) => handleSearchSubmit(e, item)}
                className="w-auto!"
              >
                <div className="border border-gray-200 rounded-full text-sm text-gray-500 font-medium px-5 py-2.5 hover:bg-gray-200 transition-all cursor-pointer">
                  {item}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
};

export default RecentSearchWrap;
