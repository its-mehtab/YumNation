import React from "react";
import RangeSlider from "./RangeSlider";

const FilterBox = () => {
  return (
    <div className="lg:col-span-4">
      <h3 className="text-xl text-[#000006] border-b border-gray-200 pb-4 mb-5.5">
        Filters
      </h3>
      <div className="flex items-center gap-2.5 mt-2">
        <span className="px-3 py-2 bg-gray-200 flex gap-1.5 items-center text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          In Stock
        </span>
        <span className="px-3 py-2 bg-gray-200 flex gap-1.5 items-center text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          In Stock
        </span>
        <span className="text-gray-600 underline hover:text-gray-900 transition-all cursor-pointer">
          Clear all
        </span>
      </div>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Product categories
      </h3>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        Home page (25)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        BEVERAGES (18)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        BURGER (10)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        BURRITO (16)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        PIZZA (13)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        SALATS (7)
      </label>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Availability
      </h3>
      <label className="flex items-center gap-2 cursor-pointer">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        In stock (23)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="Out" type="checkbox" className="w-4 h-4 accent-black" />
        Out of stock (1)
      </label>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Price
      </h3>
      <RangeSlider />
    </div>
  );
};

export default FilterBox;
