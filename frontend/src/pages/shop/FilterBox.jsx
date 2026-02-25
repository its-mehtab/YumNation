import React from "react";
import RangeSlider from "./RangeSlider";
import { useCategory } from "../../context/CategoryContext";
import Chip from "./Chip";
import Checkbox from "@mui/material/Checkbox";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const FilterBox = ({ filters, setFilters }) => {
  const { categories } = useCategory();

  const handleCategory = (id) => {
    setFilters((prev) => {
      const exists = prev.category.includes(id);

      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== id)
          : [...prev.category, id],
        page: 1,
      };
    });
  };

  const handleAvailability = (itemName) => {
    setFilters((prev) => {
      const ItemExists = prev.availability.includes(itemName);

      return {
        ...prev,
        availability: ItemExists
          ? prev.availability.filter((i) => i !== itemName)
          : [...prev.availability, itemName],
      };
    });
  };

  return (
    <div>
      {(filters.category?.length > 0 ||
        filters.availability?.length > 0 ||
        (filters.minPrice || filters.maxPrice) !== null) && (
        <>
          <h3 className="text-gray-700 text-lg capitalize font-semibold border-b border-gray-200 pb-2 mb-4.5">
            Filters
          </h3>
          <div className="flex items-center gap-x-2.5 gap-y-3.5 mt-2 flex-wrap mb-7">
            {filters.category?.length > 0 && (
              <Chip
                chipName={
                  categories?.find((cat) => cat._id === filters.category[0])
                    .name
                }
              />
            )}
            {filters.category?.length > 1 && (
              <span className="text-sm text-gray-600">
                + {filters.category.length - 1}
              </span>
            )}
            {filters.availability?.length > 0 && (
              <Chip chipName={filters.availability[0]} />
            )}
            {filters.availability?.length > 1 && (
              <span className="text-sm text-gray-600">
                + {filters.availability.length - 1}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) !== null && (
              <>
                <Chip
                  chipName={`$${filters.minPrice} - $${filters.maxPrice}`}
                />
              </>
            )}
            <span
              onClick={() =>
                setFilters({
                  category: [],
                  sort: "",
                  minPrice: null,
                  maxPrice: null,
                  availability: [],
                  page: 1,
                })
              }
              className="text-gray-600 underline text-sm hover:text-gray-900 transition-all cursor-pointer"
            >
              Clear all
            </span>
          </div>
        </>
      )}

      <h3 className="text-gray-700 text-lg capitalize font-semibold border-b border-gray-200 pb-2 mb-4.5">
        Product categories
      </h3>
      {categories?.map((currCategory) => {
        return (
          <label
            className="flex items-center gap-2 cursor-pointer mt-3 text-gray-700 text-sm"
            key={currCategory._id}
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              checked={filters.category.includes(currCategory._id)}
              onChange={() => handleCategory(currCategory._id)}
            />
            {currCategory.name}
          </label>
        );
      })}
      <h3 className="text-gray-700 text-lg capitalize font-semibold border-b border-gray-200 mt-7 pb-2 mb-4.5">
        Availability
      </h3>
      <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
        <input
          checked={filters.availability.includes("availableNow")}
          onChange={() => handleAvailability("availableNow")}
          name="stock"
          type="checkbox"
          className="w-4 h-4 accent-black"
        />
        Available Now
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-3 text-gray-700 text-sm">
        <input
          checked={filters.availability.includes("recommended")}
          onChange={() => handleAvailability("recommended")}
          name="stock"
          type="checkbox"
          className="w-4 h-4 accent-black"
        />
        Recommended
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-3 text-gray-700 text-sm">
        <input
          checked={filters.availability.includes("soldOut")}
          onChange={() => handleAvailability("soldOut")}
          name="Out"
          type="checkbox"
          className="w-4 h-4 accent-black"
        />
        Sold Out
      </label>
      <h3 className="text-gray-700 text-lg capitalize font-semibold border-b border-gray-200 mt-7 pb-2 mb-4.5">
        Price
      </h3>
      <RangeSlider filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default FilterBox;
