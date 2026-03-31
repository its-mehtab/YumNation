import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "../../assets/icon/Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useAuth } from "../../context/user/AuthContext";
import axios from "axios";
import RecentSearchWrap from "../recent-search-wrap/RecentSearchWrap";
import DishCardSm from "../dish-card-sm/DishCardSm";

const SearchBox = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const [resultName, setResultName] = useState(null);
  const [results, setResults] = useState([]);
  const [popularDishs, setPopulerDishs] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("Recent Searches")) || [
      "Pizza",
      "Burger",
      "Dessert",
    ],
  );

  const { serverURL } = useAuth();
  const boxRef = useRef(null);

  const fetchPopularDishs = async () => {
    // try {
    //   const { data } = await axios.get(`${serverURL}/api/dish`, {
    //     params: {
    //       availability: "recommended",
    //     },
    //   });
    //   setPopulerDishs(data.dishs);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    fetchPopularDishs();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchSubmit = async (e, query) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `${serverURL}/api/dishs?search=${query}`,
      );

      setResults(data.dishs);
      setRecentSearches((prev) => {
        return [query, ...prev];
      });
      setResultName(query);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={`flex items-center w-full gap-3 px-3.5 py-1.5 bg-[#fc8e32] border rounded-t-lg border-[#ffa052] ml-28 max-w-2xl relative ${!isSearchActive ? "rounded-b-lg" : ""}`}
    >
      <span
        onClick={(e) => handleSearchSubmit(e, query)}
        className="border-r-2 border-white pr-5 cursor-pointer"
      >
        <SearchIcon />
      </span>
      <form onSubmit={(e) => handleSearchSubmit(e, query)} className="w-full">
        <input
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsSearchActive(true)}
          type="text"
          placeholder="What do you want eat today"
          className="px-3 pe-8 py-2 text-white w-full outline-0 text-sm placeholder:text-white"
        />
      </form>
      {isSearchActive && (
        <div className="rounded-b-lg bg-white text-gray-600 p-5 text-xl absolute top-full left-0 w-full border border-t-0 border-[#ffa052] z-50">
          {resultName && (
            <>
              <h3 className="text-gray-700 text-base capitalize font-semibold mb-1">
                Search Results
              </h3>
              <p className="text-gray-500 text-base mb-5">
                {results.length > 0 ? results.length : "No"} Results found for "
                {resultName}"
              </p>
            </>
          )}

          {results.length > 0 && (
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
        </div>
      )}
    </div>
  );
};

export default SearchBox;
