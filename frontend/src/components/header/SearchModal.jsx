import React, { useState, useEffect } from "react";
import { SearchIcon } from "../../assets/icon/Icons";
import { useAuth } from "../../context/AuthContext";
import { assets, Icon } from "../../assets/assets";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchModal = ({ openSearchModal, setOpenSearchModal }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { serverURL } = useAuth();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `${serverURL}/api/products?search=${query}`,
        );

        setResults(data.products);
      } catch (error) {
        console.log(error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
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
              value={query}
              onChange={handleSearch}
              type="text"
              placeholder="Search..."
              className="px-12 pe-8 py-4 rounded-xl bg-white text-[#66666A] w-full outline-0 border border-gray-200"
            />
            {/* <button className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10 bg-[#3f9065] text-white hover:bg-[#fb9300] rounded-lg cursor-pointer">
                  <ArrowRight />
                </button> */}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 items-start mt-4 md:mt-8 max-w-5xl mx-auto h-full md:max-h-50 overflow-y-scroll">
          {results.map((currProd) => {
            return (
              <div
                onClick={() => {
                  setOpenSearchModal(false);
                  setQuery("");
                  setResults([]);
                }}
                key={currProd._id}
                className="flex gap-4 items-center"
              >
                <Link
                  to={`product/${currProd.slug}`}
                  className="w-24 h-24 rounded-xl"
                >
                  {/* <img src={currProd.img} alt="" className="w-full" /> */}
                  <img src={assets.product1} alt="" className="w-full" />
                </Link>
                <div>
                  <Link to={`product/${currProd.slug}`}>
                    <h3>{currProd.name}</h3>
                  </Link>
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
    </>
  );
};

export default SearchModal;
